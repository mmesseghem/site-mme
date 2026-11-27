// Données d'EXEMPLE pour regarder la mise en page du planning sur les liens de prévisualisation,
// tant que la base de données n'a pas la structure du planning. Jamais affichées sur le site en ligne
// (voir lib/planning-public.ts). Les titres portent la mention « exemple » : ce ne sont pas de vraies activités.
import type { Activite, Categorie } from "@/lib/planning";

const t = (fr: string, nl: string, en: string) => ({ fr, nl, en });
const vide = t("", "", "");

export function exemplesPlanning(): { activites: Activite[]; categories: Categorie[] } {
  const categories: Categorie[] = [
    { id: "00000000-0000-4000-8000-000000000001", nom: t("Bouger", "Bewegen", "Get moving"), couleur: "vert", icone: "bouger", ordre: 1, masquee: false },
    { id: "00000000-0000-4000-8000-000000000002", nom: t("Ateliers et rencontres", "Workshops en ontmoetingen", "Workshops and meetings"), couleur: "bordeaux", icone: "discussion", ordre: 2, masquee: false },
    { id: "00000000-0000-4000-8000-000000000003", nom: t("Parents-enfants", "Ouders en kinderen", "Parents and children"), couleur: "gris", icone: "enfants", ordre: 3, masquee: false },
  ];
  const base = { blocs: [], public_vise: vide, gratuit: true, prix: null, pauses: [], exceptions: [], premiere_date: null, derniere_date: null, vitrine: true, publiee: true };
  const texte = (fr: string, nl: string, en: string) => [{ id: "b1", type: "texte" as const, textes: t(fr, nl, en) }];
  const activites: Activite[] = [
    {
      ...base, id: "00000000-0000-4000-9000-000000000001", categorie_id: categories[2].id,
      titre: t("Rencontre parents-bébés (exemple)", "Ontmoeting ouders-baby's (voorbeeld)", "Parents and babies meet-up (example)"),
      description: t("Un moment d'éveil et d'échange pour les tout-petits et leurs parents.", "Een moment van ontdekken en uitwisselen voor de kleintjes en hun ouders.", "A time to play and share for little ones and their parents."),
      blocs: texte("Texte d'exemple : ici, Séverine décrit l'activité.", "Voorbeeldtekst: hier beschrijft Séverine de activiteit.", "Example text: Séverine describes the activity here."),
      public_vise: t("Parents et bébés", "Ouders en baby's", "Parents and babies"),
      lieu_type: "mme", lieu: "Salle commune", heure_debut: "10:30", heure_fin: "11:30",
      repetition: { premier: "2026-11-02", frequence: "semaine", intervalle: 1, jours: [0], mensuel: "rang", fin: { type: "date", date: "2027-06-28" } },
      pauses: [{ du: "2026-12-21", au: "2027-01-03" }], exceptions: [{ date: "2026-12-14", annulee: true }],
    },
    {
      ...base, id: "00000000-0000-4000-9000-000000000002", categorie_id: categories[0].id,
      titre: t("Marche santé (exemple)", "Gezondheidswandeling (voorbeeld)", "Health walk (example)"),
      description: t("Une balade à un rythme doux, ouverte à tous.", "Een wandeling op een rustig tempo, voor iedereen.", "A gentle-paced walk, open to all."),
      blocs: texte("Texte d'exemple.", "Voorbeeldtekst.", "Example text."),
      lieu_type: "ailleurs", lieu: "Départ devant la maison médicale", heure_debut: "14:00", heure_fin: "15:30",
      repetition: { premier: "2026-11-04", frequence: "semaine", intervalle: 2, jours: [2], mensuel: "rang", fin: { type: "nombre", n: 14 } },
    },
    {
      ...base, id: "00000000-0000-4000-9000-000000000003", categorie_id: categories[1].id,
      titre: t("Atelier « Bien dormir » (exemple)", "Workshop 'Goed slapen' (voorbeeld)", "'Sleep well' workshop (example)"),
      description: t("Comprendre son sommeil et trouver des pistes concrètes.", "Je slaap begrijpen en concrete tips vinden.", "Understand your sleep and find practical ideas."),
      blocs: texte("Texte d'exemple.", "Voorbeeldtekst.", "Example text."),
      lieu_type: "mme", lieu: null, heure_debut: "18:00", heure_fin: "19:30",
      repetition: { premier: "2026-11-19", frequence: "mois", intervalle: 1, jours: [3], mensuel: "rang", fin: { type: "nombre", n: 6 } },
    },
    {
      ...base, id: "00000000-0000-4000-9000-000000000004", categorie_id: categories[0].id,
      titre: t("Gym douce (exemple)", "Zachte gym (voorbeeld)", "Gentle exercise (example)"),
      description: t("Activité terminée, pour montrer la section « Déjà réalisé ».", "Afgelopen activiteit, om de rubriek 'Al gedaan' te tonen.", "Finished activity, to show the 'Past activities' section."),
      lieu_type: "mme", lieu: null, heure_debut: "09:30", heure_fin: "10:30",
      repetition: { premier: "2026-09-01", frequence: "semaine", intervalle: 1, jours: [1], mensuel: "rang", fin: { type: "date", date: "2026-10-27" } },
    },
  ];
  return { activites, categories };
}
