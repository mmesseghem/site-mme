// Informations pratiques de la maison médicale.
// Source : fichier de contexte du projet. Ne rien modifier sans confirmation de l'équipe.
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

// Heures d'ouverture de l'accueil (heure de Bruxelles) : lundi à vendredi, 8 h à 19 h.
// Les jours fériés légaux belges sont considérés comme fermés (voir lib/horaires.ts).
export const ouverture = { jours: [1, 2, 3, 4, 5], debut: 8, fin: 19 } as const;

// Structure du menu (version 1 de la maquette).
// Les adresses sont les mêmes dans les trois langues ; seuls les libellés changent.
export const equipe = [
  "accueil",
  "medecine-generale",
  "kinesitherapie",
  "pole-infirmier",
  "psychologue",
  "assistante-sociale",
  "logopedie",
  "actrices-en-sante",
  "pole-administratif",
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

// Pages de la maison médicale accessibles depuis l'accueil et le pied de page.
export const maison = [
  "philosophie",
  "historique",
  "offres-emploi",
  "confidentialite",
] as const;

export type PoleSlug = (typeof equipe)[number];
export type PratiqueSlug = (typeof pratique)[number];
export type ActionSlug = (typeof actions)[number];
export type MaisonSlug = (typeof maison)[number];

// Toutes les pages provisoires, avec leur adresse.
export const pagesProvisoires: { segments: string[] }[] = [
  ...equipe.map((s) => ({ segments: ["equipe", s] })),
  ...pratique.map((s) => ({ segments: ["pratique", s] })),
  ...actions.map((s) => ({ segments: ["actions", s] })),
  ...maison.map((s) => ({ segments: [s] })),
];
