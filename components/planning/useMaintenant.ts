"use client";
// Date et heure de Bruxelles, mises à jour chaque minute. Vaut null pendant le rendu serveur :
// la page se construit à l'avance (mise en cache), l'heure réelle n'est connue que dans le navigateur.
import { useSyncExternalStore } from "react";
import { maintenantBruxelles } from "@/lib/planning";

const abonner = (rappel: () => void) => { const id = setInterval(rappel, 60_000); return () => clearInterval(id); };
const lire = () => { const m = maintenantBruxelles(); return `${m.date} ${m.heure}`; };

export function useMaintenant(): { date: string; heure: string } | null {
  const v = useSyncExternalStore(abonner, lire, () => null);
  if (!v) return null;
  const [date, heure] = v.split(" ");
  return { date, heure };
}
