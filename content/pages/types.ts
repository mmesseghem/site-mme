// Modèle des pages de contenu, dans les trois langues.
// Chaque page est une suite de « blocs » simples : paragraphe, titre, liste, encadré, photo, lien.
// verifier: true  -> une étiquette « à vérifier » s'affiche (horaires, prix, numéros repris de l'ancien site).
// aCompleter      -> information manquante, à fournir par l'équipe (ne jamais l'inventer).
import type { Locale } from "@/lib/i18n";

export type Bloc =
  | { t: "p"; texte: string; verifier?: true }
  | { t: "h2"; texte: string }
  | { t: "liste"; items: string[]; verifier?: true }
  | { t: "etapes"; items: string[] }
  | { t: "encadre"; titre?: string; texte: string; verifier?: true }
  | { t: "aCompleter"; texte: string }
  | { t: "lien"; texte: string; href: string }
  | { t: "photo"; src: string; alt: string; largeur: number; hauteur: number }
  | { t: "dates"; items: { date: string; texte: string }[] }
  | { t: "questions"; items: { q: string; r: string[] }[] };

export type Page = { soustitre?: string; blocs: Bloc[] };
export type PageTraduite = Record<Locale, Page>;
