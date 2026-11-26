// Pages sans contenu détaillé sur l'ancien site, ou qui dépendent d'outils à venir
// (formulaire de médicaments, newsletter, planning). Textes d'attente sûrs, sans collecte de données.
import type { PageTraduite } from "./types";

export const pagesDivers: Record<string, PageTraduite> = {
  "pratique/demande-medicaments": {
    fr: {
      soustitre: "Pour vos traitements chroniques connus",
      blocs: [
        { t: "p", texte: "Vous pouvez demander le renouvellement de vos médicaments pour un traitement chronique déjà connu de votre médecin." },
        { t: "etapes", items: ["Remplissez le formulaire ci-dessous, ou faites votre demande à l'accueil, sur place ou par téléphone au 02 424 25 40.", "Précisez le nom du médicament, le dosage, la forme et le type de boîte.", "72 heures plus tard, votre prescription est disponible sur votre carte d'identité : rendez-vous simplement à votre pharmacie."] },
      ],
    },
    nl: {
      soustitre: "Voor uw gekende chronische behandelingen",
      blocs: [
        { t: "p", texte: "U kunt de hernieuwing aanvragen van geneesmiddelen voor een chronische behandeling die uw arts al kent." },
        { t: "etapes", items: ["Vul het formulier hieronder in, of vraag het aan bij het onthaal, ter plaatse of telefonisch op 02 424 25 40.", "Vermeld de naam van het geneesmiddel, de dosis, de vorm en het type verpakking.", "72 uur later staat uw voorschrift op uw identiteitskaart: ga gewoon naar uw apotheek."] },
      ],
    },
    en: {
      soustitre: "For your known ongoing treatments",
      blocs: [
        { t: "p", texte: "You can ask to renew medication for an ongoing treatment that your doctor already knows about." },
        { t: "etapes", items: ["Fill in the form below, or ask at reception, in person or by phone on 02 424 25 40.", "Give the name of the medicine, the dose, the form and the type of box.", "72 hours later, your prescription is available on your identity card: simply go to your pharmacy."] },
      ],
    },
  },

  "offres-emploi": {
    fr: {
      soustitre: "Rejoindre une équipe autogérée",
      blocs: [
        { t: "p", texte: "La maison médicale réunit une équipe pluridisciplinaire de première ligne : médecins, kinésithérapeutes, infirmières, accueil, assistante sociale, psychologue, logopède, ergothérapie et promotion de la santé." },
        { t: "p", texte: "Elle fonctionne en autogestion, sans hiérarchie : chacun participe aux réunions, à la cohésion de l'équipe et à la vie de la maison. Nous sommes attentifs au travail en situation de diversité socioculturelle et de précarité." },
        { t: "aCompleter", texte: "Offres en cours : aucune annonce n'est reprise de l'ancien site. À compléter quand un poste s'ouvre (et comment postuler)." },
        { t: "lien", texte: "Notre philosophie", href: "/philosophie" },
      ],
    },
    nl: {
      soustitre: "Werken in een zelfgestuurd team",
      blocs: [
        { t: "p", texte: "Het wijkgezondheidscentrum brengt een multidisciplinair eerstelijnsteam samen: artsen, kinesitherapeuten, verpleegkundigen, onthaal, maatschappelijk assistent, psycholoog, logopedist, ergotherapie en gezondheidspromotie." },
        { t: "p", texte: "Het werkt zelfgestuurd, zonder hiërarchie: iedereen neemt deel aan de vergaderingen, de teamwerking en het leven van het centrum. We hebben oog voor werken in een context van socio-culturele diversiteit en kwetsbaarheid." },
        { t: "aCompleter", texte: "Openstaande vacatures: aan te vullen wanneer er een functie vrijkomt (en hoe te solliciteren)." },
        { t: "lien", texte: "Onze visie", href: "/philosophie" },
      ],
    },
    en: {
      soustitre: "Join a self-managed team",
      blocs: [
        { t: "p", texte: "The health centre brings together a multidisciplinary primary care team: doctors, physiotherapists, nurses, reception, social worker, psychologist, speech therapist, occupational therapy and health promotion." },
        { t: "p", texte: "It is self-managed, without hierarchy: everyone takes part in meetings, team life and the running of the centre. We value working in a context of socio-cultural diversity and hardship." },
        { t: "aCompleter", texte: "Current vacancies: to be completed when a position opens (and how to apply)." },
        { t: "lien", texte: "Our philosophy", href: "/philosophie" },
      ],
    },
  },

  "pratique/newsletter": {
    fr: {
      soustitre: "Les nouvelles de la maison médicale et du quartier",
      blocs: [
        { t: "p", texte: "La newsletter présente les activités, les campagnes de prévention et les nouvelles de l'équipe. Elle est aussi disponible en salle d'attente." },
        { t: "aCompleter", texte: "Inscription à la newsletter et archive des anciens numéros : à venir avec l'espace d'administration (outil d'envoi à choisir)." },
        { t: "lien", texte: "Voir le planning des activités", href: "/actions/planning" },
      ],
    },
    nl: {
      soustitre: "Nieuws van het wijkgezondheidscentrum en de wijk",
      blocs: [
        { t: "p", texte: "De nieuwsbrief stelt de activiteiten, preventiecampagnes en het nieuws van het team voor. U vindt hem ook in de wachtzaal." },
        { t: "aCompleter", texte: "Inschrijving op de nieuwsbrief en archief: volgt met de beheerruimte." },
        { t: "lien", texte: "Bekijk de activiteitenplanning", href: "/actions/planning" },
      ],
    },
    en: {
      soustitre: "News from the health centre and the neighbourhood",
      blocs: [
        { t: "p", texte: "The newsletter presents our activities, prevention campaigns and team news. It is also available in the waiting room." },
        { t: "aCompleter", texte: "Newsletter sign-up and archive: coming with the administration area." },
        { t: "lien", texte: "See the activity schedule", href: "/actions/planning" },
      ],
    },
  },

  "actions/planning": {
    fr: {
      soustitre: "Ateliers, balades santé et actions de prévention",
      blocs: [
        { t: "p", texte: "La maison médicale propose tout au long de l'année des activités ouvertes à tous : balades santé, yoga, ateliers créatifs ou cuisine, animations en salle d'attente et campagnes de prévention." },
        { t: "aCompleter", texte: "Planning des activités : il sera géré directement par l'équipe depuis l'espace d'administration (affichage par mois ou en liste, inscriptions)." },
        { t: "p", texte: "En attendant, renseignez-vous à l'accueil ou consultez les affiches en salle d'attente." },
        { t: "lien", texte: "Les actrices en santé", href: "/equipe/actrices-en-sante" },
      ],
    },
    nl: {
      soustitre: "Workshops, gezondheidswandelingen en preventieacties",
      blocs: [
        { t: "p", texte: "Het wijkgezondheidscentrum organiseert het hele jaar door activiteiten voor iedereen: gezondheidswandelingen, yoga, creatieve of kookworkshops, animaties in de wachtzaal en preventiecampagnes." },
        { t: "aCompleter", texte: "Activiteitenplanning: wordt rechtstreeks door het team beheerd via de beheerruimte." },
        { t: "p", texte: "Ondertussen kunt u informatie vragen aan het onthaal of de affiches in de wachtzaal bekijken." },
        { t: "lien", texte: "De gezondheidswerkers", href: "/equipe/actrices-en-sante" },
      ],
    },
    en: {
      soustitre: "Workshops, health walks and prevention activities",
      blocs: [
        { t: "p", texte: "Throughout the year, the health centre offers activities open to everyone: health walks, yoga, craft or cooking workshops, waiting-room activities and prevention campaigns." },
        { t: "aCompleter", texte: "Activity schedule: will be managed directly by the team from the administration area." },
        { t: "p", texte: "In the meantime, ask at reception or look at the posters in the waiting room." },
        { t: "lien", texte: "Our community health workers", href: "/equipe/actrices-en-sante" },
      ],
    },
  },
};
