// Textes fixes du planning (page publique, fiche d'une activité, bloc de l'accueil), dans les trois langues.
import type { Locale } from "@/lib/i18n";

export type TextesPlanning = {
  liste: string; calendrier: string; toutes: string; filtrer: string;
  aVenir: string; aucune: string; aucuneFiltre: string; annule: string; deplace: string;
  aLaMme: string; gratuit: string; quand: string; ou: string; pourQui: string; prix: string;
  prochainesDates: string; autresDates: (n: number) => string; ajouterAgenda: string; retour: string;
  dejaRealise: string; dejaRealiseTexte: string; seancesDu: (n: number, du: string, au: string) => string; uneSeance: (d: string) => string;
  enCeMoment: string; aujourdhui: string; demain: string; moisPrecedent: string; moisSuivant: string;
  joursCourts: string[]; choisirJour: string; rienCeJour: string; voirFiche: string;
  accueilTitre: string; accueilTout: string; accueilAutres: (n: number) => string; accueilProchaine: string; accueilVide: string;
  infoPratique: string; chargement: string;
};

export const textesPlanning: Record<Locale, TextesPlanning> = {
  fr: {
    liste: "Liste", calendrier: "Calendrier", toutes: "Toutes", filtrer: "Filtrer par catégorie",
    aVenir: "Activités à venir", aucune: "Aucune activité programmée pour l'instant. Renseignez-vous à l'accueil.",
    aucuneFiltre: "Aucune activité à venir dans cette catégorie.", annule: "Annulé", deplace: "Changement",
    aLaMme: "À la maison médicale", gratuit: "Gratuit", quand: "Quand", ou: "Où", pourQui: "Pour qui", prix: "Prix",
    prochainesDates: "Prochaines dates", autresDates: (n) => `et ${n} autre${n > 1 ? "s" : ""} date${n > 1 ? "s" : ""}`,
    ajouterAgenda: "Ajouter à mon agenda", retour: "Tout le planning",
    dejaRealise: "Déjà réalisé", dejaRealiseTexte: "Quelques activités menées ces derniers mois.",
    seancesDu: (n, du, au) => `${n} séances, de ${du} à ${au}`, uneSeance: (d) => `Le ${d}`,
    enCeMoment: "En ce moment", aujourdhui: "Aujourd'hui", demain: "Demain",
    moisPrecedent: "Mois précédent", moisSuivant: "Mois suivant",
    joursCourts: ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"], choisirJour: "Choisissez un jour pour voir ses activités.",
    rienCeJour: "Pas d'activité ce jour-là.", voirFiche: "En savoir plus",
    accueilTitre: "Ces deux prochaines semaines", accueilTout: "Voir tout le planning",
    accueilAutres: (n) => `+ ${n} autre${n > 1 ? "s" : ""} activité${n > 1 ? "s" : ""}`, accueilProchaine: "Prochaine activité",
    accueilVide: "Le programme des prochaines activités arrive bientôt.",
    infoPratique: "Infos pratiques", chargement: "Chargement du planning…",
  },
  nl: {
    liste: "Lijst", calendrier: "Kalender", toutes: "Alle", filtrer: "Filteren op categorie",
    aVenir: "Komende activiteiten", aucune: "Momenteel zijn er geen activiteiten gepland. Vraag ernaar aan het onthaal.",
    aucuneFiltre: "Geen komende activiteiten in deze categorie.", annule: "Geannuleerd", deplace: "Wijziging",
    aLaMme: "In het wijkgezondheidscentrum", gratuit: "Gratis", quand: "Wanneer", ou: "Waar", pourQui: "Voor wie", prix: "Prijs",
    prochainesDates: "Volgende data", autresDates: (n) => `en nog ${n} ${n > 1 ? "data" : "datum"}`,
    ajouterAgenda: "Toevoegen aan mijn agenda", retour: "Volledige planning",
    dejaRealise: "Al gedaan", dejaRealiseTexte: "Enkele activiteiten van de voorbije maanden.",
    seancesDu: (n, du, au) => `${n} sessies, van ${du} tot ${au}`, uneSeance: (d) => `Op ${d}`,
    enCeMoment: "Nu bezig", aujourdhui: "Vandaag", demain: "Morgen",
    moisPrecedent: "Vorige maand", moisSuivant: "Volgende maand",
    joursCourts: ["ma", "di", "wo", "do", "vr", "za", "zo"], choisirJour: "Kies een dag om de activiteiten te zien.",
    rienCeJour: "Geen activiteit op die dag.", voirFiche: "Meer weten",
    accueilTitre: "De komende twee weken", accueilTout: "Volledige planning bekijken",
    accueilAutres: (n) => `+ nog ${n} ${n > 1 ? "activiteiten" : "activiteit"}`, accueilProchaine: "Volgende activiteit",
    accueilVide: "Het programma van de volgende activiteiten volgt binnenkort.",
    infoPratique: "Praktische info", chargement: "Planning wordt geladen…",
  },
  en: {
    liste: "List", calendrier: "Calendar", toutes: "All", filtrer: "Filter by category",
    aVenir: "Upcoming activities", aucune: "No activities are scheduled at the moment. Ask at reception.",
    aucuneFiltre: "No upcoming activities in this category.", annule: "Cancelled", deplace: "Change",
    aLaMme: "At the health centre", gratuit: "Free", quand: "When", ou: "Where", pourQui: "Who for", prix: "Price",
    prochainesDates: "Next dates", autresDates: (n) => `and ${n} more date${n > 1 ? "s" : ""}`,
    ajouterAgenda: "Add to my calendar", retour: "Full schedule",
    dejaRealise: "Past activities", dejaRealiseTexte: "A few activities from recent months.",
    seancesDu: (n, du, au) => `${n} sessions, from ${du} to ${au}`, uneSeance: (d) => `On ${d}`,
    enCeMoment: "Happening now", aujourdhui: "Today", demain: "Tomorrow",
    moisPrecedent: "Previous month", moisSuivant: "Next month",
    joursCourts: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], choisirJour: "Choose a day to see its activities.",
    rienCeJour: "No activity on that day.", voirFiche: "Find out more",
    accueilTitre: "The next two weeks", accueilTout: "See the full schedule",
    accueilAutres: (n) => `+ ${n} more ${n > 1 ? "activities" : "activity"}`, accueilProchaine: "Next activity",
    accueilVide: "The programme of upcoming activities is coming soon.",
    infoPratique: "Practical information", chargement: "Loading the schedule…",
  },
};
