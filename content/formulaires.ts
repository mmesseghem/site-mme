// Textes du formulaire de demande de médicaments, dans les trois langues.
// Mention RGPD validée par Michaël le 26/11/2026 ; version avec copie de secours de 30 jours (branche espace-admin).
import type { Locale } from "@/lib/i18n";

const fr = {
  titreFormulaire: "Faire ma demande en ligne",
  nom: "Nom",
  prenom: "Prénom",
  naissance: "Date de naissance",
  telephone: "Téléphone",
  email: "Adresse e-mail",
  medecin: "Médecin",
  sansPreference: "Sans préférence",
  medicaments: "Médicaments demandés",
  aideMedicaments: "Pour chaque médicament : le nom, le dosage, le fabricant si nécessaire, et le nombre de comprimés ou le format de la boîte.",
  consentement:
    "J'accepte que ces informations soient envoyées à l'équipe médicale de la maison médicale pour traiter ma demande.",
  rgpdTitre: "Vos données",
  rgpd:
    "Les informations de ce formulaire sont envoyées par e-mail à l'équipe de la Maison Médicale Esseghem ASBL, uniquement pour préparer votre prescription. Une copie de secours est conservée de façon sécurisée pendant 30 jours (pour retrouver une demande si un e-mail se perd), puis effacée automatiquement ; seul l'administrateur du site peut la consulter. Pour toute question sur vos données, ou pour exercer vos droits (accès, rectification, effacement), écrivez à info@mmesseghem.be.",
  obligatoire: "obligatoire",
  envoyer: "Envoyer ma demande",
  envoi: "Envoi en cours…",
  merciTitre: "Demande envoyée",
  merci: "Merci. Votre prescription sera disponible sur votre carte d'identité dans 72 heures.",
  nouvelle: "Faire une autre demande",
  demoTitre: "Mode test",
  demo: "Le formulaire fonctionne, mais l'envoi n'est pas encore activé : rien n'a été envoyé. Pour une vraie demande, appelez l'accueil au 02 424 25 40.",
  erreurTitre: "La demande n'a pas pu être envoyée",
  erreurEnvoi: "Un problème technique a empêché l'envoi. Réessayez dans quelques minutes, ou appelez l'accueil au 02 424 25 40.",
  erreurTrop: "Trop de demandes ont été envoyées depuis cet appareil. Réessayez plus tard, ou appelez l'accueil au 02 424 25 40.",
  erreurChamps: "Vérifiez les champs signalés.",
  erreurs: {
    requis: "Ce champ est obligatoire.",
    email: "Cette adresse e-mail ne semble pas valide.",
    telephone: "Ce numéro de téléphone ne semble pas valide.",
    naissance: "Cette date de naissance ne semble pas valide.",
    long: "Ce texte est trop long.",
    consentement: "Votre accord est nécessaire pour envoyer la demande.",
  },
};

export type TextesFormulaire = typeof fr;

const nl: TextesFormulaire = {
  titreFormulaire: "Mijn aanvraag online indienen",
  nom: "Naam",
  prenom: "Voornaam",
  naissance: "Geboortedatum",
  telephone: "Telefoon",
  email: "E-mailadres",
  medecin: "Arts",
  sansPreference: "Geen voorkeur",
  medicaments: "Gevraagde geneesmiddelen",
  aideMedicaments: "Voor elk geneesmiddel: de naam, de dosis, indien nodig de fabrikant, en het aantal tabletten of het formaat van de verpakking.",
  consentement:
    "Ik ga ermee akkoord dat deze gegevens naar het medisch team van het wijkgezondheidscentrum worden gestuurd om mijn aanvraag te behandelen.",
  rgpdTitre: "Uw gegevens",
  rgpd:
    "De gegevens van dit formulier worden per e-mail naar het team van Maison Médicale Esseghem vzw gestuurd, uitsluitend om uw voorschrift klaar te maken. Een reservekopie wordt 30 dagen beveiligd bewaard (om een aanvraag terug te vinden als een e-mail verloren gaat) en daarna automatisch gewist; alleen de beheerder van de website kan ze inkijken. Voor vragen over uw gegevens, of om uw rechten uit te oefenen (inzage, verbetering, wissing), schrijft u naar info@mmesseghem.be.",
  obligatoire: "verplicht",
  envoyer: "Mijn aanvraag versturen",
  envoi: "Bezig met versturen…",
  merciTitre: "Aanvraag verstuurd",
  merci: "Dank u. Uw voorschrift staat binnen 72 uur op uw identiteitskaart.",
  nouvelle: "Een nieuwe aanvraag indienen",
  demoTitre: "Testmodus",
  demo: "Het formulier werkt, maar het versturen is nog niet geactiveerd: er werd niets verstuurd. Voor een echte aanvraag belt u het onthaal op 02 424 25 40.",
  erreurTitre: "De aanvraag kon niet worden verstuurd",
  erreurEnvoi: "Een technisch probleem verhinderde het versturen. Probeer het binnen enkele minuten opnieuw, of bel het onthaal op 02 424 25 40.",
  erreurTrop: "Er werden te veel aanvragen verstuurd vanaf dit toestel. Probeer het later opnieuw, of bel het onthaal op 02 424 25 40.",
  erreurChamps: "Controleer de aangeduide velden.",
  erreurs: {
    requis: "Dit veld is verplicht.",
    email: "Dit e-mailadres lijkt niet geldig.",
    telephone: "Dit telefoonnummer lijkt niet geldig.",
    naissance: "Deze geboortedatum lijkt niet geldig.",
    long: "Deze tekst is te lang.",
    consentement: "Uw akkoord is nodig om de aanvraag te versturen.",
  },
};

const en: TextesFormulaire = {
  titreFormulaire: "Make my request online",
  nom: "Last name",
  prenom: "First name",
  naissance: "Date of birth",
  telephone: "Phone",
  email: "Email address",
  medecin: "Doctor",
  sansPreference: "No preference",
  medicaments: "Medication requested",
  aideMedicaments: "For each medicine: the name, the dose, the manufacturer if needed, and the number of tablets or the box size.",
  consentement: "I agree that this information will be sent to the health centre's medical team to process my request.",
  rgpdTitre: "Your data",
  rgpd:
    "The information in this form is sent by email to the team of Maison Médicale Esseghem ASBL, only to prepare your prescription. A backup copy is kept securely for 30 days (to recover a request if an email gets lost), then deleted automatically; only the site administrator can view it. For any question about your data, or to exercise your rights (access, correction, deletion), write to info@mmesseghem.be.",
  obligatoire: "required",
  envoyer: "Send my request",
  envoi: "Sending…",
  merciTitre: "Request sent",
  merci: "Thank you. Your prescription will be available on your identity card within 72 hours.",
  nouvelle: "Make another request",
  demoTitre: "Test mode",
  demo: "The form works, but sending is not activated yet: nothing was sent. For a real request, please call reception on 02 424 25 40.",
  erreurTitre: "Your request could not be sent",
  erreurEnvoi: "A technical problem prevented sending. Please try again in a few minutes, or call reception on 02 424 25 40.",
  erreurTrop: "Too many requests have been sent from this device. Please try again later, or call reception on 02 424 25 40.",
  erreurChamps: "Please check the highlighted fields.",
  erreurs: {
    requis: "This field is required.",
    email: "This email address does not look valid.",
    telephone: "This phone number does not look valid.",
    naissance: "This date of birth does not look valid.",
    long: "This text is too long.",
    consentement: "Your agreement is needed to send the request.",
  },
};

const textes: Record<Locale, TextesFormulaire> = { fr, nl, en };

export function getTextesFormulaire(lang: Locale): TextesFormulaire {
  return textes[lang];
}
