// Pages des pôles de l'équipe. Contenu repris de l'ancien site (export WordPress du 4/11/2026),
// nettoyé (liens piratés retirés), mis à jour et traduit.
// Les noms du personnel ne sont pas repris : l'équipe a changé, chaque pôle les vérifiera.
import type { PageTraduite } from "./types";

const photoComptoir = { src: "/images/photos/accueil-comptoir.jpg", largeur: 1024, hauteur: 683 };
const photoCabinet = { src: "/images/photos/cabinet-consultation.jpg", largeur: 1024, hauteur: 683 };
const photoKine = { src: "/images/photos/kine-plateau.jpg", largeur: 1024, hauteur: 683 };

export const pagesEquipe: Record<string, PageTraduite> = {
  "equipe/accueil": {
    fr: {
      soustitre: "Votre premier contact avec la maison médicale",
      blocs: [
        { t: "p", texte: "L'accueil est le premier contact avec la maison médicale, et l'intermédiaire entre les patients, les thérapeutes et l'administration." },
        { t: "p", texte: "Pour tout renseignement, adressez-vous d'abord à l'accueil : l'équipe se fera un plaisir de vous répondre." },
        { t: "p", texte: "L'accueil et la centrale téléphonique sont joignables du lundi au vendredi, de 8 h à 19 h, au 02 424 25 40." },
        { t: "photo", alt: "Le comptoir d'accueil de la maison médicale", ...photoComptoir },
        { t: "aCompleter", texte: "Équipe de l'accueil : noms à vérifier et compléter par le pôle." },
        { t: "lien", texte: "Nous contacter", href: "/contact" },
      ],
    },
    nl: {
      soustitre: "Uw eerste contact met het wijkgezondheidscentrum",
      blocs: [
        { t: "p", texte: "Het onthaal is uw eerste contact met het wijkgezondheidscentrum, en de schakel tussen de patiënten, de zorgverleners en de administratie." },
        { t: "p", texte: "Voor alle inlichtingen kunt u eerst terecht bij het onthaal: het team helpt u graag verder." },
        { t: "p", texte: "Het onthaal en de telefooncentrale zijn bereikbaar van maandag tot vrijdag, van 8 tot 19 uur, op 02 424 25 40." },
        { t: "photo", alt: "De onthaalbalie van het wijkgezondheidscentrum", ...photoComptoir },
        { t: "aCompleter", texte: "Onthaalteam: namen te controleren en aan te vullen." },
        { t: "lien", texte: "Contacteer ons", href: "/contact" },
      ],
    },
    en: {
      soustitre: "Your first point of contact with the health centre",
      blocs: [
        { t: "p", texte: "Reception is your first point of contact with the health centre, and the link between patients, practitioners and the administration." },
        { t: "p", texte: "For any information, please contact reception first: the team will be happy to help." },
        { t: "p", texte: "Reception and the switchboard are open Monday to Friday, from 8 am to 7 pm, on 02 424 25 40." },
        { t: "photo", alt: "The reception desk of the health centre", ...photoComptoir },
        { t: "aCompleter", texte: "Reception team: names to be checked and completed." },
        { t: "lien", texte: "Contact us", href: "/contact" },
      ],
    },
  },

  "equipe/medecine-generale": {
    fr: {
      soustitre: "Nos médecins généralistes à votre disposition",
      blocs: [
        { t: "p", texte: "Le pôle médical réunit des médecins généralistes et des médecins en spécialisation de médecine générale, en stage pour un à deux ans." },
        { t: "aCompleter", texte: "Équipe médicale : noms à vérifier et compléter par le pôle." },
        { t: "h2", texte: "Rendez-vous et visites à domicile" },
        { t: "p", texte: "Les médecins consultent sur rendez-vous et se rendent à domicile pour les patients qui ne peuvent pas se déplacer. Les rendez-vous se prennent à l'accueil, sur place ou par téléphone." },
        { t: "p", texte: "Chaque médecin dispose aussi d'un moment dans la journée pour répondre aux appels téléphoniques." },
        { t: "encadre", titre: "Annuler un rendez-vous", texte: "Si vous devez annuler, prévenez-nous au moins 24 heures à l'avance, ou le plus tôt possible, pour que nous puissions donner le rendez-vous à quelqu'un d'autre. Tout rendez-vous manqué sans avoir prévenu est facturé 5 euros.", verifier: true },
        { t: "h2", texte: "Traitements chroniques" },
        { t: "p", texte: "Pour renouveler un traitement chronique, faites votre demande à l'accueil ou en ligne : le médecin prépare l'ordonnance dans les 72 heures." },
        { t: "lien", texte: "Demander un médicament", href: "/pratique/demande-medicaments" },
        { t: "h2", texte: "Un travail d'équipe" },
        { t: "p", texte: "Les médecins partagent un dossier informatisé commun pour chaque patient et travaillent en étroite collaboration avec toute l'équipe. Des consultations conjointes peuvent être organisées (par exemple médecin et kiné, ou médecin et psychologue) et, pour les situations complexes, des réunions avec tous les intervenants concernés." },
        { t: "photo", alt: "Un cabinet de consultation de la maison médicale", ...photoCabinet },
      ],
    },
    nl: {
      soustitre: "Onze huisartsen staan voor u klaar",
      blocs: [
        { t: "p", texte: "Het artsenteam bestaat uit huisartsen en artsen in opleiding tot huisarts, die hier één tot twee jaar stage lopen." },
        { t: "aCompleter", texte: "Artsenteam: namen te controleren en aan te vullen." },
        { t: "h2", texte: "Afspraken en huisbezoeken" },
        { t: "p", texte: "De artsen werken op afspraak en gaan op huisbezoek bij patiënten die zich niet kunnen verplaatsen. U maakt een afspraak aan het onthaal, ter plaatse of telefonisch." },
        { t: "p", texte: "Elke arts heeft ook een moment per dag om telefonische oproepen te beantwoorden." },
        { t: "encadre", titre: "Een afspraak annuleren", texte: "Moet u annuleren, verwittig ons dan minstens 24 uur op voorhand, of zo snel mogelijk, zodat we de afspraak aan iemand anders kunnen geven. Een gemiste afspraak zonder verwittiging wordt aangerekend aan 5 euro.", verifier: true },
        { t: "h2", texte: "Chronische behandelingen" },
        { t: "p", texte: "Voor de hernieuwing van een chronische behandeling vraagt u het voorschrift aan bij het onthaal of online: de arts maakt het binnen 72 uur klaar." },
        { t: "lien", texte: "Geneesmiddel aanvragen", href: "/pratique/demande-medicaments" },
        { t: "h2", texte: "Teamwerk" },
        { t: "p", texte: "De artsen delen voor elke patiënt een gemeenschappelijk elektronisch dossier en werken nauw samen met het hele team. Gezamenlijke consultaties zijn mogelijk (bijvoorbeeld arts en kinesitherapeut, of arts en psycholoog) en voor complexe situaties kan een overleg met alle betrokken zorgverleners worden georganiseerd." },
        { t: "photo", alt: "Een consultatieruimte van het wijkgezondheidscentrum", ...photoCabinet },
      ],
    },
    en: {
      soustitre: "Our general practitioners are here for you",
      blocs: [
        { t: "p", texte: "The medical team brings together general practitioners and doctors training to become GPs, who spend one to two years with us." },
        { t: "aCompleter", texte: "Medical team: names to be checked and completed." },
        { t: "h2", texte: "Appointments and home visits" },
        { t: "p", texte: "The doctors see patients by appointment and visit patients at home if they cannot travel. Appointments can be made at reception, in person or by phone." },
        { t: "p", texte: "Each doctor also has time set aside every day to answer phone calls." },
        { t: "encadre", titre: "Cancelling an appointment", texte: "If you need to cancel, please let us know at least 24 hours in advance, or as soon as possible, so that we can give the appointment to someone else. Any appointment missed without notice is charged 5 euros.", verifier: true },
        { t: "h2", texte: "Ongoing treatments" },
        { t: "p", texte: "To renew an ongoing treatment, ask at reception or online: the doctor will prepare the prescription within 72 hours." },
        { t: "lien", texte: "Request medication", href: "/pratique/demande-medicaments" },
        { t: "h2", texte: "Teamwork" },
        { t: "p", texte: "The doctors share a common electronic record for each patient and work closely with the whole team. Joint consultations can be arranged (for example doctor and physiotherapist, or doctor and psychologist) and, for complex situations, meetings with everyone involved." },
        { t: "photo", alt: "A consultation room at the health centre", ...photoCabinet },
      ],
    },
  },

  // Texte rédigé par l'équipe kiné (document « Site internet MME », novembre 2026).
  "equipe/kinesitherapie": {
    fr: {
      soustitre: "La thérapie par le mouvement",
      blocs: [
        { t: "p", texte: "La kinésithérapie accompagne les personnes dans la récupération de leurs capacités physiques et fonctionnelles." },
        { t: "p", texte: "À la Maison Médicale Esseghem, notre équipe de cinq kinésithérapeutes prend en charge différentes pathologies à l'aide de techniques manuelles, d'exercices spécifiques et de mouvements thérapeutiques. Outre les pathologies musculosquelettiques courantes, l'équipe prend également en charge les vertiges positionnels paroxystiques bénins (VPPB) et les troubles de l'articulation temporo-mandibulaire (ATM)." },
        { t: "p", texte: "La prise en charge peut comprendre des exercices à réaliser à domicile. Votre participation est essentielle : la régularité et l'implication dans le traitement contribuent à son efficacité." },
        { t: "photo", alt: "Le plateau de kinésithérapie", ...photoKine },
        { t: "h2", texte: "Une prescription pour commencer" },
        { t: "p", texte: "Les soins de kinésithérapie se font sur prescription médicale. Toute prescription doit obligatoirement être remise à l'accueil de la maison médicale, y compris lorsque les soins doivent être réalisés à l'extérieur." },
        { t: "p", texte: "L'accueil enregistre chaque demande et l'inscrit sur la liste d'attente, dans l'ordre de son arrivée. Les kinésithérapeutes prennent ensuite les prescriptions dans cet ordre : lorsqu'une place se libère dans leur agenda, ils contactent le patient pour lui proposer un rendez-vous. Ils peuvent aussi contacter un patient lorsqu'une demande particulière nécessite une réponse spécifique." },
        { t: "h2", texte: "Lorsque les soins doivent être réalisés à l'extérieur" },
        { t: "p", texte: "En fonction des possibilités de l'équipe et du délai d'attente, certaines prises en charge peuvent être externalisées : les séances sont alors réalisées auprès d'un kinésithérapeute extérieur à la maison médicale. La maison médicale rembourse ces séances au tarif conventionné en vigueur, selon les modalités applicables." },
        { t: "encadre", titre: "Autorisation écrite obligatoire", texte: "Cette externalisation nécessite obligatoirement une autorisation écrite préalable de la maison médicale, à recevoir avant de commencer vos séances à l'extérieur. Un patient qui prendrait directement rendez-vous dans une autre structure, sans cette autorisation écrite, ne pourra pas être remboursé par la maison médicale." },
        { t: "h2", texte: "Certaines spécialités sont externalisées" },
        { t: "p", texte: "Toutes les spécialités de kinésithérapie ne sont pas proposées au sein de notre équipe. C'est notamment le cas de la périnéologie et de la psychomotricité, qui sont systématiquement externalisées. Même pour ces prises en charge, la prescription doit d'abord être remise à l'accueil, qui enregistre la demande et organise l'externalisation. Une autorisation écrite vous est remise avant le début des séances." },
        { t: "h2", texte: "Comment procéder ?" },
        {
          t: "etapes",
          items: [
            "Déposez votre prescription à l'accueil de la maison médicale, quelle que soit la spécialité concernée ou le lieu où les soins devront être réalisés.",
            "L'accueil vous informe de la procédure à suivre et enregistre votre demande.",
            "Si les soins doivent être réalisés à l'extérieur, attendez d'avoir reçu l'autorisation écrite de la maison médicale avant de prendre rendez-vous et de commencer les séances.",
          ],
        },
        { t: "h2", texte: "Une question concernant votre prise en charge ?" },
        { t: "p", texte: "Pour toute question sur une prescription, une prise de rendez-vous, une modification ou une annulation, contactez l'accueil au 02 424 25 40. L'accueil gère les demandes de kinésithérapie et les externalisations." },
        { t: "encadre", titre: "À retenir", texte: "Toutes les prescriptions de kinésithérapie passent par l'accueil de la maison médicale. Aucune séance réalisée à l'extérieur ne sera remboursée sans autorisation écrite préalable de la maison médicale." },
        { t: "aCompleter", texte: "Équipe de kinésithérapie : noms à compléter par le pôle (si souhaité)." },
      ],
    },
    nl: {
      soustitre: "Therapie door beweging",
      blocs: [
        { t: "p", texte: "Kinesitherapie begeleidt mensen bij het herstel van hun lichamelijke en functionele mogelijkheden." },
        { t: "p", texte: "In Maison Médicale Esseghem behandelt ons team van vijf kinesitherapeuten diverse aandoeningen met manuele technieken, gerichte oefeningen en therapeutische bewegingen. Naast de gewone aandoeningen van spieren en gewrichten behandelt het team ook goedaardige paroxismale positieduizeligheid (BPPV) en kaakgewrichtsproblemen (temporomandibulair gewricht)." },
        { t: "p", texte: "De behandeling kan oefeningen thuis omvatten. Uw inzet is essentieel: regelmaat en betrokkenheid maken de behandeling doeltreffender." },
        { t: "photo", alt: "De kinesitherapieruimte", ...photoKine },
        { t: "h2", texte: "Starten met een voorschrift" },
        { t: "p", texte: "Kinesitherapie gebeurt op medisch voorschrift. Elk voorschrift moet verplicht worden afgegeven aan het onthaal van het wijkgezondheidscentrum, ook als de behandeling elders moet gebeuren." },
        { t: "p", texte: "Het onthaal registreert elke aanvraag en zet ze op de wachtlijst, in volgorde van aankomst. De kinesitherapeuten nemen de voorschriften in die volgorde: zodra er een plaats vrijkomt in hun agenda, nemen ze contact op met de patiënt voor een afspraak. Ze kunnen ook contact opnemen als een specifieke aanvraag een apart antwoord vraagt." },
        { t: "h2", texte: "Als de behandeling elders moet gebeuren" },
        { t: "p", texte: "Afhankelijk van de mogelijkheden van het team en de wachttijd kunnen sommige behandelingen extern gebeuren: de sessies vinden dan plaats bij een kinesitherapeut buiten het wijkgezondheidscentrum. Het wijkgezondheidscentrum betaalt die sessies terug aan het geldende conventietarief, volgens de toepasselijke regels." },
        { t: "encadre", titre: "Schriftelijke toestemming verplicht", texte: "Externe behandeling vereist altijd een voorafgaande schriftelijke toestemming van het wijkgezondheidscentrum, die u moet ontvangen vóór u de sessies elders start. Een patiënt die zonder die toestemming rechtstreeks een afspraak maakt bij een andere zorgverlener, wordt niet terugbetaald door het wijkgezondheidscentrum." },
        { t: "h2", texte: "Sommige specialisaties gebeuren extern" },
        { t: "p", texte: "Niet alle specialisaties in kinesitherapie worden binnen ons team aangeboden. Dat is onder meer het geval voor bekkenbodemtherapie en psychomotoriek, die altijd extern gebeuren. Ook voor die behandelingen moet het voorschrift eerst aan het onthaal worden afgegeven, dat de aanvraag registreert en de externe behandeling regelt. U krijgt een schriftelijke toestemming vóór de start van de sessies." },
        { t: "h2", texte: "Hoe gaat u te werk?" },
        {
          t: "etapes",
          items: [
            "Geef uw voorschrift af aan het onthaal van het wijkgezondheidscentrum, ongeacht de specialisatie of de plaats van de behandeling.",
            "Het onthaal legt u de procedure uit en registreert uw aanvraag.",
            "Moet de behandeling elders gebeuren, wacht dan op de schriftelijke toestemming van het wijkgezondheidscentrum vóór u een afspraak maakt en de sessies start.",
          ],
        },
        { t: "h2", texte: "Een vraag over uw behandeling?" },
        { t: "p", texte: "Voor elke vraag over een voorschrift, een afspraak, een wijziging of een annulering neemt u contact op met het onthaal op 02 424 25 40. Het onthaal beheert de aanvragen voor kinesitherapie en de externe behandelingen." },
        { t: "encadre", titre: "Om te onthouden", texte: "Alle voorschriften voor kinesitherapie gaan via het onthaal van het wijkgezondheidscentrum. Geen enkele sessie elders wordt terugbetaald zonder voorafgaande schriftelijke toestemming van het wijkgezondheidscentrum." },
        { t: "aCompleter", texte: "Team kinesitherapie: namen aan te vullen (indien gewenst)." },
      ],
    },
    en: {
      soustitre: "Therapy through movement",
      blocs: [
        { t: "p", texte: "Physiotherapy helps people recover their physical and functional abilities." },
        { t: "p", texte: "At Maison Médicale Esseghem, our team of five physiotherapists treats a range of conditions using manual techniques, specific exercises and therapeutic movement. As well as common musculoskeletal problems, the team also treats benign paroxysmal positional vertigo (BPPV) and temporomandibular joint (jaw) disorders." },
        { t: "p", texte: "Treatment may include exercises to do at home. Your involvement is essential: doing them regularly and engaging with the treatment helps it work." },
        { t: "photo", alt: "The physiotherapy room", ...photoKine },
        { t: "h2", texte: "Starting with a prescription" },
        { t: "p", texte: "Physiotherapy is provided on medical prescription. Every prescription must be handed in at the health centre's reception, even when the treatment is to take place elsewhere." },
        { t: "p", texte: "Reception records each request and adds it to the waiting list, in order of arrival. The physiotherapists then take prescriptions in that order: when a slot becomes available, they contact the patient to offer an appointment. They may also contact a patient when a particular request needs a specific answer." },
        { t: "h2", texte: "When treatment takes place elsewhere" },
        { t: "p", texte: "Depending on the team's capacity and the waiting time, some treatments may be outsourced: sessions then take place with a physiotherapist outside the health centre. The health centre reimburses these sessions at the current agreed rate, under the applicable conditions." },
        { t: "encadre", titre: "Written authorisation required", texte: "Treatment elsewhere always requires prior written authorisation from the health centre, which you must receive before starting your sessions. A patient who books directly with another practice without this written authorisation will not be reimbursed by the health centre." },
        { t: "h2", texte: "Some specialities are always outsourced" },
        { t: "p", texte: "Not all physiotherapy specialities are offered by our team. This is the case for pelvic floor therapy and psychomotor therapy, which are always outsourced. Even for these treatments, the prescription must first be handed in at reception, which records the request and arranges the outside treatment. You will receive a written authorisation before your sessions start." },
        { t: "h2", texte: "What to do" },
        {
          t: "etapes",
          items: [
            "Hand in your prescription at the health centre's reception, whatever the speciality or wherever the treatment will take place.",
            "Reception explains the procedure and records your request.",
            "If treatment is to take place elsewhere, wait until you have received the health centre's written authorisation before booking and starting your sessions.",
          ],
        },
        { t: "h2", texte: "A question about your treatment?" },
        { t: "p", texte: "For any question about a prescription, an appointment, a change or a cancellation, contact reception on 02 424 25 40. Reception manages physiotherapy requests and outside treatments." },
        { t: "encadre", titre: "Key points", texte: "All physiotherapy prescriptions go through the health centre's reception. No session carried out elsewhere will be reimbursed without the health centre's prior written authorisation." },
        { t: "aCompleter", texte: "Physiotherapy team: names to be added (if wanted)." },
      ],
    },
  },

  "equipe/pole-infirmier": {
    fr: {
      soustitre: "Soins au dispensaire et à domicile",
      blocs: [
        { t: "p", texte: "Notre mission est de prendre en charge le patient dans sa globalité. Son bien-être est notre priorité : nous travaillons avec empathie, dans un but thérapeutique positif." },
        { t: "p", texte: "Nous sommes à l'écoute des patients et de leur entourage pour mettre en place les aides techniques et matérielles qui facilitent le maintien et le confort à domicile." },
        { t: "aCompleter", texte: "Équipe infirmière : noms à vérifier et compléter par le pôle." },
        { t: "h2", texte: "Au dispensaire, sur rendez-vous" },
        { t: "p", texte: "Vous pouvez prendre rendez-vous pour une prise de sang, un vaccin, une injection, des soins de plaies simples ou complexes, ou simplement pour un avis." },
        {
          t: "liste",
          items: [
            "Lundi : 8 h – 10 h et 14 h – 15 h 30",
            "Mardi : 8 h – 12 h et 16 h – 17 h 45",
            "Mercredi : 14 h – 15 h 30",
            "Jeudi : 8 h – 12 h et 14 h – 17 h 45",
            "Vendredi : 14 h – 15 h 30",
          ],
          verifier: true,
        },
        { t: "encadre", titre: "À apporter", texte: "Pour une prise de sang : la demande du médecin et une vignette de mutuelle. Pour des soins de plaie : votre propre matériel de soins (crèmes…) et de fixation (sparadrap, bandes…)." },
        { t: "h2", texte: "Soins à domicile" },
        { t: "p", texte: "Les soins à domicile doivent être prescrits par un médecin. Les infirmières prennent contact avec la personne concernée ou un proche pour fixer un premier rendez-vous et évaluer la situation." },
        { t: "p", texte: "La fréquence et les horaires de passage sont fixés par les infirmières selon le planning et les besoins du soin : jusqu'à deux ou trois passages par jour si nécessaire." },
      ],
    },
    nl: {
      soustitre: "Zorg in de verpleegpost en aan huis",
      blocs: [
        { t: "p", texte: "Onze opdracht is de patiënt in zijn geheel te verzorgen. Zijn welzijn staat voorop: we werken met empathie en met een positief therapeutisch doel." },
        { t: "p", texte: "We luisteren naar de patiënten en hun omgeving om de technische en materiële hulp te regelen die het verblijf en het comfort thuis vergemakkelijken." },
        { t: "aCompleter", texte: "Verpleegkundig team: namen te controleren en aan te vullen." },
        { t: "h2", texte: "In de verpleegpost, op afspraak" },
        { t: "p", texte: "U kunt een afspraak maken voor een bloedafname, een vaccin, een inspuiting, eenvoudige of complexe wondzorg, of gewoon voor advies." },
        {
          t: "liste",
          items: [
            "Maandag: 8 – 10 uur en 14 – 15.30 uur",
            "Dinsdag: 8 – 12 uur en 16 – 17.45 uur",
            "Woensdag: 14 – 15.30 uur",
            "Donderdag: 8 – 12 uur en 14 – 17.45 uur",
            "Vrijdag: 14 – 15.30 uur",
          ],
          verifier: true,
        },
        { t: "encadre", titre: "Mee te brengen", texte: "Voor een bloedafname: het aanvraagformulier van de arts en een klever van het ziekenfonds. Voor wondzorg: uw eigen verzorgingsmateriaal (zalven…) en bevestigingsmateriaal (pleister, verband…)." },
        { t: "h2", texte: "Thuiszorg" },
        { t: "p", texte: "Thuiszorg moet door een arts worden voorgeschreven. De verpleegkundigen nemen contact op met de patiënt of een naaste voor een eerste afspraak om de situatie te bekijken." },
        { t: "p", texte: "Hoe vaak en wanneer ze langskomen, bepalen de verpleegkundigen volgens de planning en de nodige zorg: indien nodig tot twee à drie keer per dag." },
      ],
    },
    en: {
      soustitre: "Care at the nursing clinic and at home",
      blocs: [
        { t: "p", texte: "Our mission is to care for the patient as a whole. Their well-being is our priority: we work with empathy, with a positive therapeutic aim." },
        { t: "p", texte: "We listen to patients and their families to arrange the technical and practical support that makes life at home easier and more comfortable." },
        { t: "aCompleter", texte: "Nursing team: names to be checked and completed." },
        { t: "h2", texte: "At the nursing clinic, by appointment" },
        { t: "p", texte: "You can book an appointment for a blood test, a vaccination, an injection, simple or complex wound care, or simply for advice." },
        {
          t: "liste",
          items: [
            "Monday: 8 – 10 am and 2 – 3.30 pm",
            "Tuesday: 8 am – 12 pm and 4 – 5.45 pm",
            "Wednesday: 2 – 3.30 pm",
            "Thursday: 8 am – 12 pm and 2 – 5.45 pm",
            "Friday: 2 – 3.30 pm",
          ],
          verifier: true,
        },
        { t: "encadre", titre: "What to bring", texte: "For a blood test: the doctor's request form and a health insurance sticker. For wound care: your own care products (creams…) and dressings (tape, bandages…)." },
        { t: "h2", texte: "Home care" },
        { t: "p", texte: "Home care must be prescribed by a doctor. The nurses contact the patient or a relative to set up a first appointment and assess the situation." },
        { t: "p", texte: "The nurses decide how often and when they visit, depending on their schedule and the care needed: up to two or three visits a day if necessary." },
      ],
    },
  },

  "equipe/psychologue": {
    fr: {
      soustitre: "Vous écouter, vous soutenir et vous aider à trouver des pistes",
      blocs: [
        { t: "p", texte: "Vous avez besoin d'être écouté ? Vous voulez prendre le temps de faire le point sur une situation difficile, ou parler de la souffrance que vous ressentez ?" },
        { t: "p", texte: "Notre psychologue peut vous aider à voir plus clair dans les difficultés que vous traversez, vous écouter, vous soutenir et vous aider à trouver des pistes de solution." },
        { t: "aCompleter", texte: "Nom de la psychologue : à vérifier par l'équipe." },
        { t: "h2", texte: "Prendre rendez-vous" },
        { t: "p", texte: "Pour prendre rendez-vous, contactez la psychologue le lundi et le jeudi, entre 10 h 30 et 11 h.", verifier: true },
        { t: "encadre", titre: "Tarif", texte: "Les consultations s'adressent aux patients inscrits à la maison médicale et ne sont pas comprises dans le forfait. La première consultation est offerte. Les suivantes coûtent 20 euros. Certaines mutuelles en remboursent une partie.", verifier: true },
      ],
    },
    nl: {
      soustitre: "Naar u luisteren, u steunen en samen oplossingen zoeken",
      blocs: [
        { t: "p", texte: "Hebt u nood aan een luisterend oor? Wilt u de tijd nemen om een moeilijke situatie op een rij te zetten, of praten over het verdriet dat u voelt?" },
        { t: "p", texte: "Onze psycholoog helpt u om meer klaarheid te krijgen in de moeilijkheden die u doormaakt, luistert naar u, steunt u en zoekt samen met u naar oplossingen." },
        { t: "aCompleter", texte: "Naam van de psycholoog: te controleren." },
        { t: "h2", texte: "Een afspraak maken" },
        { t: "p", texte: "Voor een afspraak neemt u contact op met de psycholoog op maandag en donderdag, tussen 10.30 en 11 uur.", verifier: true },
        { t: "encadre", titre: "Tarief", texte: "De consultaties zijn bedoeld voor patiënten die in het wijkgezondheidscentrum zijn ingeschreven en vallen niet onder het forfait. De eerste consultatie is gratis. De volgende kosten 20 euro. Sommige ziekenfondsen betalen een deel terug.", verifier: true },
      ],
    },
    en: {
      soustitre: "Listening, supporting you and helping you find a way forward",
      blocs: [
        { t: "p", texte: "Do you need someone to listen? Would you like to take time to think through a difficult situation, or talk about the pain you are feeling?" },
        { t: "p", texte: "Our psychologist can help you see your difficulties more clearly, listen to you, support you and help you find solutions." },
        { t: "aCompleter", texte: "Psychologist's name: to be checked." },
        { t: "h2", texte: "Making an appointment" },
        { t: "p", texte: "To make an appointment, contact the psychologist on Mondays and Thursdays between 10.30 and 11 am.", verifier: true },
        { t: "encadre", titre: "Fees", texte: "Consultations are for patients registered with the health centre and are not covered by the flat fee. The first consultation is free. Further consultations cost 20 euros. Some health insurance funds reimburse part of the cost.", verifier: true },
      ],
    },
  },

  "equipe/assistante-sociale": {
    fr: {
      soustitre: "Conseiller, orienter et vous soutenir",
      blocs: [
        { t: "p", texte: "L'assistante sociale est là pour vous conseiller, vous orienter et vous soutenir dans tout type de situation, par exemple si :" },
        {
          t: "liste",
          items: [
            "vous avez une question sociale, administrative ou juridique ;",
            "vous voulez de l'aide pour remplir un document administratif ;",
            "vous n'avez pas d'ordinateur ou ne savez pas faire certaines démarches en ligne ;",
            "vous ne comprenez pas un courrier ;",
            "vous souhaitez être accompagné auprès d'un service comme Actiris, la mutuelle ou l'ONEM ;",
            "vous faites face à une situation sociale, familiale ou financière difficile.",
          ],
        },
        { t: "h2", texte: "Avec ou sans rendez-vous" },
        {
          t: "liste",
          items: [
            "Sur rendez-vous.",
            "Sans rendez-vous, à la permanence sociale : le lundi et le mercredi, de 9 h 30 à 11 h 30 et de 13 h 30 à 16 h 30.",
            "Par téléphone, tous les jours de 12 h à 12 h 30, au 02 424 25 40.",
          ],
          verifier: true,
        },
        { t: "p", texte: "Les consultations sociales sont réservées aux usagers de la maison médicale et de La Récré." },
      ],
    },
    nl: {
      soustitre: "Advies, doorverwijzing en steun",
      blocs: [
        { t: "p", texte: "De maatschappelijk assistent staat klaar om u te adviseren, door te verwijzen en te steunen in allerlei situaties, bijvoorbeeld als:" },
        {
          t: "liste",
          items: [
            "u een sociale, administratieve of juridische vraag hebt;",
            "u hulp wilt bij het invullen van een administratief document;",
            "u geen computer hebt of bepaalde stappen online niet zelf kunt zetten;",
            "u een brief niet begrijpt;",
            "u begeleid wilt worden naar een dienst zoals Actiris, het ziekenfonds of de RVA;",
            "u voor een moeilijke sociale, familiale of financiële situatie staat.",
          ],
        },
        { t: "h2", texte: "Met of zonder afspraak" },
        {
          t: "liste",
          items: [
            "Op afspraak.",
            "Zonder afspraak, tijdens de sociale permanentie: op maandag en woensdag, van 9.30 tot 11.30 uur en van 13.30 tot 16.30 uur.",
            "Telefonisch, elke dag van 12 tot 12.30 uur, op 02 424 25 40.",
          ],
          verifier: true,
        },
        { t: "p", texte: "De sociale consultaties zijn voorbehouden aan de gebruikers van het wijkgezondheidscentrum en van La Récré." },
      ],
    },
    en: {
      soustitre: "Advice, guidance and support",
      blocs: [
        { t: "p", texte: "Our social worker is here to advise, guide and support you in all kinds of situations, for example if:" },
        {
          t: "liste",
          items: [
            "you have a social, administrative or legal question;",
            "you would like help filling in an administrative form;",
            "you do not have a computer or are unsure how to do some things online;",
            "you do not understand a letter;",
            "you would like someone to go with you to a service such as Actiris, your health insurance fund or the ONEM (national employment office);",
            "you are facing a difficult social, family or financial situation.",
          ],
        },
        { t: "h2", texte: "With or without an appointment" },
        {
          t: "liste",
          items: [
            "By appointment.",
            "Without an appointment, at the drop-in session: Mondays and Wednesdays, 9.30 – 11.30 am and 1.30 – 4.30 pm.",
            "By phone, every day from 12 to 12.30 pm, on 02 424 25 40.",
          ],
          verifier: true,
        },
        { t: "p", texte: "Social work consultations are reserved for users of the health centre and of La Récré." },
      ],
    },
  },

  "equipe/logopedie": {
    fr: {
      soustitre: "Les troubles de la communication orale et écrite",
      blocs: [
        { t: "p", texte: "La logopédie est une discipline paramédicale reconnue par l'INAMI. Elle traite les troubles de la communication orale et écrite et les troubles associés, chez les enfants, les adolescents, les adultes et les personnes âgées." },
        { t: "h2", texte: "Troubles pris en charge" },
        {
          t: "liste",
          items: [
            "articulation ;",
            "langage oral et écrit, troubles du développement ou acquis ;",
            "apprentissages (dyslexie, dysorthographie, dysgraphie…) ;",
            "raisonnement logico-mathématique ;",
            "voix et phonation ;",
            "fluence et rythme de la parole (bégaiement, dysarthrie, maladie de Parkinson) ;",
            "fonctions oro-faciales et déglutition ;",
            "troubles du spectre de l'autisme ;",
            "communication d'origine neurologique (aphasie…) ;",
            "fonctions cognitives (mémoire, attention…) et troubles attentionnels ;",
            "sphère ORL (chirurgies bucco-linguo-faciales, fentes palatines).",
          ],
        },
        { t: "h2", texte: "Comment se passe une prise en charge ?" },
        { t: "p", texte: "La logopède commence par un bilan pour évaluer les troubles, en chercher la cause et décider si une rééducation est nécessaire. Elle travaille en séances individuelles ou en groupe, en collaboration avec le médecin traitant, la famille et le milieu scolaire, professionnel et social du patient." },
        { t: "p", texte: "Elle intervient aussi dans la prévention et le dépistage précoce des troubles du langage chez l'enfant, ainsi que dans les troubles liés au vieillissement." },
        { t: "encadre", titre: "Prescription et remboursement", texte: "Les séances ne sont pas comprises dans le forfait, mais sont généralement remboursées. Le bilan peut être prescrit par le médecin traitant ; les séances de traitement doivent être prescrites par un médecin spécialiste (ORL, pédiatre…)." },
        { t: "p", texte: "Une question sur une rééducation ? Parlez-en à votre médecin, à un thérapeute ou à l'accueil : ils nous transmettront votre message et nous vous recontacterons." },
      ],
    },
    nl: {
      soustitre: "Stoornissen in mondelinge en schriftelijke communicatie",
      blocs: [
        { t: "p", texte: "Logopedie is een paramedisch beroep dat door het RIZIV is erkend. Het behandelt stoornissen in de mondelinge en schriftelijke communicatie en bijbehorende stoornissen, bij kinderen, jongeren, volwassenen en ouderen." },
        { t: "h2", texte: "Behandelde stoornissen" },
        {
          t: "liste",
          items: [
            "articulatie;",
            "mondelinge en schriftelijke taal, ontwikkelingsstoornissen of verworven stoornissen;",
            "leerstoornissen (dyslexie, dysorthografie, dysgrafie…);",
            "logisch-wiskundig redeneren;",
            "stem en stemgeving;",
            "vloeiendheid en ritme van de spraak (stotteren, dysartrie, ziekte van Parkinson);",
            "mondfuncties en slikken;",
            "autismespectrumstoornissen;",
            "communicatiestoornissen van neurologische oorsprong (afasie…);",
            "cognitieve functies (geheugen, aandacht…) en aandachtsstoornissen;",
            "neus-keel-oorgebied (ingrepen aan mond, tong en gezicht, gespleten gehemelte).",
          ],
        },
        { t: "h2", texte: "Hoe verloopt een behandeling?" },
        { t: "p", texte: "De logopedist begint met een bilan om de stoornissen te beoordelen, de oorzaak te zoeken en te beslissen of revalidatie nodig is. Ze werkt individueel of in groep, in samenwerking met de huisarts, het gezin en de school-, werk- en sociale omgeving van de patiënt." },
        { t: "p", texte: "Ze werkt ook aan preventie en vroege opsporing van taalstoornissen bij kinderen, en aan stoornissen die met het ouder worden samenhangen." },
        { t: "encadre", titre: "Voorschrift en terugbetaling", texte: "De sessies vallen niet onder het forfait, maar worden meestal terugbetaald. Het bilan kan door de huisarts worden voorgeschreven; de behandelingssessies moeten door een specialist (NKO-arts, kinderarts…) worden voorgeschreven." },
        { t: "p", texte: "Een vraag over een behandeling? Spreek erover met uw arts, een zorgverlener of het onthaal: zij geven uw bericht aan ons door en we nemen contact met u op." },
      ],
    },
    en: {
      soustitre: "Spoken and written communication difficulties",
      blocs: [
        { t: "p", texte: "Speech therapy is a paramedical profession recognised by INAMI (the national health insurance institute). It treats difficulties with spoken and written communication and related disorders, in children, teenagers, adults and older people." },
        { t: "h2", texte: "Conditions treated" },
        {
          t: "liste",
          items: [
            "articulation;",
            "spoken and written language, developmental or acquired;",
            "learning difficulties (dyslexia, dysorthographia, dysgraphia…);",
            "logical and mathematical reasoning;",
            "voice;",
            "speech fluency and rhythm (stammering, dysarthria, Parkinson's disease);",
            "oral and facial functions, and swallowing;",
            "autism spectrum disorders;",
            "communication disorders of neurological origin (aphasia…);",
            "cognitive functions (memory, attention…) and attention disorders;",
            "ear, nose and throat (mouth, tongue and face surgery, cleft palate).",
          ],
        },
        { t: "h2", texte: "How does treatment work?" },
        { t: "p", texte: "The speech therapist starts with an assessment to evaluate the difficulties, look for the cause and decide whether therapy is needed. She works in individual or group sessions, together with the GP, the family and the patient's school, work and social environment." },
        { t: "p", texte: "She is also involved in prevention and early screening of language difficulties in children, and in difficulties linked to ageing." },
        { t: "encadre", titre: "Prescription and reimbursement", texte: "Sessions are not covered by the flat fee, but are usually reimbursed. The assessment can be prescribed by your GP; treatment sessions must be prescribed by a specialist (ENT doctor, paediatrician…)." },
        { t: "p", texte: "A question about therapy? Talk to your doctor, a practitioner or reception: they will pass your message on and we will get back to you." },
      ],
    },
  },

  "equipe/ergotherapie": {
    fr: {
      soustitre: "Garder ou retrouver son autonomie au quotidien",
      blocs: [
        { t: "p", texte: "L'ergothérapie aide les personnes à garder ou retrouver leur autonomie dans les activités de la vie quotidienne." },
        { t: "aCompleter", texte: "Présentation de l'ergothérapie à la maison médicale (pour qui, comment prendre rendez-vous, remboursement) : à rédiger par l'équipe." },
      ],
    },
    nl: {
      soustitre: "Zelfstandig blijven of opnieuw worden in het dagelijks leven",
      blocs: [
        { t: "p", texte: "Ergotherapie helpt mensen om zelfstandig te blijven of opnieuw te worden in hun dagelijkse activiteiten." },
        { t: "aCompleter", texte: "Voorstelling van ergotherapie in het wijkgezondheidscentrum (voor wie, hoe een afspraak maken, terugbetaling): op te stellen door het team." },
      ],
    },
    en: {
      soustitre: "Staying independent in everyday life",
      blocs: [
        { t: "p", texte: "Occupational therapy helps people stay or become independent again in their everyday activities." },
        { t: "aCompleter", texte: "Description of occupational therapy at the health centre (who it is for, how to book, reimbursement): to be written by the team." },
      ],
    },
  },

  "equipe/actrices-en-sante": {
    fr: {
      soustitre: "Promotion de la santé et santé communautaire",
      blocs: [
        { t: "p", texte: "Les actrices en santé sont les référentes en promotion de la santé de la maison médicale. Elles mènent des actions qui favorisent l'accès à l'information, le dialogue, l'apprentissage collectif et la création de liens sociaux, avec une approche inclusive, participative et bienveillante." },
        { t: "p", texte: "Leur objectif : faire de la santé un projet commun, vivant et accessible à toutes et tous, à l'écoute de vos besoins en santé et en bien-être." },
        { t: "aCompleter", texte: "Présentation de l'équipe : à vérifier et compléter." },
        { t: "h2", texte: "Au quotidien" },
        {
          t: "liste",
          items: [
            "identifier les besoins et les priorités du quartier en matière de santé ;",
            "organiser et animer des activités de bien-être : balades santé, yoga, ateliers jeux de société, créatifs ou cuisine, animations en salle d'attente (alimentation, exposition au soleil…) ;",
            "planifier les campagnes de prévention (grippe, diabète, rappels de vaccination…) ;",
            "informer via la newsletter et les affiches en salle d'attente ;",
            "collaborer avec les associations et les acteurs du quartier.",
          ],
        },
        { t: "p", texte: "Si vous les croisez en salle d'attente ou lors d'une activité, n'hésitez pas à venir échanger !" },
        { t: "lien", texte: "Voir le planning des activités", href: "/actions/planning" },
      ],
    },
    nl: {
      soustitre: "Gezondheidspromotie en gemeenschapsgerichte gezondheid",
      blocs: [
        { t: "p", texte: "De gezondheidswerkers zijn de referentiepersonen voor gezondheidspromotie in het wijkgezondheidscentrum. Ze organiseren acties die de toegang tot informatie, de dialoog, het samen leren en sociale contacten bevorderen, op een inclusieve, participatieve en zorgzame manier." },
        { t: "p", texte: "Hun doel: van gezondheid een gemeenschappelijk, levendig project maken dat voor iedereen toegankelijk is, met aandacht voor uw noden op het vlak van gezondheid en welzijn." },
        { t: "aCompleter", texte: "Voorstelling van het team: te controleren en aan te vullen." },
        { t: "h2", texte: "Dagelijks werk" },
        {
          t: "liste",
          items: [
            "de noden en prioriteiten van de wijk op het vlak van gezondheid in kaart brengen;",
            "welzijnsactiviteiten organiseren en begeleiden: gezondheidswandelingen, yoga, workshops gezelschapsspelen, creatief of koken, animaties in de wachtzaal (voeding, zonblootstelling…);",
            "preventiecampagnes plannen (griep, diabetes, herhalingsvaccinaties…);",
            "informeren via de nieuwsbrief en affiches in de wachtzaal;",
            "samenwerken met de verenigingen en partners uit de wijk.",
          ],
        },
        { t: "p", texte: "Komt u hen tegen in de wachtzaal of tijdens een activiteit? Spreek hen gerust aan!" },
        { t: "lien", texte: "Bekijk de activiteitenplanning", href: "/actions/planning" },
      ],
    },
    en: {
      soustitre: "Health promotion and community health",
      blocs: [
        { t: "p", texte: "Our community health workers lead health promotion at the health centre. They run activities that improve access to information, encourage dialogue and shared learning, and build social connections, with an inclusive, participatory and caring approach." },
        { t: "p", texte: "Their aim: to make health a shared, lively project that is accessible to everyone, listening to your needs for health and well-being." },
        { t: "aCompleter", texte: "Team introduction: to be checked and completed." },
        { t: "h2", texte: "Day to day" },
        {
          t: "liste",
          items: [
            "identifying the neighbourhood's health needs and priorities;",
            "organising and running well-being activities: health walks, yoga, board game, craft or cooking workshops, waiting-room activities (nutrition, sun exposure…);",
            "planning prevention campaigns (flu, diabetes, vaccination boosters…);",
            "sharing information through the newsletter and waiting-room posters;",
            "working with local associations and partners.",
          ],
        },
        { t: "p", texte: "If you meet them in the waiting room or at an activity, feel free to come and chat!" },
        { t: "lien", texte: "See the activity schedule", href: "/actions/planning" },
      ],
    },
  },

  "equipe/pole-administratif": {
    fr: {
      soustitre: "Coordination, inscriptions et comptabilité",
      blocs: [
        { t: "p", texte: "Le pôle administratif fait tourner la maison médicale au quotidien." },
        { t: "h2", texte: "Coordination" },
        { t: "p", texte: "La coordination veille à ce que chaque pôle dispose des ressources nécessaires (personnel, informatique, matériel, locaux et moyens financiers) pour offrir des soins de qualité. Le coordinateur est aussi à la disposition des patients qui souhaitent signaler un problème rencontré à la maison médicale." },
        { t: "h2", texte: "Service administratif" },
        { t: "p", texte: "Le service administratif gère le forfait : inscriptions des patients, échanges avec les mutuelles et facturation, mais aussi les remboursements de soins extérieurs et les commandes de matériel. Vous le rencontrez lors de votre rendez-vous d'inscription. En cas de souci avec votre mutuelle, ou si vous n'êtes pas en ordre d'assurabilité, il vous aide à régler la situation." },
        { t: "h2", texte: "Comptabilité" },
        { t: "p", texte: "La comptabilité de l'ASBL : enregistrement des opérations, factures et paiements, opérations bancaires." },
        { t: "aCompleter", texte: "Noms et fonctions : à vérifier et compléter." },
      ],
    },
    nl: {
      soustitre: "Coördinatie, inschrijvingen en boekhouding",
      blocs: [
        { t: "p", texte: "Het administratief team zorgt ervoor dat het wijkgezondheidscentrum dag na dag draait." },
        { t: "h2", texte: "Coördinatie" },
        { t: "p", texte: "De coördinatie zorgt ervoor dat elk team de nodige middelen heeft (personeel, informatica, materiaal, gebouwen en financiële middelen) om kwaliteitsvolle zorg te bieden. De coördinator staat ook ter beschikking van patiënten die een probleem willen melden." },
        { t: "h2", texte: "Administratieve dienst" },
        { t: "p", texte: "De administratieve dienst beheert het forfait: inschrijvingen van patiënten, contacten met de ziekenfondsen en facturatie, maar ook terugbetalingen van externe zorg en bestellingen van materiaal. U ontmoet de dienst bij uw inschrijvingsafspraak. Hebt u een probleem met uw ziekenfonds, of bent u niet in orde met uw verzekerbaarheid, dan helpt de dienst u om dat te regelen." },
        { t: "h2", texte: "Boekhouding" },
        { t: "p", texte: "De boekhouding van de vzw: registratie van verrichtingen, facturen en betalingen, bankverrichtingen." },
        { t: "aCompleter", texte: "Namen en functies: te controleren en aan te vullen." },
      ],
    },
    en: {
      soustitre: "Coordination, registrations and accounts",
      blocs: [
        { t: "p", texte: "The administrative team keeps the health centre running day to day." },
        { t: "h2", texte: "Coordination" },
        { t: "p", texte: "Coordination makes sure each team has what it needs (staff, IT, equipment, premises and funding) to provide quality care. The coordinator is also available to patients who want to report a problem they have had at the health centre." },
        { t: "h2", texte: "Administration" },
        { t: "p", texte: "The administration team manages the flat-fee system: patient registrations, contact with health insurance funds and invoicing, as well as reimbursements for outside care and equipment orders. You will meet them at your registration appointment. If you have a problem with your health insurance fund, or your insurance is not up to date, they will help you sort it out." },
        { t: "h2", texte: "Accounts" },
        { t: "p", texte: "The non-profit's accounts: recording transactions, invoices and payments, and banking." },
        { t: "aCompleter", texte: "Names and roles: to be checked and completed." },
      ],
    },
  },
};
