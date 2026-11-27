// Planning des activités : forme des données et calcul des séances à partir de la règle de répétition.
// Partagé entre l'éditeur (aperçu des séances) et le site public. Aucun accès réseau ici.
//
// Les dates sont des chaînes « AAAA-MM-JJ » (heure de Bruxelles implicite) et les heures des chaînes « HH:MM ».
// On calcule en UTC pur pour éviter les décalages d'heure d'été.
import type { Locale } from "@/lib/i18n";
import type { Bloc, Textes } from "@/lib/newsletter";

export type Couleur = "bordeaux" | "vert" | "gris";
export type Categorie = { id: string; nom: Textes; couleur: Couleur; icone: string; ordre: number; masquee: boolean };

export type Fin = { type: "date"; date: string } | { type: "nombre"; n: number };
export type Repetition = {
  premier: string;
  frequence: "une" | "semaine" | "mois";
  intervalle: number;          // toutes les N semaines / N mois
  jours: number[];             // pour « semaine » : 0 = lundi … 6 = dimanche
  mensuel: "date" | "rang";    // pour « mois » : le 15 du mois, ou le 2e mardi (« dernier » si 5e)
  fin: Fin;
};
export type Pause = { du: string; au: string };
export type Exception = {
  date: string;                // date prévue par la règle
  annulee?: boolean;
  nouvelle_date?: string;      // séance déplacée
  heure_debut?: string;
  heure_fin?: string;
  lieu?: string;
};

export type Activite = {
  id: string;
  titre: Textes;
  description: Textes;         // résumé d'une ligne (listes et accueil)
  blocs: Bloc[];
  categorie_id: string | null;
  public_vise: Textes;
  lieu_type: "mme" | "ailleurs";
  lieu: string | null;
  gratuit: boolean;
  prix: string | null;
  heure_debut: string;
  heure_fin: string | null;
  repetition: Repetition;
  pauses: Pause[];
  exceptions: Exception[];
  premiere_date: string | null;
  derniere_date: string | null;
  vitrine: boolean;
  temps_fort: boolean;
  annonce_des: string | null;     // vide = 2 mois avant la séance
  inscription_requise: boolean;
  infos_inscription: Textes;      // comment s'inscrire
  inscription_avant: string | null;
  places: number | null;
  publiee: boolean;
  modifiee_le?: string;
};

export type Seance = {
  date: string;
  dateOrigine: string;
  heureDebut: string;
  heureFin: string | null;
  lieu: string | null;
  annulee: boolean;
  deplacee: boolean;
};

export const MAX_SEANCES = 300;
export const MAX_ANNEES = 3;

// ---------- Outils de dates ----------
const RE_DATE = /^\d{4}-\d{2}-\d{2}$/;
export const estDate = (s: unknown): s is string => typeof s === "string" && RE_DATE.test(s) && !isNaN(Date.parse(s + "T00:00:00Z"));
export const estHeure = (s: unknown): s is string => typeof s === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);

const versUTC = (d: string) => new Date(d + "T00:00:00Z");
const versTexte = (d: Date) => d.toISOString().slice(0, 10);
export const ajouterJours = (d: string, n: number) => { const x = versUTC(d); x.setUTCDate(x.getUTCDate() + n); return versTexte(x); };
/** 0 = lundi … 6 = dimanche */
export const jourSemaine = (d: string) => (versUTC(d).getUTCDay() + 6) % 7;
const enPause = (d: string, pauses: Pause[]) => pauses.some((p) => d >= p.du && d <= p.au);

/** Date et heure actuelles à Bruxelles : { date: "AAAA-MM-JJ", heure: "HH:MM" }. */
export function maintenantBruxelles(m = new Date()): { date: string; heure: string } {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Brussels", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(m).map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, heure: `${p.hour}:${p.minute}` };
}

// ---------- Règle de répétition ----------
export function regleParDefaut(premier: string): Repetition {
  return { premier, frequence: "une", intervalle: 1, jours: [jourSemaine(premier)], mensuel: "rang", fin: { type: "nombre", n: 10 } };
}

/** Rang du jour dans le mois (1 à 4, ou 5 = « dernier »). */
const rangDansMois = (d: string) => Math.ceil(versUTC(d).getUTCDate() / 7);

function dateMensuelle(annee: number, mois: number, r: Repetition): string | null {
  const ref = versUTC(r.premier);
  const nbJours = new Date(Date.UTC(annee, mois + 1, 0)).getUTCDate();
  if (r.mensuel === "date") {
    const j = ref.getUTCDate();
    return j <= nbJours ? versTexte(new Date(Date.UTC(annee, mois, j))) : null; // pas de 31 en février : mois sauté
  }
  const js = jourSemaine(r.premier);
  const rang = rangDansMois(r.premier);
  const candidats: string[] = [];
  for (let j = 1; j <= nbJours; j++) {
    const t = versTexte(new Date(Date.UTC(annee, mois, j)));
    if (jourSemaine(t) === js) candidats.push(t);
  }
  return rang >= 5 ? candidats[candidats.length - 1] : candidats[rang - 1] ?? null;
}

/** Dates prévues par la règle (avant exceptions), pauses déjà retirées. Les pauses ne comptent pas dans « après N séances ». */
export function datesDeLaRegle(r: Repetition, pauses: Pause[] = []): string[] {
  if (!estDate(r.premier)) return [];
  const limite = ajouterJours(r.premier, 366 * MAX_ANNEES);
  const finDate = r.fin.type === "date" && estDate(r.fin.date) ? (r.fin.date < limite ? r.fin.date : limite) : limite;
  const maxN = r.fin.type === "nombre" ? Math.max(1, Math.min(MAX_SEANCES, Math.round(r.fin.n) || 1)) : MAX_SEANCES;
  const pas = Math.max(1, Math.min(12, Math.round(r.intervalle) || 1));
  const out: string[] = [];
  const garder = (d: string) => { if (d >= r.premier && !enPause(d, pauses)) out.push(d); };

  if (r.frequence === "une") {
    if (!enPause(r.premier, pauses)) out.push(r.premier);
    return out;
  }
  if (r.frequence === "semaine") {
    const jours = [...new Set(r.jours.filter((j) => Number.isInteger(j) && j >= 0 && j <= 6))].sort();
    if (!jours.length) return [];
    const lundi = ajouterJours(r.premier, -jourSemaine(r.premier));
    for (let s = 0; ; s += pas) {
      const debutSemaine = ajouterJours(lundi, s * 7);
      if (debutSemaine > finDate) break;
      for (const j of jours) {
        const d = ajouterJours(debutSemaine, j);
        if (d > finDate || out.length >= maxN) return out;
        garder(d);
      }
    }
    return out.slice(0, maxN);
  }
  const ref = versUTC(r.premier);
  for (let m = 0; ; m += pas) {
    const annee = ref.getUTCFullYear() + Math.floor((ref.getUTCMonth() + m) / 12);
    const mois = (ref.getUTCMonth() + m) % 12;
    if (versTexte(new Date(Date.UTC(annee, mois, 1))) > finDate) break;
    const d = dateMensuelle(annee, mois, r);
    if (!d) continue;
    if (d > finDate || out.length >= maxN) break;
    garder(d);
  }
  return out.slice(0, maxN);
}

/** Séances réelles : règle + pauses + exceptions (annulée, déplacée), triées par date. */
export function seances(a: Pick<Activite, "repetition" | "pauses" | "exceptions" | "heure_debut" | "heure_fin" | "lieu">): Seance[] {
  const ex = new Map(a.exceptions.map((e) => [e.date, e]));
  return datesDeLaRegle(a.repetition, a.pauses)
    .map((d): Seance => {
      const e = ex.get(d);
      const deplacee = Boolean(e && !e.annulee && (e.nouvelle_date || e.heure_debut || e.heure_fin || e.lieu));
      return {
        date: e?.nouvelle_date && !e.annulee ? e.nouvelle_date : d,
        dateOrigine: d,
        heureDebut: (!e?.annulee && e?.heure_debut) || a.heure_debut,
        heureFin: (!e?.annulee && e?.heure_fin) || a.heure_fin,
        lieu: (!e?.annulee && e?.lieu) || a.lieu,
        annulee: Boolean(e?.annulee),
        deplacee,
      };
    })
    .sort((x, y) => (x.date + x.heureDebut).localeCompare(y.date + y.heureDebut));
}

/** Première et dernière date (pour le tri, la vitrine et l'effacement automatique). */
export function bornes(a: Parameters<typeof seances>[0]): { premiere: string | null; derniere: string | null } {
  const s = seances(a);
  return { premiere: s[0]?.date ?? null, derniere: s[s.length - 1]?.date ?? null };
}

// ---------- Textes ----------
export const nomsJours: Record<Locale, string[]> = {
  fr: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
  nl: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
};
const locales: Record<Locale, string> = { fr: "fr-BE", nl: "nl-BE", en: "en-GB" };

export function formatDate(d: string, lang: Locale, options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat(locales[lang], { ...options, timeZone: "UTC" }).format(versUTC(d));
}

/** « 10 h 30 » (fr), « 10.30 u » (nl), « 10.30 am » (en). */
export function formatHeure(h: string, lang: Locale) {
  const [hh, mm] = h.split(":").map(Number);
  if (lang === "fr") return mm ? `${hh} h ${String(mm).padStart(2, "0")}` : `${hh} h`;
  if (lang === "nl") return `${hh}.${String(mm).padStart(2, "0")} u`;
  const h12 = hh % 12 || 12;
  return `${h12}${mm ? "." + String(mm).padStart(2, "0") : ""} ${hh < 12 ? "am" : "pm"}`;
}

export function formatPlage(debut: string, fin: string | null, lang: Locale) {
  return fin ? `${formatHeure(debut, lang)} – ${formatHeure(fin, lang)}` : formatHeure(debut, lang);
}

/** Résumé lisible de la règle : « Chaque semaine, le lundi et le jeudi, jusqu'au 31 janvier 2027 ». */
export function resumeRegle(r: Repetition, lang: Locale): string {
  const j = nomsJours[lang];
  const liste = (xs: string[]) => {
    const et = { fr: " et ", nl: " en ", en: " and " }[lang];
    return xs.length <= 1 ? xs.join("") : xs.slice(0, -1).join(", ") + et + xs[xs.length - 1];
  };
  const fin = r.fin.type === "date"
    ? { fr: `, jusqu'au ${formatDate(r.fin.date, "fr", { day: "numeric", month: "long", year: "numeric" })}`, nl: `, tot ${formatDate(r.fin.date, "nl", { day: "numeric", month: "long", year: "numeric" })}`, en: `, until ${formatDate(r.fin.date, "en", { day: "numeric", month: "long", year: "numeric" })}` }[lang]
    : { fr: `, ${r.fin.n} fois`, nl: `, ${r.fin.n} keer`, en: `, ${r.fin.n} times` }[lang];
  if (r.frequence === "une") return { fr: "Une seule fois", nl: "Eenmalig", en: "Once" }[lang];
  if (r.frequence === "semaine") {
    const jours = liste([...r.jours].sort().map((i) => (lang === "fr" ? "le " : "") + j[i]));
    const base = r.intervalle > 1
      ? { fr: `Toutes les ${r.intervalle} semaines, ${jours}`, nl: `Om de ${r.intervalle} weken, op ${jours}`, en: `Every ${r.intervalle} weeks on ${jours}` }[lang]
      : { fr: `Chaque semaine, ${jours}`, nl: `Elke week, op ${jours}`, en: `Every week on ${jours}` }[lang];
    return base + fin;
  }
  const rang = rangDansMois(r.premier);
  const ordinal = {
    fr: ["1er", "2e", "3e", "4e", "dernier"], nl: ["1e", "2e", "3e", "4e", "laatste"], en: ["1st", "2nd", "3rd", "4th", "last"],
  }[lang][Math.min(rang, 5) - 1];
  const quand = r.mensuel === "date"
    ? { fr: `le ${versUTC(r.premier).getUTCDate()} du mois`, nl: `op de ${versUTC(r.premier).getUTCDate()}e`, en: `on day ${versUTC(r.premier).getUTCDate()}` }[lang]
    : { fr: `le ${ordinal} ${j[jourSemaine(r.premier)]}`, nl: `op de ${ordinal} ${j[jourSemaine(r.premier)]}`, en: `on the ${ordinal} ${j[jourSemaine(r.premier)]}` }[lang];
  const base = r.intervalle > 1
    ? { fr: `Tous les ${r.intervalle} mois, ${quand}`, nl: `Om de ${r.intervalle} maanden, ${quand}`, en: `Every ${r.intervalle} months, ${quand}` }[lang]
    : { fr: `Chaque mois, ${quand}`, nl: `Elke maand, ${quand}`, en: `Every month, ${quand}` }[lang];
  return base + fin;
}

/** Langues encore incomplètes (titre, résumé, un bloc vide, ou les infos d'inscription si elle est obligatoire). */
export function languesManquantesActivite(a: Pick<Activite, "titre" | "description" | "blocs"> & Partial<Pick<Activite, "inscription_requise" | "infos_inscription">>): Locale[] {
  return (["fr", "nl", "en"] as Locale[]).filter(
    (l) => !a.titre[l]?.trim() || !a.description[l]?.trim() || a.blocs.some((b) => !b.textes[l]?.trim())
      || Boolean(a.inscription_requise && !a.infos_inscription?.[l]?.trim()),
  );
}

// ---------- Temps forts ----------
export const MOIS_ANNONCE = 2;
export function ajouterMois(d: string, n: number): string {
  const x = versUTC(d); const j = x.getUTCDate();
  x.setUTCDate(1); x.setUTCMonth(x.getUTCMonth() + n);
  const nb = new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + 1, 0)).getUTCDate();
  x.setUTCDate(Math.min(j, nb)); return versTexte(x);
}
/** Date à partir de laquelle un temps fort est mis en avant pour sa prochaine séance. */
export function dateAnnonce(a: Pick<Activite, "annonce_des">, prochaine: string): string {
  return a.annonce_des && a.annonce_des < prochaine ? a.annonce_des : ajouterMois(prochaine, -MOIS_ANNONCE);
}
/** Prochaine séance non annulée d'un temps fort déjà annoncé (sinon null). */
export function tempsFortAnnonce(a: Activite, aujourdhui: string): Seance | null {
  if (!a.temps_fort) return null;
  const s = seances(a).find((x) => !x.annulee && x.date >= aujourdhui);
  return s && dateAnnonce(a, s.date) <= aujourdhui ? s : null;
}

/** « Le lundi », « Le lundi et le jeudi », « Un mercredi sur deux » (pour la partie « Chaque semaine »). */
export function resumeHebdo(r: Repetition, lang: Locale): string {
  const j = [...r.jours].sort().map((i) => nomsJours[lang][i]);
  const et = { fr: " et le ", nl: " en ", en: " and " }[lang];
  const liste = j.length <= 1 ? j.join("") : j.slice(0, -1).join(lang === "fr" ? ", le " : ", ") + et + j[j.length - 1];
  if (r.intervalle === 2) return { fr: `Un ${liste.replace(/, le | et le /g, " et un ")} sur deux`, nl: `Om de twee weken op ${liste}`, en: `Every other ${liste}` }[lang];
  if (r.intervalle > 2) return { fr: `Toutes les ${r.intervalle} semaines, le ${liste}`, nl: `Om de ${r.intervalle} weken op ${liste}`, en: `Every ${r.intervalle} weeks on ${liste}` }[lang];
  return { fr: `Le ${liste}`, nl: `Elke ${liste}`, en: `Every ${liste}` }[lang];
}

// ---------- Catégories : apparence ----------
export const couleurs: Record<Couleur, { nom: string; fond: string; texte: string; point: string }> = {
  bordeaux: { nom: "Bordeaux", fond: "var(--fond-rose)", texte: "var(--bordeaux)", point: "var(--bordeaux)" },
  vert: { nom: "Vert", fond: "var(--fond-vert)", texte: "var(--vert-texte)", point: "var(--vert)" },
  gris: { nom: "Gris", fond: "#f1efe8", texte: "#444441", point: "var(--gris)" },
};

/** Remet une ligne de la base dans la forme attendue (heures « HH:MM », champs JSON toujours présents). */
export function lireActivite(x: Activite): Activite {
  const vide = { fr: "", nl: "", en: "" };
  return {
    ...x,
    titre: { ...vide, ...x.titre }, description: { ...vide, ...x.description }, public_vise: { ...vide, ...x.public_vise },
    blocs: Array.isArray(x.blocs) ? x.blocs : [],
    heure_debut: (x.heure_debut ?? "10:00").slice(0, 5),
    heure_fin: x.heure_fin ? x.heure_fin.slice(0, 5) : null,
    repetition: estDate(x.repetition?.premier) ? { ...regleParDefaut(x.repetition.premier), ...x.repetition } : regleParDefaut(x.premiere_date ?? "2026-01-01"),
    pauses: Array.isArray(x.pauses) ? x.pauses : [],
    exceptions: Array.isArray(x.exceptions) ? x.exceptions : [],
    temps_fort: Boolean(x.temps_fort),
    annonce_des: x.annonce_des ?? null,
    inscription_requise: Boolean(x.inscription_requise),
    infos_inscription: { ...vide, ...x.infos_inscription },
    inscription_avant: x.inscription_avant ?? null,
    places: x.places ?? null,
  };
}
