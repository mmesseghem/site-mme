// Pages « En pratique » : s'inscrire et questions fréquentes.
// Contenu repris de l'ancien site, nettoyé et mis en cohérence (garde : 1733).
// Les informations contradictoires entre pages de l'ancien site sont marquées « à vérifier ».
import { inscriptionsOuvertes } from "@/lib/site";
import type { PageTraduite } from "./types";

const CARTE_OSM = "https://www.openstreetmap.org/search?query=Rue%20Esseghem%2024%2C%201090%20Jette";

export const pagesPratique: Record<string, PageTraduite> = {
  // Complément de la page Contacts : accès (affiché sous les coordonnées).
  contact: {
    fr: {
      blocs: [
        { t: "h2", texte: "Venir à la maison médicale" },
        { t: "liste", items: ["Tram : lignes 19 et 51 (arrêt Cimetière de Jette).", "Bus : lignes 53 et 88.", "Métro : Pannenhuis (environ 750 m).", "Train : gare de Jette, SNCB (environ 600 m)."] },
        { t: "aCompleter", texte: "Parking et accès PMR : à compléter." },
        { t: "lien", texte: "Voir sur la carte (OpenStreetMap)", href: CARTE_OSM },
      ],
    },
    nl: {
      blocs: [
        { t: "h2", texte: "Naar het wijkgezondheidscentrum komen" },
        { t: "liste", items: ["Tram: lijnen 19 en 51 (halte Jette Kerkhof).", "Bus: lijnen 53 en 88.", "Metro: Pannenhuis (ongeveer 750 m).", "Trein: station Jette, NMBS (ongeveer 600 m)."] },
        { t: "aCompleter", texte: "Parkeren en toegankelijkheid voor personen met een beperking: aan te vullen." },
        { t: "lien", texte: "Bekijk op de kaart (OpenStreetMap)", href: CARTE_OSM },
      ],
    },
    en: {
      blocs: [
        { t: "h2", texte: "Getting here" },
        { t: "liste", items: ["Tram: lines 19 and 51 (Cimetière de Jette stop).", "Bus: lines 53 and 88.", "Metro: Pannenhuis (about 750 m).", "Train: Jette station, SNCB (about 600 m)."] },
        { t: "aCompleter", texte: "Parking and wheelchair access: to be completed." },
        { t: "lien", texte: "View on the map (OpenStreetMap)", href: CARTE_OSM },
      ],
    },
  },

  // Page S'inscrire : le message d'état dépend du réglage inscriptionsOuvertes (lib/site.ts).
  "pratique/inscription": {
    fr: {
      soustitre: inscriptionsOuvertes ? "Ce que cela signifie et comment faire" : "Inscriptions fermées pour le moment",
      blocs: [
        inscriptionsOuvertes
          ? { t: "encadre", titre: "Les inscriptions sont ouvertes", texte: "L'inscription se fait sur rendez-vous : contactez l'accueil au 02 424 25 40. Elle prend cours le premier jour du mois qui suit la signature du contrat." }
          : { t: "encadre", titre: "Nous n'inscrivons pas de nouveaux patients pour le moment", texte: "La maison médicale n'accepte plus de nouvelles inscriptions et n'a plus de liste d'attente pour l'instant. Si la situation change, nous l'annoncerons ici." },
        { t: "h2", texte: "Ce que signifie l'inscription au forfait" },
        { t: "p", texte: "Être inscrit à une maison médicale au forfait signifie que vous ne payez plus vos consultations de médecine générale, de kinésithérapie générale et vos soins infirmiers. Votre mutuelle verse chaque mois une somme forfaitaire à la maison médicale pour couvrir votre prise en charge. En contrepartie, vous venez à la maison médicale pour ces soins." },
        { t: "p", texte: "Un contrat individuel est signé entre vous, votre mutuelle et la maison médicale." },
        { t: "h2", texte: "Les conditions" },
        {
          t: "liste",
          items: [
            "habiter à Jette ou dans les environs (zone d'inscription) ;",
            "être affilié à une mutuelle et en ordre d'assurabilité ;",
            "avoir votre carte d'identité (ou des vignettes de mutuelle).",
          ],
        },
        { t: "aCompleter", texte: "Zone d'inscription : carte ou liste des rues à ajouter." },
        { t: "lien", texte: "Pourquoi le forfait ? Notre philosophie", href: "/philosophie" },
      ],
    },
    nl: {
      soustitre: inscriptionsOuvertes ? "Wat het betekent en hoe het werkt" : "Inschrijvingen momenteel gesloten",
      blocs: [
        inscriptionsOuvertes
          ? { t: "encadre", titre: "De inschrijvingen zijn open", texte: "De inschrijving gebeurt op afspraak: neem contact op met het onthaal op 02 424 25 40. Ze gaat in op de eerste dag van de maand na de ondertekening van het contract." }
          : { t: "encadre", titre: "We schrijven momenteel geen nieuwe patiënten in", texte: "Het wijkgezondheidscentrum aanvaardt momenteel geen nieuwe inschrijvingen en heeft geen wachtlijst meer. Als dat verandert, melden we het hier." },
        { t: "h2", texte: "Wat inschrijving met forfait betekent" },
        { t: "p", texte: "Ingeschreven zijn in een wijkgezondheidscentrum met forfait betekent dat u niet meer betaalt voor uw consultaties huisartsgeneeskunde, algemene kinesitherapie en verpleegkundige zorg. Uw ziekenfonds betaalt het wijkgezondheidscentrum elke maand een vast bedrag om uw zorg te dekken. In ruil komt u voor die zorg naar het wijkgezondheidscentrum." },
        { t: "p", texte: "Er wordt een individueel contract ondertekend tussen u, uw ziekenfonds en het wijkgezondheidscentrum." },
        { t: "h2", texte: "De voorwaarden" },
        {
          t: "liste",
          items: [
            "in Jette of omgeving wonen (inschrijvingszone);",
            "aangesloten zijn bij een ziekenfonds en in orde zijn met uw verzekerbaarheid;",
            "uw identiteitskaart (of klevers van het ziekenfonds) bij hebben.",
          ],
        },
        { t: "aCompleter", texte: "Inschrijvingszone: kaart of lijst van straten toe te voegen." },
        { t: "lien", texte: "Waarom het forfait? Onze visie", href: "/philosophie" },
      ],
    },
    en: {
      soustitre: inscriptionsOuvertes ? "What it means and how to do it" : "Registrations currently closed",
      blocs: [
        inscriptionsOuvertes
          ? { t: "encadre", titre: "Registrations are open", texte: "Registration is by appointment: contact reception on 02 424 25 40. It starts on the first day of the month after the contract is signed." }
          : { t: "encadre", titre: "We are not registering new patients at the moment", texte: "The health centre is not accepting new registrations and no longer has a waiting list for now. If this changes, we will announce it here." },
        { t: "h2", texte: "What flat-fee registration means" },
        { t: "p", texte: "Registering with a flat-fee health centre means you no longer pay for general practice consultations, general physiotherapy or nursing care. Your health insurance fund pays the health centre a fixed monthly amount to cover your care. In return, you come to the health centre for this care." },
        { t: "p", texte: "An individual contract is signed between you, your health insurance fund and the health centre." },
        { t: "h2", texte: "Conditions" },
        {
          t: "liste",
          items: [
            "live in or near Jette (registration area);",
            "be a member of a health insurance fund, with your insurance up to date;",
            "have your identity card (or health insurance stickers).",
          ],
        },
        { t: "aCompleter", texte: "Registration area: map or list of streets to be added." },
        { t: "lien", texte: "Why the flat fee? Our philosophy", href: "/philosophie" },
      ],
    },
  },

  // FAQ rédigée par l'équipe (document « Site internet MME », novembre 2026).
  "pratique/faq": {
    fr: {
      soustitre: "Les réponses aux questions les plus fréquentes sur le fonctionnement de la maison médicale",
      blocs: [
        {
          t: "questions",
          items: [
            {
              q: "1. Qu'est-ce que le forfait et comment s'inscrire ?",
              r: [
                "Le forfait est un système de paiement dans lequel votre mutuelle verse chaque mois à la maison médicale une somme fixe pour chaque personne inscrite. Vous ne payez donc plus à chaque consultation de médecine générale, de kinésithérapie ou pour les soins infirmiers compris dans le forfait.",
                "Le forfait ne comprend pas les autres consultations, comme celles chez les médecins spécialistes, le dentiste, la psychologue ou la logopède, ni les examens de laboratoire, les hospitalisations et les médicaments. Ces soins restent payants et sont remboursés selon les modalités habituelles de votre mutuelle.",
                "Pour vous inscrire à la maison médicale, vous devez habiter à Jette ou dans les environs et être en ordre de mutuelle.",
                inscriptionsOuvertes
                  ? "Les inscriptions sont ouvertes : contactez l'accueil au 02 424 25 40."
                  : "Pour le moment, la maison médicale n'accepte plus de nouvelles inscriptions et n'a plus de liste d'attente. Si la situation change, nous l'annoncerons sur la page « S'inscrire à la maison médicale ».",
              ],
            },
            {
              q: "2. Puis-je consulter un médecin ou un kiné en dehors de la maison médicale ?",
              r: [
                "Oui, dans certaines situations : lorsque vous êtes éloigné de la maison médicale (par exemple pendant un week-end ou des vacances), lorsque vous consultez un médecin de garde, ou avec l'accord de l'équipe, par exemple pour une kinésithérapie qui n'est pas proposée à la maison médicale ou en cas de surcharge.",
                "Dans ces situations exceptionnelles, remettez votre attestation de soins à la maison médicale, et non directement à votre mutuelle. La maison médicale vous remboursera selon les modalités prévues.",
              ],
            },
            {
              q: "3. Comment prendre rendez-vous ?",
              r: ["Rendez-vous à l'accueil de la maison médicale ou téléphonez au 02 424 25 40."],
            },
            {
              q: "4. Je suis malade, que faire ?",
              r: [
                "Pendant les heures d'ouverture, de 8 h à 19 h : téléphonez à l'accueil au 02 424 25 40, un rendez-vous vous sera proposé pour une consultation. Les visites à domicile sont réservées aux personnes qui ne peuvent pas se déplacer pour des raisons médicales.",
                "En dehors des heures d'ouverture (après 19 h, le week-end et les jours fériés), contactez la Garde bruxelloise au 1733 ou au 02 201 22 22. Vous payez alors le médecin, puis vous déposez l'attestation de soins à la maison médicale, qui vous remboursera le montant correspondant à l'intervention de la mutuelle.",
                "En cas d'urgence vitale, appelez le 112.",
              ],
            },
            {
              q: "5. Comment demander un médicament ?",
              r: [
                "Faites votre demande à l'accueil, par téléphone ou via le formulaire en ligne de notre site.",
                "Indiquez le nom du médicament, le dosage, le fabricant ou le laboratoire si nécessaire, et le nombre de comprimés ou le format de la boîte.",
                "72 heures après votre demande, votre prescription sera disponible sur votre carte d'identité.",
              ],
            },
            {
              q: "6. Quels sont les services disponibles à la maison médicale ?",
              r: [
                "Compris dans le forfait : la médecine générale, les soins infirmiers et la kinésithérapie.",
                "Accessibles en dehors du forfait : l'assistante sociale et, en grande partie, les activités de promotion de la santé.",
                "Payants : la psychologue et la logopède.",
              ],
            },
            {
              q: "7. Comment venir à la maison médicale ?",
              r: [
                "La Maison Médicale Esseghem se situe au 24, rue Esseghem, 1090 Jette. Elle est facilement accessible en transports en commun.",
                "Avec la STIB : tram 19 et 51 (arrêt Cimetière de Jette) ; bus 53 et 88 ; métro Pannenhuis, à environ 750 m.",
                "La gare de Jette (SNCB) se trouve à environ 600 m.",
              ],
            },
          ],
        },
        { t: "lien", texte: "Nous contacter", href: "/contact" },
      ],
    },
    nl: {
      soustitre: "Antwoorden op de meest gestelde vragen over de werking van het wijkgezondheidscentrum",
      blocs: [
        {
          t: "questions",
          items: [
            {
              q: "1. Wat is het forfait en hoe schrijf ik me in?",
              r: [
                "Het forfait is een betalingssysteem waarbij uw ziekenfonds het wijkgezondheidscentrum elke maand een vast bedrag betaalt voor elke ingeschreven persoon. U betaalt dus niet meer per consultatie huisartsgeneeskunde, kinesitherapie of verpleegkundige zorg die onder het forfait vallen.",
                "Het forfait dekt geen andere consultaties, zoals bij specialisten, de tandarts, de psycholoog of de logopedist, en ook geen laboratoriumonderzoeken, ziekenhuisopnames en geneesmiddelen. Die zorg blijft betalend en wordt terugbetaald zoals gewoonlijk door uw ziekenfonds.",
                "Om u in te schrijven moet u in Jette of omgeving wonen en in orde zijn met uw ziekenfonds.",
                inscriptionsOuvertes
                  ? "De inschrijvingen zijn open: neem contact op met het onthaal op 02 424 25 40."
                  : "Momenteel aanvaardt het wijkgezondheidscentrum geen nieuwe inschrijvingen en is er geen wachtlijst meer. Als dat verandert, melden we het op de pagina « Inschrijven in het wijkgezondheidscentrum ».",
              ],
            },
            {
              q: "2. Mag ik een arts of kinesitherapeut buiten het wijkgezondheidscentrum raadplegen?",
              r: [
                "Ja, in bepaalde situaties: als u ver van het wijkgezondheidscentrum bent (bijvoorbeeld tijdens een weekend of op vakantie), als u een wachtarts raadpleegt, of met het akkoord van het team, bijvoorbeeld voor kinesitherapie die het centrum niet aanbiedt of bij overbelasting.",
                "Geef in die uitzonderlijke situaties uw getuigschrift voor verstrekte hulp af aan het wijkgezondheidscentrum, en niet rechtstreeks aan uw ziekenfonds. Het wijkgezondheidscentrum betaalt u terug volgens de geldende regels.",
              ],
            },
            {
              q: "3. Hoe maak ik een afspraak?",
              r: ["Ga langs het onthaal van het wijkgezondheidscentrum of bel 02 424 25 40."],
            },
            {
              q: "4. Ik ben ziek, wat moet ik doen?",
              r: [
                "Tijdens de openingsuren, van 8 tot 19 uur: bel het onthaal op 02 424 25 40, u krijgt een afspraak voor een consultatie. Huisbezoeken zijn voorbehouden aan wie zich om medische redenen niet kan verplaatsen.",
                "Buiten de openingsuren (na 19 uur, in het weekend en op feestdagen) belt u de Brusselse wachtdienst op 1733 of 02 201 22 22. U betaalt dan de arts en brengt daarna het getuigschrift naar het wijkgezondheidscentrum, dat u het bedrag van de tussenkomst van het ziekenfonds terugbetaalt.",
                "Bij levensbedreigende noodgevallen belt u 112.",
              ],
            },
            {
              q: "5. Hoe vraag ik een geneesmiddel aan?",
              r: [
                "Vraag het aan bij het onthaal, telefonisch of via het onlineformulier op onze website.",
                "Vermeld de naam van het geneesmiddel, de dosis, indien nodig de fabrikant of het labo, en het aantal tabletten of het formaat van de verpakking.",
                "72 uur na uw aanvraag staat uw voorschrift op uw identiteitskaart.",
              ],
            },
            {
              q: "6. Welke diensten biedt het wijkgezondheidscentrum aan?",
              r: [
                "Onder het forfait: huisartsgeneeskunde, verpleegkundige zorg en kinesitherapie.",
                "Toegankelijk buiten het forfait: de maatschappelijk assistent en grotendeels ook de activiteiten rond gezondheidspromotie.",
                "Betalend: de psycholoog en de logopedist.",
              ],
            },
            {
              q: "7. Hoe kom ik naar het wijkgezondheidscentrum?",
              r: [
                "Maison Médicale Esseghem bevindt zich in Rue Esseghem 24, 1090 Jette. Het is vlot bereikbaar met het openbaar vervoer.",
                "Met de MIVB: tram 19 en 51 (halte Jette Kerkhof); bus 53 en 88; metro Pannenhuis, op ongeveer 750 m.",
                "Het station Jette (NMBS) ligt op ongeveer 600 m.",
              ],
            },
          ],
        },
        { t: "lien", texte: "Contacteer ons", href: "/contact" },
      ],
    },
    en: {
      soustitre: "Answers to the most common questions about how the health centre works",
      blocs: [
        {
          t: "questions",
          items: [
            {
              q: "1. What is the flat fee and how do I register?",
              r: [
                "The flat fee is a payment system in which your health insurance fund pays the health centre a fixed monthly amount for each registered person. So you no longer pay for each general practice, physiotherapy or nursing consultation covered by the flat fee.",
                "The flat fee does not cover other consultations, such as specialists, the dentist, the psychologist or the speech therapist, nor laboratory tests, hospital stays or medicines. You pay for these and are reimbursed by your health insurance fund as usual.",
                "To register, you must live in or near Jette and have your health insurance up to date.",
                inscriptionsOuvertes
                  ? "Registrations are open: contact reception on 02 424 25 40."
                  : "At the moment, the health centre is not accepting new registrations and no longer has a waiting list. If this changes, we will announce it on the « Register with the health centre » page.",
              ],
            },
            {
              q: "2. Can I see a doctor or physiotherapist outside the health centre?",
              r: [
                "Yes, in some situations: when you are away from the health centre (for example at the weekend or on holiday), when you see an on-call doctor, or with the team's agreement, for example for a type of physiotherapy we do not offer or when we are overloaded.",
                "In these exceptional situations, give your certificate of care to the health centre, not directly to your health insurance fund. The health centre will reimburse you according to the applicable rules.",
              ],
            },
            {
              q: "3. How do I make an appointment?",
              r: ["Come to the health centre's reception or call 02 424 25 40."],
            },
            {
              q: "4. I'm ill, what should I do?",
              r: [
                "During opening hours, from 8 am to 7 pm: call reception on 02 424 25 40 and you will be offered an appointment. Home visits are reserved for people who cannot travel for medical reasons.",
                "Outside opening hours (after 7 pm, at weekends and on public holidays), call the Brussels out-of-hours service (Garde bruxelloise) on 1733 or 02 201 22 22. You pay the doctor, then bring the certificate of care to the health centre, which will reimburse the amount your health insurance fund would have paid.",
                "In a life-threatening emergency, call 112.",
              ],
            },
            {
              q: "5. How do I request medication?",
              r: [
                "Ask at reception, by phone or using the online form on our website.",
                "Give the name of the medicine, the dose, the manufacturer or laboratory if needed, and the number of tablets or the box size.",
                "72 hours after your request, your prescription will be available on your identity card.",
              ],
            },
            {
              q: "6. What services does the health centre offer?",
              r: [
                "Covered by the flat fee: general practice, nursing care and physiotherapy.",
                "Available outside the flat fee: the social worker and, for the most part, health promotion activities.",
                "Paid services: the psychologist and the speech therapist.",
              ],
            },
            {
              q: "7. How do I get to the health centre?",
              r: [
                "Maison Médicale Esseghem is at 24 rue Esseghem, 1090 Jette. It is easy to reach by public transport.",
                "With STIB: tram 19 and 51 (Cimetière de Jette stop); bus 53 and 88; metro Pannenhuis, about 750 m away.",
                "Jette railway station (SNCB) is about 600 m away.",
              ],
            },
          ],
        },
        { t: "lien", texte: "Contact us", href: "/contact" },
      ],
    },
  },
};
