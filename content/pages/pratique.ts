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
        { t: "liste", items: ["Tram : lignes 19, 51 et 93 (arrêt Cimetière de Jette).", "Bus : lignes 53 et 88.", "Métro : Pannenhuis (environ 750 m), Bockstael (environ 850 m).", "Train : gare de Jette (environ 600 m)."], verifier: true },
        { t: "aCompleter", texte: "Parking et accès PMR : à compléter." },
        { t: "lien", texte: "Voir sur la carte (OpenStreetMap)", href: CARTE_OSM },
      ],
    },
    nl: {
      blocs: [
        { t: "h2", texte: "Naar het wijkgezondheidscentrum komen" },
        { t: "liste", items: ["Tram: lijnen 19, 51 en 93 (halte Jette Kerkhof).", "Bus: lijnen 53 en 88.", "Metro: Pannenhuis (ongeveer 750 m), Bockstael (ongeveer 850 m).", "Trein: station Jette (ongeveer 600 m)."], verifier: true },
        { t: "aCompleter", texte: "Parkeren en toegankelijkheid voor personen met een beperking: aan te vullen." },
        { t: "lien", texte: "Bekijk op de kaart (OpenStreetMap)", href: CARTE_OSM },
      ],
    },
    en: {
      blocs: [
        { t: "h2", texte: "Getting here" },
        { t: "liste", items: ["Tram: lines 19, 51 and 93 (Cimetière de Jette stop).", "Bus: lines 53 and 88.", "Metro: Pannenhuis (about 750 m), Bockstael (about 850 m).", "Train: Jette station (about 600 m)."], verifier: true },
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
            "habiter dans la zone d'inscription ;",
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
            "in de inschrijvingszone wonen;",
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
            "live within the registration area;",
            "be a member of a health insurance fund, with your insurance up to date;",
            "have your identity card (or health insurance stickers).",
          ],
        },
        { t: "aCompleter", texte: "Registration area: map or list of streets to be added." },
        { t: "lien", texte: "Why the flat fee? Our philosophy", href: "/philosophie" },
      ],
    },
  },

  "pratique/faq": {
    fr: {
      soustitre: "Les réponses aux questions les plus courantes",
      blocs: [
        { t: "h2", texte: "Le forfait" },
        {
          t: "questions",
          items: [
            {
              q: "Que signifie « maison médicale au forfait » ?",
              r: [
                "Votre mutuelle verse chaque mois à la maison médicale une somme fixe par personne inscrite, que vous veniez ou non. Cette somme couvre vos soins de médecine générale, de kinésithérapie et vos soins infirmiers. Le système est régi par un règlement de l'INAMI.",
                "Vous ne payez donc plus à chaque consultation : vous payez la maison médicale par votre mutuelle et vos cotisations sociales. C'est un système solidaire : votre forfait permet aussi de soigner les personnes plus malades que vous.",
              ],
            },
            {
              q: "Qui peut venir à la maison médicale ?",
              r: ["Toutes les personnes inscrites, c'est-à-dire qui ont signé le contrat d'abonnement au forfait."],
            },
            {
              q: "Quels sont les engagements de chacun ?",
              r: [
                "La maison médicale s'engage à vous fournir les soins de médecine générale, de kinésithérapie et les soins infirmiers, à tenir à jour votre dossier médical global, à vous accompagner dans le suivi de votre santé (dépistages, vaccinations…) et à vous proposer des activités de promotion de la santé.",
                "Vous vous engagez à être en ordre de mutuelle, à vous faire soigner exclusivement à la maison médicale pour la médecine générale, la kinésithérapie et les soins infirmiers, et à nous signaler tout changement administratif.",
                "Votre mutuelle s'engage à verser chaque mois un montant fixe à la maison médicale.",
              ],
            },
            {
              q: "Qu'est-ce qui n'est pas compris dans le forfait ?",
              r: ["Les médecins spécialistes, le dentiste, la psychologue, la logopédie, les examens de laboratoire, les hospitalisations et les médicaments. Ils sont payants et remboursés normalement par votre mutuelle."],
            },
            {
              q: "Une fois inscrit, puis-je consulter un autre médecin, kiné ou infirmier ?",
              r: [
                "En principe non : votre mutuelle ne vous remboursera pas. Il existe des exceptions : si vous êtes malade en vacances ou hors de la zone de la maison médicale, si vous appelez la garde le soir ou le week-end, ou si un thérapeute de la maison médicale vous a donné son accord écrit pour des soins à l'extérieur.",
                "Dans ces cas, remettez votre attestation de soins à la maison médicale (et non à la mutuelle) : elle vous remboursera.",
                "Pour un spécialiste, un dentiste, un psychologue ou un logopède, vous pouvez consulter à l'extérieur et être remboursé par votre mutuelle.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Rendez-vous et urgences" },
        {
          t: "questions",
          items: [
            {
              q: "Comment prendre rendez-vous ?",
              r: ["À l'accueil de la maison médicale ou par téléphone au 02 424 25 40, du lundi au vendredi de 8 h à 19 h. Les visites à domicile sont réservées aux personnes qui ne peuvent pas se déplacer pour raison médicale."],
            },
            {
              q: "Je ne peux pas venir à mon rendez-vous : que faire ?",
              r: ["Prévenez l'accueil le plus tôt possible pour que le rendez-vous puisse être donné à quelqu'un d'autre. Tout rendez-vous manqué sans avoir prévenu est facturé 5 euros."],
            },
            {
              q: "Comment demander une visite à domicile ?",
              r: ["Téléphonez à l'accueil le matin, à partir de 8 h, et expliquez la raison de votre demande. Selon la situation et la disponibilité des médecins, l'accueil vous confirmera la visite. Les visites sont réservées aux personnes qui ne peuvent pas se déplacer pour raison médicale (fièvre, mauvais état général…) et aux personnes à mobilité réduite."],
            },
            {
              q: "Que faire en cas d'urgence, le soir ou le week-end ?",
              r: [
                "En dehors des heures d'ouverture (le soir après 19 h, le week-end et les jours fériés), appelez la garde de médecine générale au 1733. En cas d'urgence vitale, appelez le 112.",
                "Si vous payez le médecin de garde, déposez ensuite l'attestation de soins à la maison médicale pour être remboursé.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Médicaments et soins" },
        {
          t: "questions",
          items: [
            {
              q: "J'ai besoin d'un médicament pour un traitement chronique",
              r: [
                "Faites votre demande à l'accueil, sur place, par téléphone ou en ligne. 72 heures plus tard, votre prescription est disponible en pharmacie avec votre carte d'identité.",
                "Précisez le nom du médicament, le dosage (par exemple 10 mg), la marque (Mylan, EG…) et le nombre de comprimés par boîte.",
              ],
            },
            {
              q: "J'ai une prescription de kinésithérapie",
              r: ["Apportez-la à l'accueil : les kinés vous contacteront pour fixer un premier rendez-vous. Si vous êtes inscrit, vous devez passer par le service de kinésithérapie de la maison médicale, sinon la mutuelle ne remboursera pas."],
            },
            {
              q: "J'ai besoin de soins infirmiers",
              r: ["Les soins se font au dispensaire de la maison médicale (voir les horaires sur la page du pôle infirmier) ou à domicile sur prescription médicale. Pour des soins à domicile, appelez l'accueil en précisant que vous avez une prescription ; sinon, demandez-la à votre médecin généraliste."],
            },
            {
              q: "J'ai besoin d'une psychologue, d'une logopède ou de l'assistante sociale",
              r: ["Adressez-vous à l'accueil, qui vous donnera les moments de permanence ou le document de demande de suivi. La psychologie et la logopédie ne sont pas comprises dans le forfait ; l'assistante sociale est gratuite pour les patients."],
            },
            {
              q: "Je souhaite parler à un membre de l'équipe",
              r: ["Contactez-le pendant ses moments de permanence. L'accueil peut vous les communiquer."],
            },
          ],
        },
        { t: "h2", texte: "Venir à la maison médicale" },
        {
          t: "questions",
          items: [
            {
              q: "Comment venir en transports en commun ?",
              r: [
                "Tram : lignes 19, 51 et 93 (arrêt Cimetière de Jette). Bus : lignes 53 et 88.",
                "Métro : Pannenhuis (environ 750 m), Bockstael (environ 850 m).",
                "Train : gare de Jette (environ 600 m), Tour et Taxis et Bockstael (environ 850 m).",
              ],
            },
          ],
        },
        { t: "aCompleter", texte: "Lignes de transport et horaires du dispensaire : à vérifier (l'ancien site donnait des informations différentes selon les pages)." },
      ],
    },
    nl: {
      soustitre: "Antwoorden op de meest gestelde vragen",
      blocs: [
        { t: "h2", texte: "Het forfait" },
        {
          t: "questions",
          items: [
            {
              q: "Wat betekent een wijkgezondheidscentrum met forfait?",
              r: [
                "Uw ziekenfonds betaalt het wijkgezondheidscentrum elke maand een vast bedrag per ingeschreven persoon, of u nu komt of niet. Dat bedrag dekt uw zorg in huisartsgeneeskunde, kinesitherapie en verpleegkunde. Het systeem is geregeld door het RIZIV.",
                "U betaalt dus niet meer per consultatie: u betaalt het wijkgezondheidscentrum via uw ziekenfonds en uw sociale bijdragen. Het is een solidair systeem: uw forfait helpt ook om mensen te verzorgen die zieker zijn dan u.",
              ],
            },
            {
              q: "Wie kan bij het wijkgezondheidscentrum terecht?",
              r: ["Iedereen die ingeschreven is, dat wil zeggen het forfaitcontract heeft ondertekend."],
            },
            {
              q: "Wat zijn de afspraken voor iedereen?",
              r: [
                "Het wijkgezondheidscentrum verbindt zich ertoe u huisartsgeneeskunde, kinesitherapie en verpleegkundige zorg te bieden, uw globaal medisch dossier bij te houden, u te begeleiden in de opvolging van uw gezondheid (screenings, vaccinaties…) en u activiteiten rond gezondheidspromotie aan te bieden.",
                "U verbindt zich ertoe in orde te zijn met uw ziekenfonds, u voor huisartsgeneeskunde, kinesitherapie en verpleegkunde uitsluitend in het wijkgezondheidscentrum te laten verzorgen, en elke administratieve wijziging door te geven.",
                "Uw ziekenfonds verbindt zich ertoe elke maand een vast bedrag aan het wijkgezondheidscentrum te betalen.",
              ],
            },
            {
              q: "Wat valt niet onder het forfait?",
              r: ["Specialisten, de tandarts, de psycholoog, logopedie, laboratoriumonderzoeken, ziekenhuisopnames en geneesmiddelen. Die zijn betalend en worden gewoon door uw ziekenfonds terugbetaald."],
            },
            {
              q: "Kan ik, eenmaal ingeschreven, een andere arts, kinesitherapeut of verpleegkundige raadplegen?",
              r: [
                "In principe niet: uw ziekenfonds betaalt dan niet terug. Er zijn uitzonderingen: als u ziek bent op vakantie of buiten de zone van het wijkgezondheidscentrum, als u 's avonds of in het weekend de wachtdienst belt, of als een zorgverlener van het wijkgezondheidscentrum u schriftelijke toestemming gaf voor zorg elders.",
                "Geef in die gevallen uw getuigschrift voor verstrekte hulp af aan het wijkgezondheidscentrum (en niet aan het ziekenfonds): u wordt terugbetaald.",
                "Voor een specialist, tandarts, psycholoog of logopedist kunt u elders terecht en wordt u door uw ziekenfonds terugbetaald.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Afspraken en dringende zorg" },
        {
          t: "questions",
          items: [
            {
              q: "Hoe maak ik een afspraak?",
              r: ["Aan het onthaal van het wijkgezondheidscentrum of telefonisch op 02 424 25 40, van maandag tot vrijdag van 8 tot 19 uur. Huisbezoeken zijn voorbehouden aan wie zich om medische redenen niet kan verplaatsen."],
            },
            {
              q: "Ik kan niet naar mijn afspraak komen: wat nu?",
              r: ["Verwittig het onthaal zo snel mogelijk, zodat de afspraak aan iemand anders kan worden gegeven. Een gemiste afspraak zonder verwittiging wordt aangerekend aan 5 euro."],
            },
            {
              q: "Hoe vraag ik een huisbezoek aan?",
              r: ["Bel het onthaal 's ochtends vanaf 8 uur en leg uit waarom u een huisbezoek vraagt. Afhankelijk van de situatie en de beschikbaarheid van de artsen bevestigt het onthaal het bezoek. Huisbezoeken zijn voorbehouden aan wie zich om medische redenen niet kan verplaatsen (koorts, slechte algemene toestand…) en aan personen met beperkte mobiliteit."],
            },
            {
              q: "Wat doe ik bij dringende zorg, 's avonds of in het weekend?",
              r: [
                "Buiten de openingsuren ('s avonds na 19 uur, in het weekend en op feestdagen) belt u de huisartsenwachtdienst op 1733. Bij levensbedreigende noodgevallen belt u 112.",
                "Betaalt u de wachtarts, breng dan het getuigschrift naar het wijkgezondheidscentrum om terugbetaald te worden.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Geneesmiddelen en zorg" },
        {
          t: "questions",
          items: [
            {
              q: "Ik heb een geneesmiddel nodig voor een chronische behandeling",
              r: [
                "Vraag het aan bij het onthaal, ter plaatse, telefonisch of online. 72 uur later is uw voorschrift beschikbaar bij de apotheek met uw identiteitskaart.",
                "Vermeld de naam van het geneesmiddel, de dosis (bijvoorbeeld 10 mg), het merk (Mylan, EG…) en het aantal tabletten per doos.",
              ],
            },
            {
              q: "Ik heb een voorschrift voor kinesitherapie",
              r: ["Breng het naar het onthaal: de kinesitherapeuten nemen contact met u op voor een eerste afspraak. Bent u ingeschreven, dan moet u bij de kinesitherapie van het wijkgezondheidscentrum terecht, anders betaalt het ziekenfonds niet terug."],
            },
            {
              q: "Ik heb verpleegkundige zorg nodig",
              r: ["De zorg gebeurt in de verpleegpost van het wijkgezondheidscentrum (zie de uren op de pagina van het verpleegkundig team) of thuis, op medisch voorschrift. Voor thuiszorg belt u het onthaal en vermeldt u dat u een voorschrift hebt; anders vraagt u het aan uw huisarts."],
            },
            {
              q: "Ik heb een psycholoog, logopedist of maatschappelijk assistent nodig",
              r: ["Wend u tot het onthaal, dat u de permanentie-uren of het aanvraagformulier geeft. Psychologie en logopedie vallen niet onder het forfait; de maatschappelijk assistent is gratis voor patiënten."],
            },
            {
              q: "Ik wil een teamlid spreken",
              r: ["Neem contact op tijdens zijn of haar permanentie. Het onthaal kan u die uren geven."],
            },
          ],
        },
        { t: "h2", texte: "Naar het wijkgezondheidscentrum komen" },
        {
          t: "questions",
          items: [
            {
              q: "Hoe kom ik er met het openbaar vervoer?",
              r: [
                "Tram: lijnen 19, 51 en 93 (halte Jette Kerkhof). Bus: lijnen 53 en 88.",
                "Metro: Pannenhuis (ongeveer 750 m), Bockstael (ongeveer 850 m).",
                "Trein: station Jette (ongeveer 600 m), Thurn en Taxis en Bockstael (ongeveer 850 m).",
              ],
            },
          ],
        },
        { t: "aCompleter", texte: "Vervoerslijnen en uren van de verpleegpost: te controleren." },
      ],
    },
    en: {
      soustitre: "Answers to the most common questions",
      blocs: [
        { t: "h2", texte: "The flat-fee system" },
        {
          t: "questions",
          items: [
            {
              q: "What is a flat-fee health centre?",
              r: [
                "Your health insurance fund pays the health centre a fixed monthly amount for each registered person, whether or not you come. This covers your general practice, physiotherapy and nursing care. The system is governed by INAMI (the national health insurance institute).",
                "So you no longer pay for each consultation: you pay the health centre through your health insurance fund and your social security contributions. It is a solidarity-based system: your flat fee also helps to care for people who are more ill than you.",
              ],
            },
            {
              q: "Who can come to the health centre?",
              r: ["Everyone who is registered, that is, who has signed the flat-fee contract."],
            },
            {
              q: "What does each party commit to?",
              r: [
                "The health centre commits to providing general practice, physiotherapy and nursing care, keeping your overall medical record up to date, supporting you in looking after your health (screening, vaccinations…) and offering health promotion activities.",
                "You commit to keeping your health insurance up to date, getting your general practice, physiotherapy and nursing care only at the health centre, and telling us about any administrative changes.",
                "Your health insurance fund commits to paying the health centre a fixed amount every month.",
              ],
            },
            {
              q: "What is not covered by the flat fee?",
              r: ["Specialists, the dentist, the psychologist, speech therapy, laboratory tests, hospital stays and medicines. You pay for these and are reimbursed by your health insurance fund as usual."],
            },
            {
              q: "Once registered, can I see another doctor, physiotherapist or nurse?",
              r: [
                "In principle no: your health insurance fund will not reimburse you. There are exceptions: if you fall ill on holiday or outside the health centre's area, if you call the out-of-hours service in the evening or at the weekend, or if a health centre practitioner has given you written permission for care elsewhere.",
                "In these cases, give your certificate of care to the health centre (not to your health insurance fund): the health centre will reimburse you.",
                "For a specialist, dentist, psychologist or speech therapist, you can go elsewhere and be reimbursed by your health insurance fund.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Appointments and emergencies" },
        {
          t: "questions",
          items: [
            {
              q: "How do I make an appointment?",
              r: ["At the health centre's reception or by phone on 02 424 25 40, Monday to Friday from 8 am to 7 pm. Home visits are reserved for people who cannot travel for medical reasons."],
            },
            {
              q: "I can't come to my appointment: what should I do?",
              r: ["Let reception know as soon as possible so the appointment can be given to someone else. Any appointment missed without notice is charged 5 euros."],
            },
            {
              q: "How do I ask for a home visit?",
              r: ["Call reception in the morning from 8 am and explain why you need a visit. Depending on the situation and the doctors' availability, reception will confirm the visit. Home visits are reserved for people who cannot travel for medical reasons (fever, feeling very unwell…) and for people with reduced mobility."],
            },
            {
              q: "What should I do in an emergency, in the evening or at the weekend?",
              r: [
                "Outside opening hours (after 7 pm, at weekends and on public holidays), call the out-of-hours GP service on 1733. In a life-threatening emergency, call 112.",
                "If you pay the on-call doctor, bring the certificate of care to the health centre to be reimbursed.",
              ],
            },
          ],
        },
        { t: "h2", texte: "Medicines and care" },
        {
          t: "questions",
          items: [
            {
              q: "I need medication for an ongoing treatment",
              r: [
                "Ask at reception, in person, by phone or online. 72 hours later, your prescription is available at the pharmacy with your identity card.",
                "Give the name of the medicine, the dose (for example 10 mg), the brand (Mylan, EG…) and the number of tablets per box.",
              ],
            },
            {
              q: "I have a physiotherapy prescription",
              r: ["Bring it to reception: the physiotherapists will contact you to set up a first appointment. If you are registered, you must use the health centre's physiotherapy service, otherwise your health insurance fund will not reimburse you."],
            },
            {
              q: "I need nursing care",
              r: ["Care is provided at the health centre's nursing clinic (see the hours on the nursing page) or at home on medical prescription. For home care, call reception and say that you have a prescription; otherwise, ask your GP for one."],
            },
            {
              q: "I need a psychologist, speech therapist or social worker",
              r: ["Ask at reception, who will give you the contact times or the referral form. Psychology and speech therapy are not covered by the flat fee; the social worker is free for patients."],
            },
            {
              q: "I would like to speak to a member of the team",
              r: ["Contact them during their contact hours. Reception can tell you when these are."],
            },
          ],
        },
        { t: "h2", texte: "Getting to the health centre" },
        {
          t: "questions",
          items: [
            {
              q: "How do I get there by public transport?",
              r: [
                "Tram: lines 19, 51 and 93 (Cimetière de Jette stop). Bus: lines 53 and 88.",
                "Metro: Pannenhuis (about 750 m), Bockstael (about 850 m).",
                "Train: Jette station (about 600 m), Tour & Taxis and Bockstael (about 850 m).",
              ],
            },
          ],
        },
        { t: "aCompleter", texte: "Transport lines and nursing clinic hours: to be checked." },
      ],
    },
  },
};
