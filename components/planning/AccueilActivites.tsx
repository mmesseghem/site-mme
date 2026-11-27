"use client";
// Bloc « Activités » de l'accueil : ce qui se passe aujourd'hui et dans les 14 prochains jours.
// Une ligne par activité (pas par séance), 4 lignes au maximum, pastille « En ce moment » en temps réel.
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { textesPlanning } from "@/content/planning";
import IconePlanning from "@/components/IconesPlanning";
import { ajouterJours, couleurs, formatDate, formatHeure, jourSemaine, seances, tempsFortAnnonce, type Activite, type Categorie, type Seance } from "@/lib/planning";
import { useMaintenant } from "./useMaintenant";

const MAX_LIGNES = 4;
const MAX_FORTS = 2;

export default function AccueilActivites({ activites, categories, lang }: { activites: Activite[]; categories: Categorie[]; lang: Locale }) {
  const t = textesPlanning[lang];
  const maintenant = useMaintenant();
  if (!maintenant) return <p className="activite-date">{t.chargement}</p>;
  const { date: auj, heure } = maintenant;
  const limite = ajouterJours(auj, 14);
  const demain = ajouterJours(auj, 1);
  const finie = (s: Seance) => s.date === auj && (s.heureFin ?? s.heureDebut) <= heure;

  // Pour chaque activité : ses séances (non annulées, pas encore finies) dans les 14 jours.
  const groupes = activites
    .map((a) => ({ a, s: seances(a).filter((s) => !s.annulee && s.date >= auj && s.date <= limite && !finie(s)) }))
    .filter((g) => g.s.length)
    .sort((x, y) => (x.s[0].date + x.s[0].heureDebut).localeCompare(y.s[0].date + y.s[0].heureDebut));

  // Temps forts déjà annoncés : en premier, même au-delà de 14 jours (2 au maximum).
  const forts = activites.flatMap((a) => { const s = tempsFortAnnonce(a, auj); return s && !finie(s) ? [{ a, s }] : []; })
    .sort((x, y) => x.s.date.localeCompare(y.s.date)).slice(0, MAX_FORTS);
  const idsForts = new Set(forts.map((f) => f.a.id));
  const autres = groupes.filter((g) => !idsForts.has(g.a.id));

  if (!forts.length && !groupes.length) {
    const prochaine = activites.flatMap((a) => seances(a).filter((s) => !s.annulee && s.date > limite).map((s) => ({ a, s })))
      .sort((x, y) => x.s.date.localeCompare(y.s.date))[0];
    return prochaine ? (
      <p className="activite-date">
        {t.accueilProchaine} : <Link href={href(lang, `/actions/planning/${prochaine.a.id}`)}>{prochaine.a.titre[lang]}</Link>,{" "}
        {formatDate(prochaine.s.date, lang)}
      </p>
    ) : <p className="activite-date">{t.accueilVide}</p>;
  }

  const cat = new Map(categories.map((c) => [c.id, c]));
  const montres = autres.slice(0, MAX_LIGNES - forts.length);
  return (
    <>
      <ul className="acc-pl">
        {forts.map(({ a, s }) => (
          <li key={a.id} className="acc-pl-fort">
            <span className="acc-pl-icone"><IconePlanning nom="etoile" /></span>
            <span className="acc-pl-corps">
              <Link href={href(lang, `/actions/planning/${a.id}`)}>{a.titre[lang]}</Link>
              <span>
                {capitaliser(formatDate(s.date, lang, { weekday: "long", day: "numeric", month: "long" }))} · {formatHeure(s.heureDebut, lang)}
                {a.inscription_requise ? ` · ${a.inscription_avant ? t.inscriptionAvant(formatDate(a.inscription_avant, lang, { day: "numeric", month: "long" })) : t.inscriptionObligatoire}` : ""}
              </span>
            </span>
            <span className="pl-etiquette pl-etiquette-fort">{s.date === auj ? t.aujourdhui : s.date === demain ? t.demain : t.tempsFort}</span>
          </li>
        ))}
        {montres.map(({ a, s }) => {
          const c = a.categorie_id ? cat.get(a.categorie_id) : undefined;
          const p = s[0];
          const enCours = p.date === auj && p.heureDebut <= heure;
          const quand = resumeDates(s.map((x) => x.date), lang);
          return (
            <li key={a.id}>
              <span className="acc-pl-icone" style={c ? { color: couleurs[c.couleur].texte } : undefined}><IconePlanning nom={c?.icone ?? "etoile"} /></span>
              <span className="acc-pl-corps">
                <Link href={href(lang, `/actions/planning/${a.id}`)}>{a.titre[lang]}</Link>
                <span>{capitaliser(quand)} · {formatHeure(p.heureDebut, lang)}{a.lieu_type === "ailleurs" && a.lieu ? ` · ${a.lieu}` : ""}</span>
              </span>
              {enCours ? <span className="pl-etiquette pl-etiquette-direct">{t.enCeMoment}</span>
                : p.date === auj ? <span className="pl-etiquette">{t.aujourdhui}</span>
                : p.date === demain ? <span className="pl-etiquette">{t.demain}</span> : null}
            </li>
          );
        })}
      </ul>
      {autres.length > montres.length && <p className="activite-date">{t.accueilAutres(autres.length - montres.length)}</p>}
    </>
  );
}

/** « Lundi 7 déc. », « Les lundis 7 et 14 déc. », ou « lun. 7 déc., mer. 9 déc. ». */
function resumeDates(dates: string[], lang: Locale): string {
  if (dates.length === 1) return formatDate(dates[0], lang, { weekday: "long", day: "numeric", month: "short" });
  const memeJour = new Set(dates.map(jourSemaine)).size === 1;
  const memeMois = new Set(dates.map((d) => d.slice(0, 7))).size === 1;
  if (memeJour && memeMois) {
    const jours = dates.map((d) => formatDate(d, lang, { day: "numeric" }));
    const et = { fr: " et ", nl: " en ", en: " and " }[lang];
    const liste = jours.slice(0, -1).join(", ") + et + jours[jours.length - 1];
    const nomJour = formatDate(dates[0], lang, { weekday: "long" });
    const mois = formatDate(dates[0], lang, { month: "short" });
    return { fr: `les ${nomJour}s ${liste} ${mois}`, nl: `${nomJour} ${liste} ${mois}`, en: `${nomJour}s ${liste} ${mois}` }[lang];
  }
  const premieres = dates.slice(0, 3).map((d) => formatDate(d, lang, { weekday: "short", day: "numeric", month: "short" })).join(", ");
  return dates.length > 3 ? premieres + "…" : premieres;
}
const capitaliser = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
