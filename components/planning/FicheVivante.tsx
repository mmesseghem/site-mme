"use client";
// Fiche publique d'une activité : les « prochaines dates » dépendent du jour réel, connu dans le navigateur.
import type { Locale } from "@/lib/i18n";
import { seances, type Activite, type Categorie } from "@/lib/planning";
import FicheActivite from "./FicheActivite";
import { useMaintenant } from "./useMaintenant";

export default function FicheVivante({ a, categorie, lang, lienAgenda }: { a: Activite; categorie: Categorie | null; lang: Locale; lienAgenda: string }) {
  const maintenant = useMaintenant();
  const toutes = seances(a);
  return <FicheActivite a={a} categorie={categorie} lang={lang} toutesSeances={maintenant ? toutes : []} aujourdhui={maintenant?.date ?? null} lienAgenda={lienAgenda} />;
}
