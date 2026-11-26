// Vérifications communes à toutes les pages de l'espace d'administration.
// Chaque page et chaque action les refait côté serveur : on ne se fie jamais au seul navigateur.
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { clientSupabase, supabaseConfigure } from "@/lib/supabase/serveur";

export type Role = "administrateur" | "contenu" | "accueil" | "lecture";
export type Profil = { id: string; nom: string; role: Role; actif: boolean };

export const libellesRoles: Record<Role, string> = {
  administrateur: "Administrateur",
  contenu: "Contenu (newsletter, planning, inscriptions)",
  accueil: "Accueil (réservé pour plus tard)",
  lecture: "Lecture seule",
};

/**
 * Exige une personne connectée, avec le code validé (double vérification) et un compte actif.
 * Si `roles` est donné et que le rôle n'en fait pas partie : renvoie `refuse: true`.
 */
export async function exigerSession(roles?: Role[]) {
  if (!supabaseConfigure()) redirect("/admin/non-configure");
  const supabase = await clientSupabase();
  const { data: utilisateur } = await supabase.auth.getUser();
  if (!utilisateur.user) redirect("/admin/connexion");

  const { data: niveau } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (niveau?.currentLevel !== "aal2") redirect("/admin/code");

  const { data: profil } = await supabase
    .from("profils")
    .select("id, nom, role, actif")
    .eq("id", utilisateur.user.id)
    .maybeSingle<Profil>();
  if (!profil || !profil.actif) {
    await supabase.auth.signOut();
    redirect("/admin/connexion?refuse=1");
  }
  return { supabase, profil, refuse: Boolean(roles && !roles.includes(profil.role)) };
}

/** Adresse du site (pour les liens envoyés par e-mail). */
export async function adresseSite(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const hote = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (hote.startsWith("localhost") ? "http" : "https");
  return `${proto}://${hote}`;
}
