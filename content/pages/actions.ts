// Pages « Nos actions en santé » : La Récré et la psychomotricité relationnelle.
// Contenu repris de l'ancien site, nettoyé (lien piraté et adresse e-mail erronée retirés).
// Le planning des activités sera géré plus tard depuis l'espace d'administration.
import type { PageTraduite } from "./types";

const photoPsychomot = { src: "/images/photos/salle-psychomotricite.jpg", largeur: 1024, hauteur: 683 };

export const pagesActions: Record<string, PageTraduite> = {
  "actions/la-recre": {
    fr: {
      soustitre: "Lieu de rencontre enfants-parents",
      blocs: [
        { t: "p", texte: "La Récré, c'est une récréation pour les enfants et leurs parents, dans un cadre convivial. Elle propose un espace :" },
        {
          t: "liste",
          items: [
            "de jeu, où les petits peuvent faire de nouvelles expériences ;",
            "d'échange, où les grands peuvent discuter et souffler un peu hors de la maison ;",
            "de parole, qui prépare les enfants et leurs parents à l'entrée en crèche ou à l'école.",
          ],
        },
        { t: "h2", texte: "Moments d'accueil" },
        {
          t: "liste",
          items: [
            "Le mardi, de 9 h 30 à 12 h",
            "Le jeudi, de 9 h 30 à 12 h",
            "Le vendredi, de 9 h 30 à 12 h",
            "Le premier samedi du mois, de 9 h 30 à 12 h",
          ],
          verifier: true,
        },
        { t: "h2", texte: "Et aussi" },
        {
          t: "liste",
          items: [
            "Un atelier de psychomotricité, le mercredi de 10 h 30 à 11 h 30.",
            "Des animations musicales et sensorielles, le lundi à 10 h 30.",
          ],
          verifier: true,
        },
        { t: "lien", texte: "L'atelier de psychomotricité", href: "/actions/psychomotricite-relationnelle" },
        { t: "h2", texte: "Contact" },
        { t: "p", texte: "La Récré, rue Esseghem 26 (à droite de la maison médicale). Téléphone : 0470 06 34 08.", verifier: true },
        { t: "aCompleter", texte: "Adresse e-mail de La Récré : à confirmer (celle de l'ancien site était erronée)." },
      ],
    },
    nl: {
      soustitre: "Ontmoetingsplek voor kinderen en ouders",
      blocs: [
        { t: "p", texte: "La Récré is een speelpauze voor kinderen en hun ouders, in een gezellige omgeving. Het biedt een ruimte:" },
        {
          t: "liste",
          items: [
            "om te spelen, waar de kleintjes nieuwe dingen kunnen ontdekken;",
            "om elkaar te ontmoeten, waar de volwassenen kunnen praten en even op adem komen buitenshuis;",
            "om te praten, die kinderen en ouders voorbereidt op de crèche of de school.",
          ],
        },
        { t: "h2", texte: "Onthaalmomenten" },
        {
          t: "liste",
          items: [
            "Dinsdag, van 9.30 tot 12 uur",
            "Donderdag, van 9.30 tot 12 uur",
            "Vrijdag, van 9.30 tot 12 uur",
            "De eerste zaterdag van de maand, van 9.30 tot 12 uur",
          ],
          verifier: true,
        },
        { t: "h2", texte: "En ook" },
        {
          t: "liste",
          items: [
            "Een workshop psychomotoriek, op woensdag van 10.30 tot 11.30 uur.",
            "Muzikale en zintuiglijke activiteiten, op maandag om 10.30 uur.",
          ],
          verifier: true,
        },
        { t: "lien", texte: "De workshop psychomotoriek", href: "/actions/psychomotricite-relationnelle" },
        { t: "h2", texte: "Contact" },
        { t: "p", texte: "La Récré, Rue Esseghem 26 (rechts van het wijkgezondheidscentrum). Telefoon: 0470 06 34 08.", verifier: true },
        { t: "aCompleter", texte: "E-mailadres van La Récré: te bevestigen." },
      ],
    },
    en: {
      soustitre: "A meeting place for children and parents",
      blocs: [
        { t: "p", texte: "La Récré is a playtime for children and their parents, in a friendly setting. It offers a space:" },
        {
          t: "liste",
          items: [
            "for play, where little ones can try new things;",
            "for meeting others, where grown-ups can chat and take a break away from home;",
            "for talking, which helps children and parents get ready for nursery or school.",
          ],
        },
        { t: "h2", texte: "Opening times" },
        {
          t: "liste",
          items: [
            "Tuesday, 9.30 am to 12 pm",
            "Thursday, 9.30 am to 12 pm",
            "Friday, 9.30 am to 12 pm",
            "The first Saturday of the month, 9.30 am to 12 pm",
          ],
          verifier: true,
        },
        { t: "h2", texte: "Also on offer" },
        {
          t: "liste",
          items: [
            "A psychomotor workshop, on Wednesdays from 10.30 to 11.30 am.",
            "Music and sensory activities, on Mondays at 10.30 am.",
          ],
          verifier: true,
        },
        { t: "lien", texte: "The psychomotor workshop", href: "/actions/psychomotricite-relationnelle" },
        { t: "h2", texte: "Contact" },
        { t: "p", texte: "La Récré, Rue Esseghem 26 (to the right of the health centre). Phone: 0470 06 34 08.", verifier: true },
        { t: "aCompleter", texte: "La Récré's email address: to be confirmed." },
      ],
    },
  },

  "actions/psychomotricite-relationnelle": {
    fr: {
      soustitre: "Un atelier pour les enfants de 1 à 3 ans et leur parent",
      blocs: [
        { t: "p", texte: "La maison médicale propose un atelier de psychomotricité relationnelle pour les enfants de 1 à 3 ans, accompagnés d'un parent. Les enfants y découvrent le jeu comme lieu de relation, de découverte et de stimulation, à travers le mouvement et les expériences sensorielles." },
        { t: "photo", alt: "La salle de psychomotricité, avec ses tapis et espaliers", ...photoPsychomot },
        { t: "p", texte: "L'espace de psychomotricité est un terrain de jeu où l'enfant peut découvrir, explorer et jouer en toute sécurité. Accompagné par la psychomotricienne, et nourri des rencontres avec les autres enfants, l'espace et les objets, il apprend dans le plaisir du jeu à construire, anticiper, oser, partager l'espace avec les autres et prendre soin de lui, des autres et de son environnement." },
        { t: "p", texte: "Dans ce cadre ludique et rassurant, il s'affirme et prend sa place, tout en apprenant à composer avec les autres enfants." },
        { t: "h2", texte: "Infos pratiques" },
        {
          t: "liste",
          items: [
            "Le mercredi de 10 h 30 à 11 h 30, sauf pendant les congés scolaires.",
            "Dans la salle de gymnastique, au premier étage du 24 rue Esseghem.",
            "La première séance est gratuite, pour essayer.",
            "Ensuite : 10 euros pour 5 séances si vous habitez Jette, 15 euros pour 5 séances si vous habitez une autre commune.",
          ],
          verifier: true,
        },
      ],
    },
    nl: {
      soustitre: "Een workshop voor kinderen van 1 tot 3 jaar en hun ouder",
      blocs: [
        { t: "p", texte: "Het wijkgezondheidscentrum biedt een workshop relationele psychomotoriek aan voor kinderen van 1 tot 3 jaar, samen met een ouder. De kinderen ontdekken er spel als een plek van contact, ontdekking en stimulatie, door beweging en zintuiglijke ervaringen." },
        { t: "photo", alt: "De psychomotoriekzaal, met matten en wandrekken", ...photoPsychomot },
        { t: "p", texte: "De psychomotoriekruimte is een speelplaats waar het kind veilig kan ontdekken, verkennen en spelen. Begeleid door de psychomotricienne, en gevoed door de ontmoetingen met andere kinderen, de ruimte en de voorwerpen, leert het al spelend bouwen, vooruitzien, durven, de ruimte delen met anderen en zorg dragen voor zichzelf, de anderen en zijn omgeving." },
        { t: "p", texte: "In dit speelse en geruststellende kader komt het voor zichzelf op en neemt het zijn plaats in, terwijl het leert rekening te houden met de andere kinderen." },
        { t: "h2", texte: "Praktische info" },
        {
          t: "liste",
          items: [
            "Op woensdag van 10.30 tot 11.30 uur, behalve tijdens de schoolvakanties.",
            "In de turnzaal, op de eerste verdieping van Rue Esseghem 24.",
            "De eerste sessie is gratis, om te proberen.",
            "Daarna: 10 euro voor 5 sessies als u in Jette woont, 15 euro voor 5 sessies als u in een andere gemeente woont.",
          ],
          verifier: true,
        },
      ],
    },
    en: {
      soustitre: "A workshop for children aged 1 to 3 and their parent",
      blocs: [
        { t: "p", texte: "The health centre offers a relational psychomotor workshop for children aged 1 to 3, with a parent. Children discover play as a way to connect, explore and be stimulated, through movement and sensory experiences." },
        { t: "photo", alt: "The psychomotor room, with its mats and wall bars", ...photoPsychomot },
        { t: "p", texte: "The psychomotor space is a playground where children can discover, explore and play safely. Guided by the psychomotor therapist, and learning from other children, the space and the objects, they learn through play to build, anticipate, be brave, share the space with others and take care of themselves, others and their surroundings." },
        { t: "p", texte: "In this playful and reassuring setting, children gain confidence and find their place, while learning to get along with others." },
        { t: "h2", texte: "Practical information" },
        {
          t: "liste",
          items: [
            "Wednesdays from 10.30 to 11.30 am, except during school holidays.",
            "In the gym room, on the first floor of Rue Esseghem 24.",
            "The first session is free, so you can try it out.",
            "After that: 10 euros for 5 sessions if you live in Jette, 15 euros for 5 sessions if you live elsewhere.",
          ],
          verifier: true,
        },
      ],
    },
  },
};
