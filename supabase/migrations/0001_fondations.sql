-- Espace d'administration de la MME : fondations de la base de données (Supabase, région Europe).
--
-- Principes de sécurité (l'ancien site a été piraté par un compte d'administration) :
--   1. Personne ne crée son propre compte : seul un administrateur invite une personne.
--      (Réglage Supabase à faire : Authentication > Sign In / Providers > désactiver « Allow new users to sign up ».)
--   2. Chaque personne a un rôle, et ne voit que ce que son rôle permet.
--   3. Toute lecture ou modification exige la double vérification (lien e-mail + code sur le téléphone).
--      Sans le code, la base ne renvoie rien, même avec une session ouverte.
--   4. Les actions importantes sont notées dans un journal que personne ne peut modifier.
--   5. Les demandes de médicaments s'effacent toutes seules après 30 jours.
--
-- Ce fichier ne contient aucun secret. Il s'exécute une fois dans Supabase (SQL Editor), avec l'accord de Michaël.

-- ---------- Rôles ----------
create type public.role_admin as enum ('administrateur', 'contenu', 'accueil', 'lecture');
-- administrateur : tout, et la gestion des comptes (Michaël)
-- contenu        : newsletter, planning, inscriptions (Séverine)
-- accueil        : demandes de médicaments (consulter, marquer « traitée »)
-- lecture        : tout voir, rien modifier, sauf les demandes de médicaments

create table public.profils (
  id uuid primary key references auth.users (id) on delete cascade,
  nom text not null,
  role public.role_admin not null,
  actif boolean not null default true,
  cree_le timestamptz not null default now()
);
alter table public.profils enable row level security;

-- Rôle de la personne connectée, seulement si son compte est actif ET si elle a validé le code (niveau « aal2 »).
create or replace function public.mon_role()
returns public.role_admin
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.profils p
  where p.id = auth.uid()
    and p.actif
    and coalesce(auth.jwt() ->> 'aal', '') = 'aal2'
$$;
revoke all on function public.mon_role() from public, anon;
grant execute on function public.mon_role() to authenticated;

-- Chacun voit sa propre fiche (même avant le code, pour que la page sache qu'il faut le demander) ;
-- l'administrateur voit et gère toutes les fiches.
create policy "profils : voir sa fiche" on public.profils
  for select to authenticated using (id = auth.uid());
create policy "profils : l'administrateur voit tout" on public.profils
  for select to authenticated using (public.mon_role() = 'administrateur');
create policy "profils : l'administrateur gère" on public.profils
  for all to authenticated
  using (public.mon_role() = 'administrateur')
  with check (public.mon_role() = 'administrateur');

-- ---------- Journal des actions (lecture seule, même pour l'administrateur) ----------
create table public.journal (
  id bigint generated always as identity primary key,
  quand timestamptz not null default now(),
  qui uuid references auth.users (id) on delete set null,
  action text not null,
  detail jsonb
);
alter table public.journal enable row level security;
create policy "journal : l'administrateur lit" on public.journal
  for select to authenticated using (public.mon_role() = 'administrateur');
-- Aucune règle d'écriture : seules les fonctions ci-dessous (et le serveur du site) peuvent y écrire.

create or replace function public.noter_action()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.journal (qui, action, detail)
  values (
    auth.uid(),
    tg_table_name || ' : ' || lower(tg_op),
    jsonb_build_object('id', coalesce(new.id::text, old.id::text))
  );
  return coalesce(new, old);
end;
$$;

create trigger journal_profils
  after insert or update or delete on public.profils
  for each row execute function public.noter_action();

-- ---------- Demandes de médicaments (gardées 30 jours) ----------
create table public.demandes_medicaments (
  id uuid primary key default gen_random_uuid(),
  recue_le timestamptz not null default now(),
  nom text not null,
  prenom text not null,
  naissance date not null,
  telephone text not null,
  email text,
  medecin text,
  medicaments text not null,
  email_envoye boolean not null default false,
  traitee_le timestamptz,
  traitee_par uuid references auth.users (id) on delete set null
);
alter table public.demandes_medicaments enable row level security;
-- Le site enregistre les demandes avec sa clé serveur (qui contourne ces règles) ; personne d'autre ne peut en créer.
create policy "demandes : l'accueil et l'administrateur lisent" on public.demandes_medicaments
  for select to authenticated using (public.mon_role() in ('administrateur', 'accueil'));
create policy "demandes : l'accueil et l'administrateur marquent traitée" on public.demandes_medicaments
  for update to authenticated
  using (public.mon_role() in ('administrateur', 'accueil'))
  with check (public.mon_role() in ('administrateur', 'accueil'));

create trigger journal_demandes
  after update or delete on public.demandes_medicaments
  for each row execute function public.noter_action();

-- Effacement automatique après 30 jours, chaque nuit à 3 h (extension pg_cron, à activer dans Supabase).
create extension if not exists pg_cron;
select cron.schedule(
  'effacer-demandes-medicaments',
  '0 3 * * *',
  $$ delete from public.demandes_medicaments where recue_le < now() - interval '30 days' $$
);

-- ---------- Planning des activités ----------
create table public.activites (
  id uuid primary key default gen_random_uuid(),
  titre jsonb not null,          -- { "fr": "...", "nl": "...", "en": "..." }
  description jsonb not null,
  lieu text,
  debut timestamptz not null,
  fin timestamptz,
  inscription_requise boolean not null default false,
  places integer,
  publiee boolean not null default false,
  cree_le timestamptz not null default now(),
  modifiee_le timestamptz not null default now()
);
alter table public.activites enable row level security;
create policy "activités : le public voit les activités publiées" on public.activites
  for select to anon, authenticated using (publiee);
create policy "activités : l'équipe voit tout" on public.activites
  for select to authenticated using (public.mon_role() is not null);
create policy "activités : contenu et administrateur gèrent" on public.activites
  for all to authenticated
  using (public.mon_role() in ('administrateur', 'contenu'))
  with check (public.mon_role() in ('administrateur', 'contenu'));
create trigger journal_activites
  after insert or update or delete on public.activites
  for each row execute function public.noter_action();

-- ---------- Newsletter ----------
-- Les abonnés et les désinscriptions restent dans Mailjet : aucune adresse n'est stockée ici.
create table public.newsletters (
  id uuid primary key default gen_random_uuid(),
  numero integer unique,
  titre jsonb not null,          -- { "fr": "...", "nl": "...", "en": "..." }
  blocs jsonb not null default '[]'::jsonb,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'programmee', 'publiee')),
  envoi_prevu_le timestamptz,
  publiee_le timestamptz,
  cree_le timestamptz not null default now(),
  modifiee_le timestamptz not null default now()
);
alter table public.newsletters enable row level security;
create policy "newsletters : le public voit les numéros publiés" on public.newsletters
  for select to anon, authenticated using (statut = 'publiee');
create policy "newsletters : l'équipe voit tout" on public.newsletters
  for select to authenticated using (public.mon_role() is not null);
create policy "newsletters : contenu et administrateur gèrent" on public.newsletters
  for all to authenticated
  using (public.mon_role() in ('administrateur', 'contenu'))
  with check (public.mon_role() in ('administrateur', 'contenu'));
create trigger journal_newsletters
  after insert or update or delete on public.newsletters
  for each row execute function public.noter_action();

-- Garde-fou : supprimer un numéro déjà publié demande l'administrateur.
create policy "newsletters : seul l'administrateur supprime un numéro publié" on public.newsletters
  as restrictive for delete to authenticated
  using (statut <> 'publiee' or public.mon_role() = 'administrateur');
