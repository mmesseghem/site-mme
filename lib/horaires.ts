// Calcule si l'accueil est ouvert en ce moment, à l'heure de Bruxelles.
// Fermé : en dehors de lundi–vendredi 8 h–19 h, et les jours fériés légaux belges.
// Les fermetures exceptionnelles (congés, formation…) passent par le bandeau d'alerte.
import { ouverture } from "@/lib/site";

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

// Jours fériés légaux en Belgique, au format "MM-JJ".
function joursFeries(annee: number): Set<string> {
  const p = paques(annee);
  const base = Date.UTC(annee, p.mois - 1, p.jour);
  const decale = (jours: number) => {
    const d = new Date(base + jours * 86_400_000);
    return `${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  };
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

// Lit la date et l'heure à Bruxelles, quel que soit le fuseau de l'appareil du visiteur.
function maintenantABruxelles(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);
  const v = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const jours: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  return {
    annee: Number(v("year")),
    moisJour: `${v("month")}-${v("day")}`,
    heure: Number(v("hour")),
    jourSemaine: jours[v("weekday")] ?? 0,
  };
}

export function estOuvert(date: Date = new Date()): boolean {
  const m = maintenantABruxelles(date);
  if (!(ouverture.jours as readonly number[]).includes(m.jourSemaine)) return false;
  if (joursFeries(m.annee).has(m.moisJour)) return false;
  return m.heure >= ouverture.debut && m.heure < ouverture.fin;
}
