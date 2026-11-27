"use client";
// Page publique du planning : vue Liste (par défaut, la plus lisible sur téléphone) ou Calendrier,
// filtres par catégorie, puis la vitrine « Déjà réalisé » (activités terminées depuis moins de 12 mois).
import { useMemo, useState } from "react";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { textesPlanning } from "@/content/planning";
import IconePlanning from "@/components/IconesPlanning";
import { ajouterJours, couleurs, formatDate, formatPlage, jourSemaine, seances, type Activite, type Categorie, type Seance } from "@/lib/planning";
import { PastilleCategorie } from "./FicheActivite";
import { useMaintenant } from "./useMaintenant";
import type { DonneesPlanning } from "@/lib/planning-public";

type Occurrence = { a: Activite; s: Seance };
const SEMAINES_PAR_PAGE = 8;

export default function PlanningPublic({ donnees, lang }: { donnees: DonneesPlanning; lang: Locale }) {
  const t = textesPlanning[lang];
  const maintenant = useMaintenant();
  const [vue, setVue] = useState<"liste" | "calendrier">("liste");
  const [filtre, setFiltre] = useState<string>("toutes");
  const [semaines, setSemaines] = useState(SEMAINES_PAR_PAGE);
  const [mois, setMois] = useState<string | null>(null);
  const [jour, setJour] = useState<string | null>(null);

  const categories = useMemo(() => new Map(donnees.categories.map((c) => [c.id, c])), [donnees.categories]);
  const toutes = useMemo<Occurrence[]>(
    () => donnees.activites.flatMap((a) => seances(a).map((s) => ({ a, s }))).sort((x, y) => (x.s.date + x.s.heureDebut).localeCompare(y.s.date + y.s.heureDebut)),
    [donnees.activites],
  );

  if (!maintenant) return <p className="pl-petit">{t.chargement}</p>;
  const aujourdhui = maintenant.date;
  const garder = (o: Occurrence) => filtre === "toutes" || o.a.categorie_id === filtre;
  const aVenir = toutes.filter((o) => o.s.date >= aujourdhui && garder(o));
  const utilisees = donnees.categories.filter((c) => !c.masquee && toutes.some((o) => o.a.categorie_id === c.id && o.s.date >= aujourdhui));

  return (
    <div className="pl">
      {donnees.exemple && (
        <p className="pl-exemple" role="note">
          Aperçu avec des données d&apos;EXEMPLE (la base du planning n&apos;est pas encore installée). Rien de tout ceci n&apos;est publié.
        </p>
      )}

      <div className="pl-barre">
        <div className="pl-vues" role="group" aria-label={`${t.liste} / ${t.calendrier}`}>
          <button type="button" aria-pressed={vue === "liste"} onClick={() => setVue("liste")}><IconePlanning nom="liste" taille={18} /> {t.liste}</button>
          <button type="button" aria-pressed={vue === "calendrier"} onClick={() => setVue("calendrier")}><IconePlanning nom="calendrier" taille={18} /> {t.calendrier}</button>
        </div>
        {utilisees.length > 1 && (
          <div className="pl-filtres" role="group" aria-label={t.filtrer}>
            <button type="button" aria-pressed={filtre === "toutes"} onClick={() => setFiltre("toutes")}>{t.toutes}</button>
            {utilisees.map((c) => (
              <button key={c.id} type="button" aria-pressed={filtre === c.id} onClick={() => setFiltre(c.id)}>
                <IconePlanning nom={c.icone} taille={16} /> {c.nom[lang]}
              </button>
            ))}
          </div>
        )}
      </div>

      {vue === "liste" ? (
        <Liste occurrences={aVenir} limite={ajouterJours(aujourdhui, semaines * 7)} plus={() => setSemaines((n) => n + SEMAINES_PAR_PAGE)}
          maintenant={maintenant} categories={categories} lang={lang} vide={filtre === "toutes" ? t.aucune : t.aucuneFiltre} />
      ) : (
        <Calendrier occurrences={toutes.filter(garder)} mois={mois ?? aujourdhui.slice(0, 7)} setMois={(m) => { setMois(m); setJour(null); }}
          jour={jour ?? (mois === null ? aujourdhui : null)} setJour={setJour} aujourdhui={aujourdhui} categories={categories} lang={lang} />
      )}

      <DejaRealise activites={donnees.activites} categories={categories} aujourdhui={aujourdhui} lang={lang} />
    </div>
  );
}

function Ligne({ o, categories, lang, maintenant }: { o: Occurrence; categories: Map<string, Categorie>; lang: Locale; maintenant: { date: string; heure: string } }) {
  const t = textesPlanning[lang];
  const c = o.a.categorie_id ? categories.get(o.a.categorie_id) : undefined;
  const enCours = !o.s.annulee && o.s.date === maintenant.date && o.s.heureDebut <= maintenant.heure && (o.s.heureFin ?? o.s.heureDebut) > maintenant.heure;
  const lieu = o.a.lieu_type === "mme" ? (o.s.lieu && o.s.lieu !== o.a.lieu ? o.s.lieu : t.aLaMme) : (o.s.lieu ?? o.a.lieu);
  return (
    <li className={`pl-ligne${o.s.annulee ? " pl-annulee" : ""}`}>
      <span className="pl-tuile" style={c ? { background: couleurs[c.couleur].fond, color: couleurs[c.couleur].texte } : undefined}>
        <small>{formatDate(o.s.date, lang, { weekday: "short" })}</small>
        <b>{formatDate(o.s.date, lang, { day: "numeric" })}</b>
      </span>
      <span className="pl-ligne-corps">
        <span className="pl-ligne-haut">
          <Link href={href(lang, `/actions/planning/${o.a.id}`)} className="pl-ligne-titre">{o.a.titre[lang]}</Link>
          {o.s.annulee ? <span className="pl-etiquette pl-etiquette-annule">{t.annule}</span>
            : enCours ? <span className="pl-etiquette pl-etiquette-direct">{t.enCeMoment}</span>
            : o.s.deplacee ? <span className="pl-etiquette">{t.deplace}</span>
            : c ? <PastilleCategorie c={c} lang={lang} /> : null}
        </span>
        <span className="pl-meta">
          <span><IconePlanning nom="horloge" taille={16} /> {formatPlage(o.s.heureDebut, o.s.heureFin, lang)}</span>
          <span><IconePlanning nom={o.a.lieu_type === "mme" ? "maison" : "dehors"} taille={16} /> {lieu}</span>
          {o.a.gratuit && <span>{t.gratuit}</span>}
        </span>
      </span>
    </li>
  );
}

function Liste({ occurrences, limite, plus, maintenant, categories, lang, vide }: {
  occurrences: Occurrence[]; limite: string; plus: () => void; maintenant: { date: string; heure: string };
  categories: Map<string, Categorie>; lang: Locale; vide: string;
}) {
  const t = textesPlanning[lang];
  if (!occurrences.length) return <p className="pl-vide">{vide}</p>;
  const montrees = occurrences.filter((o) => o.s.date < limite);
  const visibles = montrees.length ? montrees : occurrences.slice(0, 5); // rien dans la période : on montre les prochaines quand même
  const parMois = new Map<string, Occurrence[]>();
  for (const o of visibles) { const m = o.s.date.slice(0, 7); parMois.set(m, [...(parMois.get(m) ?? []), o]); }
  return (
    <section aria-label={t.aVenir}>
      {[...parMois].map(([m, os]) => (
        <div key={m} className="pl-mois">
          <h2 className="pl-mois-titre">{formatDate(m + "-01", lang, { month: "long", year: "numeric" })}</h2>
          <ul className="pl-liste">{os.map((o) => <Ligne key={o.a.id + o.s.dateOrigine} o={o} categories={categories} lang={lang} maintenant={maintenant} />)}</ul>
        </div>
      ))}
      {occurrences.length > visibles.length && (
        <button type="button" className="bouton bouton-contour pl-plus" onClick={plus}>
          {{ fr: "Voir les semaines suivantes", nl: "Volgende weken bekijken", en: "See the following weeks" }[lang]}
        </button>
      )}
    </section>
  );
}

function Calendrier({ occurrences, mois, setMois, jour, setJour, aujourdhui, categories, lang }: {
  occurrences: Occurrence[]; mois: string; setMois: (m: string) => void; jour: string | null; setJour: (j: string) => void;
  aujourdhui: string; categories: Map<string, Categorie>; lang: Locale;
}) {
  const t = textesPlanning[lang];
  const premier = mois + "-01";
  const decalage = jourSemaine(premier);
  const nbJours = new Date(Date.UTC(Number(mois.slice(0, 4)), Number(mois.slice(5, 7)), 0)).getUTCDate();
  const autreMois = (d: number) => { const x = new Date(Date.UTC(Number(mois.slice(0, 4)), Number(mois.slice(5, 7)) - 1 + d, 1)); return x.toISOString().slice(0, 7); };
  const parJour = new Map<string, Occurrence[]>();
  for (const o of occurrences) if (o.s.date.startsWith(mois)) parJour.set(o.s.date, [...(parJour.get(o.s.date) ?? []), o]);
  const duJour = jour ? parJour.get(jour) ?? [] : [];
  const nomMois = formatDate(premier, lang, { month: "long", year: "numeric" });

  return (
    <section className="pl-cal" aria-label={`${t.calendrier} · ${nomMois}`}>
      <div className="pl-cal-tete">
        <button type="button" onClick={() => setMois(autreMois(-1))} aria-label={t.moisPrecedent}>‹</button>
        <h2 className="pl-mois-titre" aria-live="polite">{nomMois}</h2>
        <button type="button" onClick={() => setMois(autreMois(1))} aria-label={t.moisSuivant}>›</button>
      </div>
      <div className="pl-cal-grille">
        <div className="pl-cal-rangee">
          {t.joursCourts.map((j) => <span key={j} aria-hidden="true" className="pl-cal-jsem">{j}</span>)}
        </div>
        {Array.from({ length: Math.ceil((decalage + nbJours) / 7) }, (_, rangee) => (
          <div className="pl-cal-rangee" key={rangee}>
            {Array.from({ length: 7 }, (_, col) => {
              const n = rangee * 7 + col - decalage + 1;
              if (n < 1 || n > nbJours) return <span key={col} className="pl-cal-vide" />;
              const d = `${mois}-${String(n).padStart(2, "0")}`;
              const os = parJour.get(d) ?? [];
              const actives = os.filter((o) => !o.s.annulee);
              return (
                <button key={col} type="button" aria-pressed={jour === d}
                  className={`pl-cal-jour${d === aujourdhui ? " pl-cal-auj" : ""}${d < aujourdhui ? " pl-cal-passe" : ""}`}
                  aria-label={`${formatDate(d, lang)}${actives.length ? ` · ${actives.length}` : ""}`} onClick={() => setJour(d)}>
                  <span>{n}</span>
                  <span className="pl-points" aria-hidden="true">
                    {actives.slice(0, 4).map((o) => {
                      const c = o.a.categorie_id ? categories.get(o.a.categorie_id) : undefined;
                      return <i key={o.a.id} style={{ background: c ? couleurs[c.couleur].point : "var(--bordeaux)" }} />;
                    })}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="pl-cal-jourdetail" aria-live="polite">
        {!jour ? <p className="pl-petit">{t.choisirJour}</p> : (
          <>
            <h3 className="pl-mois-titre">{formatDate(jour, lang)}</h3>
            {duJour.length ? (
              <ul className="pl-liste">{duJour.map((o) => <Ligne key={o.a.id + o.s.dateOrigine} o={o} categories={categories} lang={lang} maintenant={{ date: aujourdhui, heure: "" }} />)}</ul>
            ) : <p className="pl-petit">{t.rienCeJour}</p>}
          </>
        )}
      </div>
    </section>
  );
}

function DejaRealise({ activites, categories, aujourdhui, lang }: { activites: Activite[]; categories: Map<string, Categorie>; aujourdhui: string; lang: Locale }) {
  const t = textesPlanning[lang];
  const ilYAUnAn = ajouterJours(aujourdhui, -365);
  const passees = activites.flatMap((a) => {
    if (!a.vitrine) return [];
    const s = seances(a).filter((x) => !x.annulee);
    const derniere = s.at(-1)?.date;
    if (!derniere || derniere >= aujourdhui || derniere < ilYAUnAn) return [];
    return [{ a, s, derniere }];
  }).sort((x, y) => y.derniere.localeCompare(x.derniere));
  if (!passees.length) return null;
  const mois = (d: string) => formatDate(d, lang, { month: "long", year: "numeric" });
  return (
    <section className="pl-passe" aria-labelledby="pl-passe-titre">
      <h2 id="pl-passe-titre">{t.dejaRealise}</h2>
      <p className="pl-petit">{t.dejaRealiseTexte}</p>
      <ul className="pl-passe-grille">
        {passees.map(({ a, s }) => {
          const c = a.categorie_id ? categories.get(a.categorie_id) : undefined;
          return (
            <li key={a.id}>
              {c && <PastilleCategorie c={c} lang={lang} />}
              <strong>{a.titre[lang]}</strong>
              <span className="pl-petit">
                {s.length === 1 ? t.uneSeance(formatDate(s[0].date, lang, { day: "numeric", month: "long", year: "numeric" }))
                  : t.seancesDu(s.length, mois(s[0].date), mois(s[s.length - 1].date))}
              </span>
              {a.description[lang] && <span>{a.description[lang]}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
