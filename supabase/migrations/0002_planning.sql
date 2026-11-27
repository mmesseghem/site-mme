-- Planning des activités : catégories, activités répétées, séances annulées ou déplacées, vitrine des activités passées.
--
-- À exécuter une fois dans Supabase (SQL Editor), APRÈS 0001_fondations.sql, avec l'accord de Michaël.
-- Ce fichier ne contient aucun secret ni aucune donnée personnelle : une activité décrit un atelier, pas une personne.
-- Les colonnes « inscription_requise » et « places » (déjà créées par 0001) servent à afficher « inscription obligatoire »
-- et « places limitées ». (L'inscription en ligne viendra plus tard, dans un fichier séparé, avec leur propre mention RGPD.)
--
-- Principe : on n'enregistre pas chaque séance une par une. On enregistre la RÈGLE de répétition
-- (« chaque lundi jusqu'au 31 janvier »), plus les exceptions (séance annulée, déplacée) et les pauses (vacances).
-- Le site calcule les séances à partir de la règle (lib/planning.ts).

-- ---------- Catégories (créées par l'équipe) ----------
create table public.categories_activites (
  id uuid primary key default gen_random_uuid(),
  nom jsonb not null,            -- { "fr": "...", "nl": "...", "en": "..." }
  couleur text not null default 'bordeaux' check (couleur in ('bordeaux', 'vert', 'gris')),
  icone text not null default 'etoile' check (icone ~ '^[a-z-]{1,30}$'),
  ordre integer not null default 0,
  masquee boolean not null default false,  -- une catégorie encore utilisée se masque au lieu d'être supprimée
  cree_le timestamptz not null default now()
);
alter table public.categories_activites enable row level security;
create policy "catégories : tout le monde les voit" on public.categories_activites
  for select to anon, authenticated using (true);
create policy "catégories : contenu et administrateur gèrent" on public.categories_activites
  for all to authenticated
  using (public.mon_role() in ('administrateur', 'contenu'))
  with check (public.mon_role() in ('administrateur', 'contenu'));
create trigger journal_categories_activites
  after insert or update or delete on public.categories_activites
  for each row execute function public.noter_action();

-- ---------- Activités : nouvelle forme ----------
-- La table « activites » de 0001 n'a jamais servi (aucune page ne l'utilisait). Par prudence,
-- on s'arrête si elle contient déjà quelque chose, plutôt que de perdre des données.
do $$
begin
  if exists (select 1 from public.activites) then
    raise exception 'La table activites n''est pas vide : arrêt, rien n''a été modifié. Prévenir Claude.';
  end if;
end $$;

alter table public.activites
  drop column debut,
  drop column fin,
  alter column description set default '{}'::jsonb,
  add column categorie_id uuid references public.categories_activites (id) on delete restrict,
  add column blocs jsonb not null default '[]'::jsonb,       -- contenu (intertitre, texte, encadré, bouton), comme la newsletter
  add column public_vise jsonb not null default '{}'::jsonb,  -- { "fr": "Parents et bébés", ... }
  add column lieu_type text not null default 'mme' check (lieu_type in ('mme', 'ailleurs')),
  add column gratuit boolean not null default true,
  add column prix text,
  add column heure_debut time not null default '10:00',
  add column heure_fin time,
  -- Règle de répétition, par exemple :
  -- { "premier": "2026-12-07", "frequence": "semaine", "intervalle": 1, "jours": [0],
  --   "mensuel": "rang", "fin": { "type": "date", "date": "2027-01-31" } }
  add column repetition jsonb not null default '{}'::jsonb,
  add column pauses jsonb not null default '[]'::jsonb,       -- [{ "du": "2026-12-21", "au": "2027-01-03" }]
  add column exceptions jsonb not null default '[]'::jsonb,   -- [{ "date": "...", "annulee": true }] ou séance déplacée
  add column premiere_date date,   -- calculées par le site à chaque enregistrement (tri, vitrine, effacement)
  add column derniere_date date,
  add column vitrine boolean not null default true,            -- visible dans « Déjà réalisé » une fois terminée
  -- Temps forts : activités exceptionnelles, mises en avant (« À ne pas manquer ») et annoncées à l'avance.
  add column temps_fort boolean not null default false,
  add column annonce_des date,                                 -- vide = 2 mois avant la séance
  -- Inscription (informations seulement : l'inscription en ligne viendra plus tard, avec sa mention RGPD)
  add column infos_inscription jsonb not null default '{}'::jsonb,  -- { "fr": "À l'accueil ou au 02 424 25 40", ... }
  add column inscription_avant date;

alter table public.activites
  add constraint activites_prix_court check (prix is null or char_length(prix) <= 60),
  add constraint activites_places_positives check (places is null or places between 1 and 10000);
create index activites_dates on public.activites (derniere_date, premiere_date);

-- ---------- Effacement automatique ----------
-- Une activité terminée reste 12 mois dans « Déjà réalisé » sur le site (filtre côté site),
-- puis elle est effacée de la base 2 ans après sa dernière séance, chaque nuit à 3 h 15.
select cron.schedule(
  'effacer-activites-anciennes',
  '15 3 * * *',
  $$ delete from public.activites where derniere_date < current_date - interval '2 years' $$
);

-- ---------- Autorisations d'accès ----------
grant select on public.categories_activites to anon;
grant select, insert, update, delete on public.categories_activites to authenticated;
grant all on public.categories_activites to service_role;
