// Informations pratiques de la maison médicale.
// Source : fichier de contexte du projet. Ne rien modifier sans confirmation de l'équipe.
import type { Locale } from "@/lib/i18n";

export const contact = {
  rue: "Rue Esseghem 24",
  ville: "1090 Jette",
  telephone: "02 424 25 40",
  telephoneLien: "tel:+3224242540",
  fax: "02 420 36 90",
  email: "info@mmesseghem.be",
  garde: "1733",
  gardeLien: "tel:1733",
  urgences: "112",
  urgencesLien: "tel:112",
} as const;

// Bandeau d'alerte en haut de toutes les pages (fermeture exceptionnelle, congés…).
// Mettre null pour le masquer. Plus tard, Séverine pourra le gérer depuis l'espace d'administration.
export const alerte: Record<Locale, string> | null = null;

// Structure du menu (proposition du groupe de travail).
// Les adresses sont les mêmes dans les trois langues ; seuls les libellés changent.
export const soins = [
  "medecine-generale",
  "soins-infirmiers",
  "kinesitherapie",
  "psychologie",
  "logopedie",
  "ergotherapie",
  "aide-sociale",
] as const;

export const pratique = [
  "demande-medicaments",
  "inscription",
  "faq",
  "newsletter",
] as const;

export const actions = [
  "planning",
  "la-recre",
  "psychomotricite-relationnelle",
] as const;

// Pages de la maison médicale accessibles depuis le pied de page.
export const maison = [
  "equipe",
  "philosophie",
  "historique",
  "offres-emploi",
  "confidentialite",
] as const;

export type SoinSlug = (typeof soins)[number];
export type PratiqueSlug = (typeof pratique)[number];
export type ActionSlug = (typeof actions)[number];
export type MaisonSlug = (typeof maison)[number];

// Toutes les pages provisoires, avec leur adresse.
export const pagesProvisoires: { segments: string[] }[] = [
  ...soins.map((s) => ({ segments: ["soins", s] })),
  ...pratique.map((s) => ({ segments: ["pratique", s] })),
  ...actions.map((s) => ({ segments: ["actions", s] })),
  ...maison.map((s) => ({ segments: [s] })),
];
