// Statut de l'accueil en temps réel, à l'heure de Bruxelles.
// Fermé : en dehors de lundi–vendredi 8 h–19 h, et les jours fériés légaux belges.
// Les fermetures exceptionnelles (congés, formation…) passent par le bandeau d'alerte.
import { ouverture } from "@/lib/site";

const JOUR_MS = 86_400_000;

// Date de Pâques (algorithme de Meeus), mois de 1 à 12.
function paques(annee: number): { mois: number; jour: number } {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return { mois, jour };
}

const cle = (d: Date) =>
  `${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;

// Jours fériés légaux en Belgique, au format "MM-JJ".
function joursFeries(annee: number): Set<string> {
  const p = paques(annee);
  const base = Date.UTC(annee, p.mois - 1, p.jour);
  const decale = (jours: number) => cle(new Date(base + jours * JOUR_MS));
  return new Set([
    "01-01", // Nouvel An
    decale(1), // Lundi de Pâques
    "05-01", // Fête du travail
    decale(39), // Ascension
    decale(50), // Lundi de Pentecôte
    "07-21", // Fête nationale
    "08-15", // Assomption
    "11-01", // Toussaint
    "11-11", // Armistice
    "12-25", // Noël
  ]);
}

// Un jour du calendrier (sans heure), représenté à minuit UTC pour calculer sans souci de fuseau.
function estJourOuvrable(jour: Date): boolean {
  const semaine = jour.getUTCDay() === 0 ? 7 : jour.getUTCDay();
  if (!(ouverture.jours as readonly number[]).includes(semaine)) return false;
  return !joursFeries(jour.getUTCFullYear()).has(cle(jour));
}

// Lit la date et l'heure à Bruxelles, quel que soit le fuseau de l'appareil du visiteur.
function maintenantABruxelles(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const v = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return {
    jour: new Date(Date.UTC(v("year"), v("month") - 1, v("day"))),
    minutes: v("hour") * 60 + v("minute"),
  };
}

export type Statut =
  | { ouvert: true; fermeA: number; minutesRestantes: number }
  | {
      ouvert: false;
      // Prochaine ouverture : dans combien de jours (0 = aujourd'hui), quel jour, à quelle heure.
      prochaine: { dansJours: number; jour: Date; heure: number } | null;
    };

export function statutOuverture(date: Date = new Date()): Statut {
  const { jour, minutes } = maintenantABruxelles(date);
  const debut = ouverture.debut * 60;
  const fin = ouverture.fin * 60;

  if (estJourOuvrable(jour) && minutes >= debut && minutes < fin) {
    return { ouvert: true, fermeA: ouverture.fin, minutesRestantes: fin - minutes };
  }

  // Cherche le prochain jour ouvrable (aujourd'hui si on est avant l'ouverture).
  for (let k = 0; k <= 14; k++) {
    const candidat = new Date(jour.getTime() + k * JOUR_MS);
    if (k === 0 && minutes >= debut) continue;
    if (estJourOuvrable(candidat)) {
      return { ouvert: false, prochaine: { dansJours: k, jour: candidat, heure: ouverture.debut } };
    }
  }
  return { ouvert: false, prochaine: null };
}
