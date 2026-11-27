"use client";
// Page publique du planning : vue Liste (par défaut, la plus lisible sur téléphone) ou Calendrier,
// filtres par catégorie, puis la vitrine « Déjà réalisé » (activités terminées depuis moins de 12 mois).
import { useMemo, useState } from "react";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { textesPlanning } from "@/content/planning";
import IconePlanning from "@/components/IconesPlanning";
import {
  ajouterJours, couleurs, formatDate, formatPlage, jourSemaine, resumeHebdo, resumeRegle, seances, tempsFortAnnonce,
  type Activite, type Categorie, type Seance,
} from "@/lib/planning";
import { Inscription, PastilleCategorie } from "./FicheActivite";
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
        <VueListe activites={donnees.activites.filter((a) => filtre === "toutes" || a.categorie_id === filtre)} occurrences={aVenir}
          limite={ajouterJours(aujourdhui, semaines * 7)} plus={() => setSemaines((n) => n + SEMAINES_PAR_PAGE)}
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
    <li className={`pl-ligne${o.s.annulee ? " pl-annulee" : ""}${o.a.temps_fort ? " pl-ligne-fort" : ""}`}>
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
            : o.a.temps_fort ? <span className="pl-etiquette pl-etiquette-fort"><IconePlanning nom="etoile" taille={14} /> {t.tempsFort}</span>
            : c ? <PastilleCategorie c={c} lang={lang} /> : null}
        </span>
        <span className="pl-meta">
          <span><IconePlanning nom="horloge" taille={16} /> {formatPlage(o.s.heureDebut, o.s.heureFin, lang)}</span>
          <span><IconePlanning nom={o.a.lieu_type === "mme" ? "maison" : "dehors"} taille={16} /> {lieu}</span>
          {o.a.gratuit && <span>{t.gratuit}</span>}
          {o.a.repetition.frequence === "mois" && <span><IconePlanning nom="repete" taille={16} /> {resumeRegle({ ...o.a.repetition, fin: { type: "nombre", n: 0 } }, lang).replace(/, 0 (fois|keer|times)$/, "")}</span>}
          {o.a.inscription_requise && <span className="pl-etiquette">{t.inscriptionObligatoire}</span>}
        </span>
      </span>
    </li>
  );
}

const estHebdo = (a: Activite) => a.repetition.frequence === "semaine" && !a.temps_fort;

function VueListe({ activites, occurrences, limite, plus, maintenant, categories, lang, vide }: {
  activites: Activite[]; occurrences: Occurrence[]; limite: string; plus: () => void; maintenant: { date: string; heure: string };
  categories: Map<string, Categorie>; lang: Locale; vide: string;
}) {
  const t = textesPlanning[lang];
  const auj = maintenant.date;
  if (!occurrences.length) return <p className="pl-vide">{vide}</p>;

  // 1. Temps forts déjà annoncés (aussi longtemps à l'avance que voulu)
  const forts = activites.flatMap((a) => { const s = tempsFortAnnonce(a, auj); return s ? [{ a, s }] : []; })
    .sort((x, y) => x.s.date.localeCompare(y.s.date));
  // 2. Activités hebdomadaires : une ligne chacune
  const hebdos = activites.filter(estHebdo).flatMap((a) => {
    const s = seances(a).filter((x) => x.date >= auj);
    const prochaine = s.find((x) => !x.annulee);
    return prochaine ? [{ a, s, prochaine }] : [];
  }).sort((x, y) => (jourSemaine(x.prochaine.date) * 10000 + Number(x.a.heure_debut.replace(":", ""))) - (jourSemaine(y.prochaine.date) * 10000 + Number(y.a.heure_debut.replace(":", ""))));
  // 3. Agenda : tout le reste, par date
  const agenda = occurrences.filter((o) => !estHebdo(o.a));
  const dansPeriode = agenda.filter((o) => o.s.date < limite);
  const visibles = dansPeriode.length ? dansPeriode : agenda.slice(0, 5);
  const parMois = new Map<string, Occurrence[]>();
  for (const o of visibles) { const m = o.s.date.slice(0, 7); parMois.set(m, [...(parMois.get(m) ?? []), o]); }
  const court = (d: string) => formatDate(d, lang, { day: "numeric", month: "short" });

  return (
    <>
      {forts.length > 0 && (
        <section className="pl-partie" aria-labelledby="pl-forts">
          <h2 id="pl-forts" className="pl-partie-titre pl-partie-fort"><IconePlanning nom="etoile" taille={18} /> {t.neManquer}</h2>
          <ul className="pl-forts">
            {forts.map(({ a, s }) => (
              <li key={a.id} className="pl-fort">
                <span className="pl-tuile pl-tuile-fort">
                  <small>{formatDate(s.date, lang, { weekday: "short" })}</small>
                  <b>{formatDate(s.date, lang, { day: "numeric" })}</b>
                  <small>{formatDate(s.date, lang, { month: "short" })}</small>
                </span>
                <span className="pl-ligne-corps">
                  <Link href={href(lang, `/actions/planning/${a.id}`)} className="pl-ligne-titre">{a.titre[lang]}</Link>
                  {a.description[lang] && <span className="pl-fort-resume">{a.description[lang]}</span>}
                  <span className="pl-meta">
                    <span><IconePlanning nom="horloge" taille={16} /> {formatPlage(s.heureDebut, s.heureFin, lang)}</span>
                    <span><IconePlanning nom={a.lieu_type === "mme" ? "maison" : "dehors"} taille={16} /> {a.lieu_type === "mme" ? t.aLaMme : s.lieu ?? a.lieu}</span>
                  </span>
                  {a.inscription_requise && <Inscription a={a} lang={lang} />}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hebdos.length > 0 && (
        <section className="pl-partie" aria-labelledby="pl-hebdo">
          <h2 id="pl-hebdo" className="pl-partie-titre pl-partie-hebdo"><IconePlanning nom="repete" taille={18} /> {t.chaqueSemaine}</h2>
          <ul className="pl-liste">
            {hebdos.map(({ a, s, prochaine }) => {
              const c = a.categorie_id ? categories.get(a.categorie_id) : undefined;
              const fenetre = ajouterJours(auj, 56);
              const changements = s.filter((x) => (x.annulee || x.deplacee) && x.date < fenetre).slice(0, 2);
              const derniere = s.at(-1)?.date;
              const enCours = prochaine.date === auj && prochaine.heureDebut <= maintenant.heure && (prochaine.heureFin ?? prochaine.heureDebut) > maintenant.heure;
              return (
                <li key={a.id} className="pl-ligne">
                  <span className="pl-icone-ronde" style={c ? { background: couleurs[c.couleur].fond, color: couleurs[c.couleur].texte } : undefined}>
                    <IconePlanning nom={c?.icone ?? "repete"} />
                  </span>
                  <span className="pl-ligne-corps">
                    <span className="pl-ligne-haut">
                      <Link href={href(lang, `/actions/planning/${a.id}`)} className="pl-ligne-titre">{a.titre[lang]}</Link>
                      {enCours ? <span className="pl-etiquette pl-etiquette-direct">{t.enCeMoment}</span> : c ? <PastilleCategorie c={c} lang={lang} /> : null}
                    </span>
                    <span className="pl-meta">
                      <span><IconePlanning nom="horloge" taille={16} /> {resumeHebdo(a.repetition, lang)}, {formatPlage(a.heure_debut, a.heure_fin, lang)}</span>
                      <span><IconePlanning nom={a.lieu_type === "mme" ? "maison" : "dehors"} taille={16} /> {a.lieu_type === "mme" ? t.aLaMme : a.lieu}</span>
                    </span>
                    <span className="pl-meta">
                      {prochaine.date !== auj && <span>{t.prochaine(formatDate(prochaine.date, lang, { weekday: "short", day: "numeric", month: "short" }))}</span>}
                      {changements.map((x) => (
                        <span key={x.dateOrigine} className={`pl-etiquette${x.annulee ? " pl-etiquette-annule" : ""}`}>
                          {x.annulee ? t.pasDeSeance(court(x.dateOrigine)) : t.changementLe(court(x.dateOrigine))}
                        </span>
                      ))}
                      {derniere && derniere < fenetre && <span>{t.derniere(court(derniere))}</span>}
                      {a.inscription_requise && <span className="pl-etiquette">{t.inscriptionObligatoire}</span>}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="pl-partie" aria-labelledby="pl-agenda">
        <h2 id="pl-agenda" className="pl-partie-titre"><IconePlanning nom="calendrier" taille={18} /> {t.agenda}</h2>
        {!visibles.length && <p className="pl-petit">{t.agendaVide}</p>}
        {[...parMois].map(([m, os]) => (
          <div key={m} className="pl-mois">
            <h3 className="pl-mois-titre">{formatDate(m + "-01", lang, { month: "long", year: "numeric" })}</h3>
            <ul className="pl-liste">{os.map((o) => <Ligne key={o.a.id + o.s.dateOrigine} o={o} categories={categories} lang={lang} maintenant={maintenant} />)}</ul>
          </div>
        ))}
        {agenda.length > visibles.length && (
          <button type="button" className="bouton bouton-contour pl-plus" onClick={plus}>{t.voirSuite}</button>
        )}
      </section>
    </>
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
                      return <i key={o.a.id} className={o.a.temps_fort ? "pl-point-fort" : undefined} style={{ background: c ? couleurs[c.couleur].point : "var(--bordeaux)" }} />;
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
