"use server";
// Envoi d'une demande de médicaments.
// Rien n'est enregistré sur le site : la demande part par e-mail (Mailjet) vers l'adresse de l'équipe,
// puis elle est oubliée. Les réglages (clés Mailjet, adresses) viennent des variables d'environnement de Vercel.
import { headers } from "next/headers";
import { medecins } from "@/lib/site";

export type ChampMedic = "nom" | "prenom" | "naissance" | "telephone" | "email" | "medecin" | "medicaments" | "consentement";
export type CodeErreur = "requis" | "email" | "telephone" | "naissance" | "long" | "consentement";

export type EtatMedic =
  | { statut: "initial" }
  | { statut: "envoye" }
  | { statut: "demo" }
  | { statut: "invalide"; erreurs: Partial<Record<ChampMedic, CodeErreur>>; valeurs: Record<string, string> }
  | { statut: "trop" }
  | { statut: "erreur" };

// Anti-spam 1 : limite simple par adresse IP (5 demandes par heure), gardée en mémoire seulement.
const LIMITE = 5;
const FENETRE_MS = 60 * 60 * 1000;
const compteurs = new Map<string, number[]>();

function tropDeDemandes(ip: string): boolean {
  const maintenant = Date.now();
  const recentes = (compteurs.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  if (recentes.length >= LIMITE) {
    compteurs.set(ip, recentes);
    return true;
  }
  recentes.push(maintenant);
  compteurs.set(ip, recentes);
  if (compteurs.size > 5000) compteurs.clear();
  return false;
}

function texte(form: FormData, cle: string): string {
  const v = form.get(cle);
  return typeof v === "string" ? v.trim() : "";
}

export async function envoyerDemandeMedicaments(_precedent: EtatMedic, form: FormData): Promise<EtatMedic> {
  const valeurs = {
    nom: texte(form, "nom"),
    prenom: texte(form, "prenom"),
    naissance: texte(form, "naissance"),
    telephone: texte(form, "telephone"),
    email: texte(form, "email"),
    medecin: texte(form, "medecin"),
    medicaments: texte(form, "medicaments"),
  };
  const consentement = form.get("consentement") === "oui";

  const erreurs: Partial<Record<ChampMedic, CodeErreur>> = {};
  for (const champ of ["nom", "prenom", "naissance", "telephone", "medicaments"] as const) {
    if (!valeurs[champ]) erreurs[champ] = "requis";
  }
  for (const champ of ["nom", "prenom", "telephone", "email"] as const) {
    if (valeurs[champ].length > 120) erreurs[champ] = "long";
  }
  if (valeurs.medicaments.length > 2000) erreurs.medicaments = "long";
  if (valeurs.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.email)) erreurs.email = "email";
  if (valeurs.telephone && !erreurs.telephone) {
    const chiffres = valeurs.telephone.replace(/\D/g, "");
    if (!/^[0-9+\s./()-]+$/.test(valeurs.telephone) || chiffres.length < 8 || chiffres.length > 15) erreurs.telephone = "telephone";
  }
  if (valeurs.naissance) {
    const d = new Date(valeurs.naissance);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valeurs.naissance) || isNaN(d.getTime()) || d > new Date() || d.getFullYear() < 1900)
      erreurs.naissance = "naissance";
  }
  if (valeurs.medecin && !medecins.includes(valeurs.medecin)) valeurs.medecin = "";
  if (!consentement) erreurs.consentement = "consentement";

  if (Object.keys(erreurs).length > 0) return { statut: "invalide", erreurs, valeurs };

  // Anti-spam 2 : champ piège invisible (les robots le remplissent, les humains ne le voient pas).
  // Anti-spam 3 : un formulaire complet envoyé moins de 3 secondes après son ouverture vient presque sûrement d'un robot.
  // Dans les deux cas, on n'envoie rien et on affiche le message d'erreur qui invite à appeler l'accueil :
  // jamais de faux « envoyé », pour qu'un patient ne croie pas sa demande partie alors qu'elle ne l'est pas.
  const debut = Number(texte(form, "debut"));
  if (texte(form, "site_web") !== "" || (debut && Date.now() - debut < 3000)) return { statut: "erreur" };

  const entetes = await headers();
  const ip = entetes.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (tropDeDemandes(ip)) return { statut: "trop" };

  const cle = process.env.MAILJET_API_KEY;
  const secret = process.env.MAILJET_SECRET_KEY;
  const expediteur = process.env.MEDIC_EXPEDITEUR;
  const destinataire = process.env.MEDIC_DESTINATAIRE;
  // Tant que l'envoi n'est pas configuré dans Vercel, le formulaire reste en « mode test » : rien n'est envoyé.
  if (!cle || !secret || !expediteur || !destinataire) return { statut: "demo" };

  const [annee, mois, jour] = valeurs.naissance.split("-");
  const corps = [
    "Nouvelle demande de médicaments (formulaire du site)",
    "",
    `Nom : ${valeurs.nom}`,
    `Prénom : ${valeurs.prenom}`,
    `Date de naissance : ${jour}/${mois}/${annee}`,
    `Téléphone : ${valeurs.telephone}`,
    `E-mail : ${valeurs.email || "(non communiqué)"}`,
    `Médecin : ${valeurs.medecin || "sans préférence"}`,
    "",
    "Médicaments demandés :",
    valeurs.medicaments,
  ].join("\n");

  const message: Record<string, unknown> = {
    From: { Email: expediteur, Name: "Site MME – demandes de médicaments" },
    To: [{ Email: destinataire }],
    Subject: `Demande de médicaments – ${valeurs.nom.toUpperCase()} ${valeurs.prenom}`,
    TextPart: corps,
  };
  if (valeurs.email) message.ReplyTo = { Email: valeurs.email, Name: `${valeurs.prenom} ${valeurs.nom}` };

  try {
    const reponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${cle}:${secret}`).toString("base64"),
      },
      body: JSON.stringify({ Messages: [message] }),
      cache: "no-store",
    });
    if (!reponse.ok) {
      // On note seulement le code d'erreur, jamais le contenu de la demande.
      console.error("Mailjet : envoi refusé, code", reponse.status);
      return { statut: "erreur" };
    }
  } catch {
    console.error("Mailjet : service injoignable");
    return { statut: "erreur" };
  }
  return { statut: "envoye" };
}
