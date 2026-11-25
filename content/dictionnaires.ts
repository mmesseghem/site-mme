// Textes du site dans les trois langues.
// Le français est la référence : le néerlandais et l'anglais doivent avoir exactement les mêmes clés.
// Relecture par un néerlandophone conseillée pour les pages clés.
import type { Locale } from "@/lib/i18n";
import type { ActionSlug, MaisonSlug, PoleSlug, PratiqueSlug } from "@/lib/site";

const fr = {
  meta: {
    titre: "Maison Médicale Esseghem — Jette",
    description:
      "Maison médicale de quartier à Jette : médecine générale, kinésithérapie, soins infirmiers, psychologie, logopédie et accompagnement social.",
  },
  commun: {
    allerAuContenu: "Aller au contenu",
    nomComplet: "Maison Médicale Esseghem",
    horairesCourts: "Lun–ven 8h00–19h00",
    gardeCourte: "Garde hors horaires : 1733",
    choisirLangue: "Choisir la langue",
    filAriane: "Fil d'Ariane",
    accueil: "Accueil",
  },
  nav: {
    principal: "Menu principal",
    accueil: "Accueil",
    equipe: "L'équipe",
    pratique: "En pratique",
    actions: "Nos actions en santé",
    contact: "Contacts",
    ouvrirMenu: "Ouvrir le menu",
    fermerMenu: "Fermer le menu",
    appeler: "Appeler la maison médicale",
  },
  poles: {
    accueil: "Accueil",
    "medecine-generale": "Médecine générale",
    kinesitherapie: "Kinésithérapie",
    "pole-infirmier": "Pôle infirmier",
    psychologue: "Psychologue",
    "assistante-sociale": "Assistante sociale",
    logopedie: "Logopédie",
    "actrices-en-sante": "Actrices en santé",
    "pole-administratif": "Pôle administratif",
  } satisfies Record<PoleSlug, string>,
  pratique: {
    "demande-medicaments": "Demande de médicament(s)",
    inscription: "S'inscrire à la maison médicale",
    faq: "FAQ",
    newsletter: "Newsletter",
  } satisfies Record<PratiqueSlug, string>,
  actions: {
    planning: "Planning des activités",
    "la-recre": "La récré",
    "psychomotricite-relationnelle": "Psychomotricité relationnelle",
  } satisfies Record<ActionSlug, string>,
  maison: {
    philosophie: "Notre philosophie",
    historique: "Historique",
    "offres-emploi": "Offres d'emploi",
    confidentialite: "Politique de confidentialité",
  } satisfies Record<MaisonSlug, string>,
  accueil: {
    surtitre: "Maison médicale de quartier à Jette",
    titre: "Une prise en charge globale et accessible de la santé",
    texte:
      "Médecine générale, kinésithérapie, soins infirmiers, psychologie, logopédie et accompagnement social, réunis sous un même toit.",
    boutonRdv: "Prendre rendez-vous : 02 424 25 40",
    boutonMedic: "Demande de médicament",
    altEquipe: "L'équipe de la Maison Médicale Esseghem réunie dans la salle de réunion",
    horairesTitre: "Ouvert du lundi au vendredi",
    horaires: "8h00 – 19h00",
    garde: "En dehors des heures : garde au 1733",
    statut: {
      horairesTitre: "Ouvert du lundi au vendredi",
      ouvertMaintenant: "Ouvert maintenant",
      fermeActuellement: "Fermé actuellement",
      horairesSemaine: "Lundi au vendredi · 8h00 – 19h00",
      garde: "En dehors des heures : garde au 1733",
      libGarde: "Médecin de garde",
      libUrgences: "Urgences",
      fermeA: "Ferme à {heure}",
      fermeBientot: "Ferme dans {min} min, à {heure}",
      rouvre: "Rouvre {quand} à {heure}",
      aujourdhui: "aujourd'hui",
      demain: "demain",
      prefixeJour: "",
    },
    acces: [
      {
        titre: "Prendre rendez-vous",
        texte: "Par téléphone au 02 424 25 40, du lundi au vendredi.",
      },
      {
        titre: "Demander un médicament",
        texte:
          "Pour vos traitements chroniques. Prescription disponible sur votre carte d'identité sous 72 h.",
      },
      {
        titre: "Devenir patient",
        texte:
          "Habitants du quartier : découvrez comment vous inscrire à la maison médicale.",
      },
    ],
    polesSurtitre: "L'équipe",
    polesTitre: "Nos pôles de soins",
    polesTexte:
      "Des professionnels qui travaillent ensemble autour de chaque patient, avec des réunions de coordination régulières.",
    philoSurtitre: "Notre philosophie",
    philoDebut:
      "Une maison médicale, c'est une équipe qui soigne, qui prévient et qui s'appuie sur les ressources des",
    philoMisEnAvant: "habitants du quartier",
    philoFin: ".",
    valeurs: [
      { titre: "Justice sociale", texte: "Des soins accessibles à toutes et tous, sur un principe d'équité." },
      { titre: "Solidarité", texte: "Un travail en réseau avec les partenaires du quartier." },
      { titre: "Autonomie", texte: "Le respect de chaque personne et de ses choix de santé." },
      { titre: "Autogestion", texte: "Une équipe sans hiérarchie, qui décide ensemble." },
    ],
    philoLien: "En savoir plus sur notre philosophie",
    trouverSurtitre: "Nous trouver",
    altFacade: "Entrée de la maison médicale au numéro 24, avec son enseigne",
    libTelephone: "Téléphone",
    libEmail: "E-mail",
    libHoraires: "Horaires",
    libGarde: "Garde",
    horairesValeur: "Lun – ven, 8h – 19h",
    trouverLien: "Itinéraire et accès",
    rejoindreTitre: "Envie de rejoindre une équipe autogérée ?",
    rejoindreTexte: "Découvrez nos offres d'emploi et notre façon de travailler ensemble.",
    rejoindreBouton: "Voir les offres",
  },
  pied: {
    garde: "En dehors des heures d'ouverture : garde bruxelloise au 1733",
    colPratique: "En pratique",
    colMaison: "La maison médicale",
    asbl: "Maison Médicale Esseghem ASBL",
  },
  provisoire: {
    texte:
      "Cette page est en préparation. Son contenu sera repris de l'ancien site, mis à jour et traduit.",
    enAttendant: "En attendant, l'accueil vous répond au",
    retour: "Retour à l'accueil",
  },
  contact: {
    titre: "Nous contacter",
    adresse: "Adresse",
    telephone: "Téléphone",
    fax: "Fax",
    email: "E-mail",
    horaires: "Horaires",
    horairesValeur: "Lundi au vendredi, 8h00 – 19h00",
    horsHoraires: "En dehors des heures",
    horsHorairesValeur: "Garde bruxelloise : 1733",
    altFacade: "Façade de la maison médicale avec son enseigne, rue Esseghem 24",
    carte: "Une carte interactive sera ajoutée ici.",
  },
};

export type Dictionnaire = typeof fr;

const nl: Dictionnaire = {
  meta: {
    titre: "Maison Médicale Esseghem — Jette",
    description:
      "Wijkgezondheidscentrum in Jette: huisartsgeneeskunde, kinesitherapie, verpleegkundige zorg, psychologie, logopedie en sociale begeleiding.",
  },
  commun: {
    allerAuContenu: "Naar de inhoud",
    nomComplet: "Maison Médicale Esseghem",
    horairesCourts: "Ma–vr 8u00–19u00",
    gardeCourte: "Wachtdienst buiten de openingsuren: 1733",
    choisirLangue: "Kies een taal",
    filAriane: "Kruimelpad",
    accueil: "Home",
  },
  nav: {
    principal: "Hoofdmenu",
    accueil: "Home",
    equipe: "Het team",
    pratique: "Praktisch",
    actions: "Onze gezondheidsacties",
    contact: "Contact",
    ouvrirMenu: "Menu openen",
    fermerMenu: "Menu sluiten",
    appeler: "Het wijkgezondheidscentrum bellen",
  },
  poles: {
    accueil: "Onthaal",
    "medecine-generale": "Huisartsgeneeskunde",
    kinesitherapie: "Kinesitherapie",
    "pole-infirmier": "Verpleegkundig team",
    psychologue: "Psycholoog",
    "assistante-sociale": "Maatschappelijk assistent",
    logopedie: "Logopedie",
    "actrices-en-sante": "Gezondheidswerkers",
    "pole-administratif": "Administratief team",
  },
  pratique: {
    "demande-medicaments": "Aanvraag geneesmiddel(en)",
    inscription: "Inschrijven in het wijkgezondheidscentrum",
    faq: "Veelgestelde vragen",
    newsletter: "Nieuwsbrief",
  },
  actions: {
    planning: "Activiteitenplanning",
    "la-recre": "La récré",
    "psychomotricite-relationnelle": "Relationele psychomotoriek",
  },
  maison: {
    philosophie: "Onze visie",
    historique: "Geschiedenis",
    "offres-emploi": "Vacatures",
    confidentialite: "Privacybeleid",
  },
  accueil: {
    surtitre: "Wijkgezondheidscentrum in Jette",
    titre: "Globale en toegankelijke zorg voor uw gezondheid",
    texte:
      "Huisartsgeneeskunde, kinesitherapie, verpleegkundige zorg, psychologie, logopedie en sociale begeleiding, samen onder één dak.",
    boutonRdv: "Afspraak maken: 02 424 25 40",
    boutonMedic: "Geneesmiddelen aanvragen",
    altEquipe: "Het team van Maison Médicale Esseghem, samen in de vergaderzaal",
    horairesTitre: "Open van maandag tot vrijdag",
    horaires: "8u00 – 19u00",
    garde: "Buiten de openingsuren: wachtdienst via 1733",
    statut: {
      horairesTitre: "Open van maandag tot vrijdag",
      ouvertMaintenant: "Nu open",
      fermeActuellement: "Momenteel gesloten",
      horairesSemaine: "Maandag tot vrijdag · 8u00 – 19u00",
      garde: "Buiten de openingsuren: wachtdienst via 1733",
      libGarde: "Huisarts van wacht",
      libUrgences: "Noodgevallen",
      fermeA: "Sluit om {heure}",
      fermeBientot: "Sluit over {min} min, om {heure}",
      rouvre: "Opnieuw open {quand} om {heure}",
      aujourdhui: "vandaag",
      demain: "morgen",
      prefixeJour: "op ",
    },
    acces: [
      {
        titre: "Afspraak maken",
        texte: "Telefonisch via 02 424 25 40, van maandag tot vrijdag.",
      },
      {
        titre: "Geneesmiddel aanvragen",
        texte:
          "Voor uw chronische behandelingen. Het voorschrift is binnen 72 uur beschikbaar via uw identiteitskaart.",
      },
      {
        titre: "Patiënt worden",
        texte:
          "Woont u in de wijk? Ontdek hoe u zich inschrijft in het wijkgezondheidscentrum.",
      },
    ],
    polesSurtitre: "Het team",
    polesTitre: "Onze zorgdisciplines",
    polesTexte:
      "Zorgverleners die samenwerken rond elke patiënt, met regelmatig overleg.",
    philoSurtitre: "Onze visie",
    philoDebut:
      "Een wijkgezondheidscentrum is een team dat zorgt, voorkomt en steunt op de krachten van de",
    philoMisEnAvant: "buurtbewoners",
    philoFin: ".",
    valeurs: [
      { titre: "Sociale rechtvaardigheid", texte: "Toegankelijke zorg voor iedereen, op basis van gelijkwaardigheid." },
      { titre: "Solidariteit", texte: "Samenwerken in een netwerk met de partners uit de wijk." },
      { titre: "Autonomie", texte: "Respect voor elke persoon en voor diens keuzes over gezondheid." },
      { titre: "Zelfbestuur", texte: "Een team zonder hiërarchie, dat samen beslist." },
    ],
    philoLien: "Meer over onze visie",
    trouverSurtitre: "Ons vinden",
    altFacade: "Ingang van het wijkgezondheidscentrum op nummer 24, met het uithangbord",
    libTelephone: "Telefoon",
    libEmail: "E-mail",
    libHoraires: "Openingsuren",
    libGarde: "Wachtdienst",
    horairesValeur: "Ma – vr, 8u – 19u",
    trouverLien: "Route en bereikbaarheid",
    rejoindreTitre: "Zin om in een zelfgestuurd team te werken?",
    rejoindreTexte: "Ontdek onze vacatures en hoe we samenwerken.",
    rejoindreBouton: "Bekijk de vacatures",
  },
  pied: {
    garde: "Buiten de openingsuren: Brusselse wachtdienst via 1733",
    colPratique: "Praktisch",
    colMaison: "Het wijkgezondheidscentrum",
    asbl: "Maison Médicale Esseghem vzw",
  },
  provisoire: {
    texte:
      "Deze pagina is in voorbereiding. De inhoud wordt overgenomen van de oude website, bijgewerkt en vertaald.",
    enAttendant: "Ondertussen helpt het onthaal u verder via",
    retour: "Terug naar de homepage",
  },
  contact: {
    titre: "Contacteer ons",
    adresse: "Adres",
    telephone: "Telefoon",
    fax: "Fax",
    email: "E-mail",
    horaires: "Openingsuren",
    horairesValeur: "Maandag tot vrijdag, 8u00 – 19u00",
    horsHoraires: "Buiten de openingsuren",
    horsHorairesValeur: "Brusselse wachtdienst: 1733",
    altFacade: "Gevel van het wijkgezondheidscentrum met het uithangbord, Rue Esseghem 24",
    carte: "Hier komt een interactieve kaart.",
  },
};

const en: Dictionnaire = {
  meta: {
    titre: "Maison Médicale Esseghem — Jette",
    description:
      "Neighbourhood health centre in Jette: general practice, physiotherapy, nursing, psychology, speech therapy and social support.",
  },
  commun: {
    allerAuContenu: "Skip to content",
    nomComplet: "Maison Médicale Esseghem",
    horairesCourts: "Mon–Fri 8 am–7 pm",
    gardeCourte: "Out-of-hours service: 1733",
    choisirLangue: "Choose a language",
    filAriane: "Breadcrumb",
    accueil: "Home",
  },
  nav: {
    principal: "Main menu",
    accueil: "Home",
    equipe: "Our team",
    pratique: "Practical information",
    actions: "Health activities",
    contact: "Contact",
    ouvrirMenu: "Open menu",
    fermerMenu: "Close menu",
    appeler: "Call the health centre",
  },
  poles: {
    accueil: "Reception",
    "medecine-generale": "General practice",
    kinesitherapie: "Physiotherapy",
    "pole-infirmier": "Nursing",
    psychologue: "Psychologist",
    "assistante-sociale": "Social worker",
    logopedie: "Speech therapy",
    "actrices-en-sante": "Community health workers",
    "pole-administratif": "Administration",
  },
  pratique: {
    "demande-medicaments": "Medication request",
    inscription: "Register as a patient",
    faq: "FAQ",
    newsletter: "Newsletter",
  },
  actions: {
    planning: "Activity schedule",
    "la-recre": "La récré",
    "psychomotricite-relationnelle": "Relational psychomotor therapy",
  },
  maison: {
    philosophie: "Our philosophy",
    historique: "History",
    "offres-emploi": "Job vacancies",
    confidentialite: "Privacy policy",
  },
  accueil: {
    surtitre: "Neighbourhood health centre in Jette",
    titre: "Comprehensive and accessible healthcare",
    texte:
      "General practice, physiotherapy, nursing, psychology, speech therapy and social support, all under one roof.",
    boutonRdv: "Book an appointment: 02 424 25 40",
    boutonMedic: "Request medication",
    altEquipe: "The Maison Médicale Esseghem team together in the meeting room",
    horairesTitre: "Open Monday to Friday",
    horaires: "8 am – 7 pm",
    garde: "Outside opening hours: on-call service on 1733",
    statut: {
      horairesTitre: "Open Monday to Friday",
      ouvertMaintenant: "Open now",
      fermeActuellement: "Currently closed",
      horairesSemaine: "Monday to Friday · 8 am – 7 pm",
      garde: "Outside opening hours: on-call service on 1733",
      libGarde: "On-call doctor",
      libUrgences: "Emergencies",
      fermeA: "Closes at {heure}",
      fermeBientot: "Closes in {min} min, at {heure}",
      rouvre: "Reopens {quand} at {heure}",
      aujourdhui: "today",
      demain: "tomorrow",
      prefixeJour: "on ",
    },
    acces: [
      {
        titre: "Book an appointment",
        texte: "By phone on 02 424 25 40, Monday to Friday.",
      },
      {
        titre: "Request medication",
        texte:
          "For your ongoing treatments. Your prescription is available on your ID card within 72 hours.",
      },
      {
        titre: "Become a patient",
        texte:
          "Live in the neighbourhood? Find out how to register with the health centre.",
      },
    ],
    polesSurtitre: "Our team",
    polesTitre: "Our care services",
    polesTexte:
      "Professionals who work together around each patient, with regular coordination meetings.",
    philoSurtitre: "Our philosophy",
    philoDebut:
      "A neighbourhood health centre is a team that provides care, prevents illness and draws on the strengths of",
    philoMisEnAvant: "local residents",
    philoFin: ".",
    valeurs: [
      { titre: "Social justice", texte: "Care that is accessible to everyone, based on equity." },
      { titre: "Solidarity", texte: "Working as a network with local partners." },
      { titre: "Autonomy", texte: "Respect for each person and their health choices." },
      { titre: "Self-management", texte: "A team without hierarchy that makes decisions together." },
    ],
    philoLien: "Learn more about our philosophy",
    trouverSurtitre: "Find us",
    altFacade: "Entrance of the health centre at number 24, with its sign",
    libTelephone: "Phone",
    libEmail: "Email",
    libHoraires: "Opening hours",
    libGarde: "Out of hours",
    horairesValeur: "Mon – Fri, 8 am – 7 pm",
    trouverLien: "Directions and access",
    rejoindreTitre: "Would you like to join a self-managed team?",
    rejoindreTexte: "Discover our job vacancies and how we work together.",
    rejoindreBouton: "See vacancies",
  },
  pied: {
    garde: "Outside opening hours: Brussels on-call service on 1733",
    colPratique: "Practical information",
    colMaison: "The health centre",
    asbl: "Maison Médicale Esseghem ASBL",
  },
  provisoire: {
    texte:
      "This page is being prepared. Its content will be taken from the old website, updated and translated.",
    enAttendant: "In the meantime, our reception team can help you on",
    retour: "Back to the home page",
  },
  contact: {
    titre: "Contact us",
    adresse: "Address",
    telephone: "Phone",
    fax: "Fax",
    email: "Email",
    horaires: "Opening hours",
    horairesValeur: "Monday to Friday, 8 am – 7 pm",
    horsHoraires: "Outside opening hours",
    horsHorairesValeur: "Brussels on-call service: 1733",
    altFacade: "Front of the health centre with its sign, Rue Esseghem 24",
    carte: "An interactive map will be added here.",
  },
};

const dictionnaires: Record<Locale, Dictionnaire> = { fr, nl, en };

export function getDictionnaire(lang: Locale): Dictionnaire {
  return dictionnaires[lang];
}
