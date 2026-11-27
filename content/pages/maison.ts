// Pages « La maison médicale » : notre philosophie et notre histoire.
// Contenu repris de l'ancien site et condensé. Les chiffres détaillés des cotisations sociales
// (anciens, probablement dépassés) ne sont pas repris ; le raisonnement est conservé.
import type { PageTraduite } from "./types";

export const pagesMaison: Record<string, PageTraduite> = {
  philosophie: {
    fr: {
      soustitre: "Le forfait : financer la santé plutôt que la maladie",
      blocs: [
        { t: "h2", texte: "Pourquoi nous avons quitté le paiement à l'acte" },
        { t: "p", texte: "À ses débuts, la maison médicale fonctionnait comme partout ailleurs : chaque consultation était payée à l'acte. Ce système ne nous convenait pas. Avec le paiement à l'acte, c'est la maladie qui finance le travail des soignants : plus il y a de patients malades, plus les revenus augmentent." },
        { t: "p", texte: "Or notre rôle est avant tout de préserver et de restaurer la santé des personnes qui s'adressent à nous. Nos objectifs :" },
        {
          t: "liste",
          items: [
            "faciliter l'accès à des soins de qualité, égaux pour tous ;",
            "aider chaque patient à atteindre un maximum d'autonomie ;",
            "donner de plus en plus de place à la prévention et à l'éducation à la santé.",
          ],
        },
        { t: "p", texte: "Avec le paiement à l'acte, il nous était difficile de vous proposer un examen ou un conseil de prévention une fois votre problème réglé, puisque nous devions vous le faire payer. Nous avons donc choisi un système qui récompense le maintien de la santé : le forfait. Nous y sommes passés le 1er avril 1992." },
        { t: "h2", texte: "Un système solidaire, pas gratuit" },
        { t: "p", texte: "Vous payez déjà vos soins de santé par les cotisations sociales prélevées sur les revenus du travail (une part payée par le travailleur, une part par l'employeur), et en partie par les impôts. Comme ces cotisations sont proportionnelles aux revenus, ceux qui gagnent plus cotisent davantage : c'est le principe de solidarité de la sécurité sociale." },
        { t: "p", texte: "Ces cotisations financent l'assurance maladie, qui rembourse vos soins et vos médicaments. Une partie sert aussi à payer le forfait de la maison médicale." },
        { t: "h2", texte: "Comment fonctionne le forfait ?" },
        { t: "p", texte: "En 1983, des maisons médicales ont cherché un autre mode de financement : devoir payer son médecin, son kiné ou son infirmière poussait certaines personnes à renoncer aux soins, et le paiement à l'acte peut encourager la surconsommation. Avec le GERM (Groupe d'étude pour une réforme de la médecine), elles ont obtenu de l'INAMI de pouvoir essayer le forfait." },
        { t: "p", texte: "La maison médicale reçoit un montant mensuel fixe pour chaque personne inscrite, qu'elle vienne ou non. Ce montant est calculé par l'INAMI à partir de la consommation moyenne de soins en Belgique, pour la médecine générale, la kinésithérapie et les soins infirmiers. C'est votre mutuelle qui le verse." },
        { t: "p", texte: "En contrepartie, nous assurons à toutes les personnes inscrites les soins de médecine générale, de kinésithérapie et les soins infirmiers." },
        { t: "h2", texte: "Un système qui repose sur chacun" },
        { t: "p", texte: "Le forfait ne fonctionne que si la maison médicale compte assez de personnes inscrites pour payer les salaires et les frais de fonctionnement, et si chacun l'utilise dans le même esprit de solidarité, pour que les soignants restent disponibles pour ceux qui en ont vraiment besoin." },
        { t: "aCompleter", texte: "Nombre de personnes inscrites (4 600 selon l'ancien site) : à mettre à jour si l'équipe souhaite l'afficher." },
        { t: "p", texte: "Une question sur le forfait ? N'hésitez pas à nous en parler." },
        { t: "lien", texte: "S'inscrire à la maison médicale", href: "/pratique/inscription" },
      ],
    },
    nl: {
      soustitre: "Het forfait: gezondheid financieren in plaats van ziekte",
      blocs: [
        { t: "h2", texte: "Waarom we de betaling per prestatie hebben verlaten" },
        { t: "p", texte: "In het begin werkte het wijkgezondheidscentrum zoals overal: elke consultatie werd per prestatie betaald. Dat systeem paste niet bij ons. Bij betaling per prestatie is het de ziekte die het werk van de zorgverleners financiert: hoe meer zieke patiënten, hoe hoger de inkomsten." },
        { t: "p", texte: "Onze rol is nochtans in de eerste plaats de gezondheid van onze patiënten te bewaren en te herstellen. Onze doelen:" },
        {
          t: "liste",
          items: [
            "de toegang tot kwaliteitsvolle, gelijke zorg voor iedereen vergemakkelijken;",
            "elke patiënt helpen zo zelfstandig mogelijk te worden;",
            "steeds meer plaats geven aan preventie en gezondheidseducatie.",
          ],
        },
        { t: "p", texte: "Met betaling per prestatie was het moeilijk om u een preventief onderzoek of advies voor te stellen zodra uw probleem opgelost was, omdat we het u moesten laten betalen. Daarom kozen we voor een systeem dat het behoud van gezondheid beloont: het forfait. We stapten erop over op 1 april 1992." },
        { t: "h2", texte: "Een solidair systeem, niet gratis" },
        { t: "p", texte: "U betaalt uw gezondheidszorg al via de sociale bijdragen op arbeidsinkomens (een deel betaald door de werknemer, een deel door de werkgever) en deels via de belastingen. Omdat die bijdragen evenredig zijn met het inkomen, betalen wie meer verdienen ook meer: dat is de solidariteit van de sociale zekerheid." },
        { t: "p", texte: "Die bijdragen financieren de ziekteverzekering, die uw zorg en geneesmiddelen terugbetaalt. Een deel ervan betaalt ook het forfait van het wijkgezondheidscentrum." },
        { t: "h2", texte: "Hoe werkt het forfait?" },
        { t: "p", texte: "In 1983 zochten wijkgezondheidscentra naar een andere financiering: wie zijn arts, kinesitherapeut of verpleegkundige moest betalen, zag soms af van zorg, en betaling per prestatie kan overconsumptie in de hand werken. Samen met de GERM (studiegroep voor een hervorming van de geneeskunde) kregen ze van het RIZIV de kans om het forfait uit te proberen." },
        { t: "p", texte: "Het wijkgezondheidscentrum ontvangt een vast maandelijks bedrag per ingeschreven persoon, of die nu komt of niet. Het RIZIV berekent dat bedrag op basis van het gemiddelde zorggebruik in België, voor huisartsgeneeskunde, kinesitherapie en verpleegkunde. Uw ziekenfonds betaalt het." },
        { t: "p", texte: "In ruil bieden we alle ingeschreven personen huisartsgeneeskunde, kinesitherapie en verpleegkundige zorg." },
        { t: "h2", texte: "Een systeem dat op iedereen steunt" },
        { t: "p", texte: "Het forfait werkt alleen als het wijkgezondheidscentrum genoeg ingeschreven personen heeft om de lonen en werkingskosten te betalen, en als iedereen het met dezelfde solidaire ingesteldheid gebruikt, zodat de zorgverleners beschikbaar blijven voor wie ze echt nodig heeft." },
        { t: "aCompleter", texte: "Aantal ingeschreven personen: bij te werken als het team het wil tonen." },
        { t: "p", texte: "Een vraag over het forfait? Spreek ons gerust aan." },
        { t: "lien", texte: "Inschrijven in het wijkgezondheidscentrum", href: "/pratique/inscription" },
      ],
    },
    en: {
      soustitre: "The flat fee: funding health rather than illness",
      blocs: [
        { t: "h2", texte: "Why we stopped charging per consultation" },
        { t: "p", texte: "In its early days, the health centre worked like everywhere else: each consultation was paid for separately. This did not suit us. When care is paid per consultation, illness funds the work of the practitioners: the more ill patients there are, the higher the income." },
        { t: "p", texte: "Yet our role is above all to protect and restore the health of the people who come to us. Our aims:" },
        {
          t: "liste",
          items: [
            "to make quality care, equal for everyone, easier to access;",
            "to help every patient become as independent as possible;",
            "to give more and more room to prevention and health education.",
          ],
        },
        { t: "p", texte: "With payment per consultation, it was hard to offer you a check-up or prevention advice once your problem was solved, because we had to charge you for it. So we chose a system that rewards staying healthy: the flat fee. We switched to it on 1 April 1992." },
        { t: "h2", texte: "A solidarity-based system, not a free one" },
        { t: "p", texte: "You already pay for your healthcare through social security contributions on earnings (part paid by the employee, part by the employer), and partly through taxes. Because these contributions are proportional to income, those who earn more contribute more: this is the solidarity principle of social security." },
        { t: "p", texte: "These contributions fund health insurance, which reimburses your care and medicines. Part of them also pays the health centre's flat fee." },
        { t: "h2", texte: "How does the flat fee work?" },
        { t: "p", texte: "In 1983, health centres looked for another way of funding care: having to pay the doctor, physiotherapist or nurse led some people to go without care, and payment per consultation can encourage overuse. With the GERM (a study group for medical reform), they obtained permission from INAMI to try the flat fee." },
        { t: "p", texte: "The health centre receives a fixed monthly amount for each registered person, whether or not they come. INAMI calculates this amount from average healthcare use in Belgium, for general practice, physiotherapy and nursing. Your health insurance fund pays it." },
        { t: "p", texte: "In return, we provide general practice, physiotherapy and nursing care to everyone registered." },
        { t: "h2", texte: "A system that relies on everyone" },
        { t: "p", texte: "The flat fee only works if the health centre has enough registered people to pay salaries and running costs, and if everyone uses it in the same spirit of solidarity, so that practitioners remain available for those who really need them." },
        { t: "aCompleter", texte: "Number of registered people: to be updated if the team wants to show it." },
        { t: "p", texte: "Any questions about the flat fee? Feel free to ask us." },
        { t: "lien", texte: "Register with the health centre", href: "/pratique/inscription" },
      ],
    },
  },

  // Texte rédigé par l'équipe (document « Site internet MME », novembre 2026).
  historique: {
    fr: {
      soustitre: "Depuis 1981, une histoire collective",
      blocs: [
        { t: "p", texte: "La Maison Médicale Esseghem est née d'une idée simple : réunir différents professionnels de santé pour travailler ensemble, au cœur du quartier." },
        { t: "p", texte: "Depuis, la maison a grandi, déménagé, créé des antennes, accompagné leur autonomie, traversé des moments difficiles et continuellement adapté ses pratiques." },
        { t: "citation", texte: "Plus de 40 ans plus tard, l'esprit reste le même : prendre soin, ensemble." },
        {
          t: "dates",
          items: [
            { date: "1981", titre: "Les débuts", texte: "Paul Leroy et Étienne Laurent, deux jeunes médecins, s'associent au kinésithérapeute Marc Hombergen. Le 3 août, la Maison Médicale Esseghem ouvre ses portes au 169, rue Jules Lahaye. Un médecin, un kiné, une salle d'attente : le début de l'aventure." },
            { date: "1983", titre: "Une équipe se construit", texte: "La maison médicale devient une ASBL. Une psychologue, un assistant social, une logopède et un dentiste rejoignent successivement le trio déjà en place. La pluridisciplinarité devient une réalité." },
            { date: "1985 – 1990", titre: "Grandir", texte: "L'équipe s'agrandit encore. Les premiers locaux deviennent trop petits. En 1990, la maison médicale s'installe au 24, rue Esseghem, son adresse depuis lors." },
            { date: "1992", titre: "Le choix du forfait", texte: "Le 1er avril 1992, la maison médicale adopte le système de paiement forfaitaire. Un choix important dans son histoire : favoriser l'accès aux soins et permettre une approche qui ne repose pas uniquement sur les actes médicaux. Le forfait devient l'un des fondements du projet." },
            { date: "1995 – 2009", titre: "Essaimer", texte: "Le succès du modèle donne naissance à plusieurs antennes qui deviendront à leur tour indépendantes : la Maison Médicale Kattebroek à Berchem-Sainte-Agathe, la Maison Médicale Tournesol à Jette et la Maison Médicale Cité Santé à Laeken. En 2000 naît aussi L'Abordage ASBL, une maison de quartier qui répond aux besoins locaux identifiés par l'équipe. En 2005 naît La Récré. En 2009, l'antenne du boulevard De Smet De Naeyer est finalisée." },
            { date: "2013 – 2022", titre: "Rénover", texte: "Le rez-de-chaussée est entièrement rénové et transformé ; les nouveaux espaces sont inaugurés en 2014. Un étage supplémentaire est créé en 2022 : toute l'équipe peut se regrouper dans des locaux agrandis et quitter l'antenne. La même année, Paul Leroy, médecin fondateur de la maison médicale, prend sa retraite." },
          ],
        },
        { t: "h2", texte: "Et maintenant ? L'histoire continue" },
        { t: "p", texte: "En 1981, ils étaient quelques-uns. Aujourd'hui, la Maison Médicale Esseghem est devenue une équipe beaucoup plus large, dans des locaux qui ont eux aussi beaucoup changé." },
        { t: "p", texte: "Mais le projet reste porté par la même envie :" },
        { t: "citation", texte: "Travailler ensemble, être accessibles et prendre soin des personnes dans leur environnement." },
        { t: "lien", texte: "Notre philosophie", href: "/philosophie" },
      ],
    },
    nl: {
      soustitre: "Sinds 1981, een gezamenlijk verhaal",
      blocs: [
        { t: "p", texte: "Maison Médicale Esseghem ontstond uit een eenvoudig idee: verschillende zorgverleners samenbrengen om samen te werken, midden in de wijk." },
        { t: "p", texte: "Sindsdien is het centrum gegroeid, verhuisd, heeft het antennes opgericht en hun zelfstandigheid begeleid, moeilijke momenten doorgemaakt en zijn werkwijze voortdurend aangepast." },
        { t: "citation", texte: "Meer dan 40 jaar later is de geest dezelfde gebleven: samen zorg dragen." },
        {
          t: "dates",
          items: [
            { date: "1981", titre: "Het begin", texte: "Twee jonge artsen, Paul Leroy en Étienne Laurent, slaan de handen in elkaar met kinesitherapeut Marc Hombergen. Op 3 augustus opent Maison Médicale Esseghem de deuren in de Jules Lahayestraat 169. Een arts, een kinesitherapeut, een wachtzaal: het begin van het avontuur." },
            { date: "1983", titre: "Een team groeit", texte: "Het wijkgezondheidscentrum wordt een vzw. Een psycholoog, een maatschappelijk werker, een logopedist en een tandarts vervoegen na elkaar het trio. Multidisciplinair werken wordt werkelijkheid." },
            { date: "1985 – 1990", titre: "Groeien", texte: "Het team groeit verder en de eerste lokalen worden te klein. In 1990 verhuist het wijkgezondheidscentrum naar Rue Esseghem 24, waar het sindsdien gevestigd is." },
            { date: "1992", titre: "De keuze voor het forfait", texte: "Op 1 april 1992 stapt het wijkgezondheidscentrum over op het forfaitaire betalingssysteem. Een belangrijke keuze: de toegang tot zorg bevorderen en een aanpak mogelijk maken die niet alleen op medische prestaties steunt. Het forfait wordt een van de pijlers van het project." },
            { date: "1995 – 2009", titre: "Uitzwermen", texte: "Het succes van het model leidt tot verschillende antennes die op hun beurt zelfstandig worden: Maison Médicale Kattebroek in Sint-Agatha-Berchem, Maison Médicale Tournesol in Jette en Maison Médicale Cité Santé in Laken. In 2000 ontstaat ook L'Abordage vzw, een buurthuis dat inspeelt op de noden die het team in de wijk vaststelde. In 2005 ontstaat La Récré. In 2009 wordt de antenne aan de De Smet de Naeyerlaan afgewerkt." },
            { date: "2013 – 2022", titre: "Vernieuwen", texte: "De benedenverdieping wordt volledig vernieuwd en heringericht; de nieuwe ruimtes worden in 2014 ingehuldigd. In 2022 komt er een extra verdieping bij: het hele team kan samenkomen in de vergrote lokalen en de antenne verlaten. Datzelfde jaar gaat Paul Leroy, stichtend arts van het centrum, met pensioen." },
          ],
        },
        { t: "h2", texte: "En nu? Het verhaal gaat verder" },
        { t: "p", texte: "In 1981 waren ze met enkelen. Vandaag is Maison Médicale Esseghem een veel groter team, in lokalen die ook sterk veranderd zijn." },
        { t: "p", texte: "Maar het project wordt nog altijd gedragen door dezelfde wens:" },
        { t: "citation", texte: "Samenwerken, toegankelijk zijn en zorg dragen voor mensen in hun eigen omgeving." },
        { t: "lien", texte: "Onze visie", href: "/philosophie" },
      ],
    },
    en: {
      soustitre: "Since 1981, a shared story",
      blocs: [
        { t: "p", texte: "Maison Médicale Esseghem grew out of a simple idea: bringing different health professionals together to work as a team, at the heart of the neighbourhood." },
        { t: "p", texte: "Since then, the centre has grown, moved, created satellite centres and supported their independence, been through difficult times and constantly adapted the way it works." },
        { t: "citation", texte: "More than 40 years later, the spirit is the same: caring, together." },
        {
          t: "dates",
          items: [
            { date: "1981", titre: "The beginning", texte: "Two young doctors, Paul Leroy and Étienne Laurent, team up with physiotherapist Marc Hombergen. On 3 August, Maison Médicale Esseghem opens its doors at 169 rue Jules Lahaye. One doctor, one physiotherapist, one waiting room: the adventure begins." },
            { date: "1983", titre: "Building a team", texte: "The health centre becomes a non-profit organisation. A psychologist, a social worker, a speech therapist and a dentist join the original trio one after another. Multidisciplinary care becomes a reality." },
            { date: "1985 – 1990", titre: "Growing", texte: "The team keeps growing and the first premises become too small. In 1990, the health centre moves to 24 rue Esseghem, where it has been ever since." },
            { date: "1992", titre: "Choosing the flat fee", texte: "On 1 April 1992, the health centre adopts the flat-fee payment system. An important choice in its history: improving access to care and allowing an approach that does not rely only on medical procedures. The flat fee becomes one of the foundations of the project." },
            { date: "1995 – 2009", titre: "Spreading out", texte: "The model's success leads to several satellite centres that in turn become independent: Maison Médicale Kattebroek in Berchem-Sainte-Agathe, Maison Médicale Tournesol in Jette and Maison Médicale Cité Santé in Laeken. In 2000, the community centre L'Abordage is founded to meet local needs identified by the team. In 2005, La Récré is born. In 2009, the satellite on boulevard De Smet De Naeyer is completed." },
            { date: "2013 – 2022", titre: "Renovating", texte: "The ground floor is fully renovated and redesigned; the new spaces are inaugurated in 2014. An additional floor is built in 2022, so the whole team can come together in larger premises and leave the satellite centre. The same year, Paul Leroy, the founding doctor, retires." },
          ],
        },
        { t: "h2", texte: "And now? The story continues" },
        { t: "p", texte: "In 1981, there were only a few of them. Today, Maison Médicale Esseghem is a much larger team, in premises that have also changed a great deal." },
        { t: "p", texte: "But the project is still driven by the same wish:" },
        { t: "citation", texte: "Working together, being accessible and caring for people in their own environment." },
        { t: "lien", texte: "Our philosophy", href: "/philosophie" },
      ],
    },
  },
};
