"use server";
// Actions de l'espace d'administration. Chacune revérifie qui la demande, côté serveur.
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clientSupabase, supabaseConfigure } from "@/lib/supabase/serveur";
import { clientService, serviceConfigure } from "@/lib/supabase/service";
import { adresseSite, exigerSession, type Role } from "@/lib/admin/session";

export type EtatSimple = { message?: string; erreur?: string };

// ---------- Connexion : lien par e-mail ----------
const essais = new Map<string, number[]>();
function tropDEssais(cle: string, max: number): boolean {
  const maintenant = Date.now();
  const recents = (essais.get(cle) ?? []).filter((t) => maintenant - t < 15 * 60 * 1000);
  recents.push(maintenant);
  essais.set(cle, recents);
  if (essais.size > 5000) essais.clear();
  return recents.length > max;
}

export async function envoyerLien(_e: EtatSimple, form: FormData): Promise<EtatSimple> {
  if (!supabaseConfigure()) return { erreur: "L'espace d'administration n'est pas encore branché." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { erreur: "Cette adresse e-mail ne semble pas valide." };
  if (tropDEssais(`lien:${email}`, 5)) return { erreur: "Trop de demandes. Réessayez dans un quart d'heure." };
  const supabase = await clientSupabase();
  // shouldCreateUser: false → personne ne peut créer son propre compte.
  await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: `${await adresseSite()}/admin/auth/confirm` },
  });
  // Même réponse que l'adresse soit connue ou non, pour ne rien révéler.
  return { message: "Si cette adresse a été invitée, un lien de connexion vient de lui être envoyé. Pensez à regarder dans les indésirables." };
}

// ---------- Deuxième vérification : code du téléphone ----------
export type EtatCode = EtatSimple & { qr?: string; secret?: string; factorId?: string };

/** Prépare l'ajout de l'application de codes (première connexion). */
export async function preparerCode(): Promise<EtatCode> {
  const supabase = await clientSupabase();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/admin/connexion");
  const { data: facteurs } = await supabase.auth.mfa.listFactors();
  for (const f of facteurs?.all ?? []) {
    if (f.status !== "verified") await supabase.auth.mfa.unenroll({ factorId: f.id });
  }
  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Téléphone" });
  if (error || !data) return { erreur: "Impossible de préparer le code. Réessayez." };
  return { qr: data.totp.qr_code, secret: data.totp.secret, factorId: data.id };
}

export async function verifierCode(_e: EtatCode, form: FormData): Promise<EtatCode> {
  const supabase = await clientSupabase();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/admin/connexion");
  const code = String(form.get("code") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return { erreur: "Le code comporte 6 chiffres." };
  if (tropDEssais(`code:${u.user.id}`, 8)) return { erreur: "Trop d'essais. Réessayez dans un quart d'heure." };
  let factorId = String(form.get("factorId") ?? "");
  if (!factorId) {
    const { data: facteurs } = await supabase.auth.mfa.listFactors();
    factorId = facteurs?.totp.find((f) => f.status === "verified")?.id ?? "";
  }
  if (!factorId) return { erreur: "Aucune application de codes n'est encore reliée à ce compte." };
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) return { erreur: "Code incorrect ou expiré. Réessayez avec le code affiché maintenant." };
  redirect("/admin");
}

export async function seDeconnecter() {
  const supabase = await clientSupabase();
  await supabase.auth.signOut();
  redirect("/admin/connexion");
}

// ---------- Comptes (administrateur seulement) ----------
const roles: Role[] = ["administrateur", "contenu", "accueil", "lecture"];

export async function inviter(_e: EtatSimple, form: FormData): Promise<EtatSimple> {
  const { supabase, refuse } = await exigerSession(["administrateur"]);
  if (refuse) return { erreur: "Réservé à l'administrateur." };
  if (!serviceConfigure()) return { erreur: "La clé de service Supabase n'est pas réglée dans Vercel." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const nom = String(form.get("nom") ?? "").trim();
  const role = String(form.get("role") ?? "") as Role;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { erreur: "Cette adresse e-mail ne semble pas valide." };
  if (!nom || nom.length > 80) return { erreur: "Indiquez un nom (80 caractères au plus)." };
  if (!roles.includes(role)) return { erreur: "Choisissez un rôle." };

  const { data, error } = await clientService().auth.admin.inviteUserByEmail(email, {
    redirectTo: `${await adresseSite()}/admin/auth/confirm`,
  });
  if (error || !data.user) return { erreur: "L'invitation n'a pas pu être envoyée (adresse déjà invitée ?)." };
  // La fiche est créée au nom de l'administrateur : le journal note qui a invité.
  const { error: e2 } = await supabase.from("profils").insert({ id: data.user.id, nom, role });
  if (e2) return { erreur: "L'invitation est partie, mais la fiche n'a pas pu être créée. Prévenez Claude." };
  revalidatePath("/admin/comptes");
  return { message: `Invitation envoyée à ${email}. La personne devra activer le code sur son téléphone à sa première connexion.` };
}

export async function basculerActif(form: FormData) {
  const { supabase, profil, refuse } = await exigerSession(["administrateur"]);
  if (refuse) return;
  const id = String(form.get("id") ?? "");
  if (!id || id === profil.id) return; // on ne peut pas se désactiver soi-même
  const { data: cible } = await supabase.from("profils").select("actif").eq("id", id).maybeSingle<{ actif: boolean }>();
  if (!cible) return;
  await supabase.from("profils").update({ actif: !cible.actif }).eq("id", id);
  revalidatePath("/admin/comptes");
}
