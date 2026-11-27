"use server";
// Actions de la newsletter (rôles « contenu » et « administrateur »). Revérifiées côté serveur à chaque appel.
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { exigerSession } from "@/lib/admin/session";
import { traduire as traduireDeepL } from "@/lib/traduction";
import { langues, languesManquantes, type Bloc, type Numero, type Textes, type TypeBloc } from "@/lib/newsletter";

const rolesEdition = ["administrateur", "contenu"] as const;
const types: TypeBloc[] = ["titre", "texte", "encadre", "bouton"];
export type Resultat = { ok?: string; erreur?: string };

function nettoyerTextes(t: unknown, max: number): Textes {
  const src = (t ?? {}) as Record<string, unknown>;
  const r = { fr: "", nl: "", en: "" } as Textes;
  for (const l of langues) r[l] = typeof src[l] === "string" ? (src[l] as string).slice(0, max) : "";
  return r;
}

function nettoyerBlocs(blocs: unknown): Bloc[] {
  if (!Array.isArray(blocs)) return [];
  return blocs.slice(0, 40).flatMap((b) => {
    const x = b as Partial<Bloc>;
    if (!x || !types.includes(x.type as TypeBloc)) return [];
    const bloc: Bloc = { id: String(x.id ?? crypto.randomUUID()).slice(0, 40), type: x.type as TypeBloc, textes: nettoyerTextes(x.textes, 4000) };
    // Liens : uniquement vers une page du site (/…) ou une adresse https sûre.
    if (x.type === "bouton" && typeof x.lien === "string" && /^(\/[^\s]*|https:\/\/[^\s]+)$/.test(x.lien)) bloc.lien = x.lien.slice(0, 300);
    return [bloc];
  });
}

export async function creerNumero() {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) redirect("/admin");
  const { data } = await supabase
    .from("newsletters")
    .insert({ titre: { fr: "", nl: "", en: "" }, blocs: [{ id: crypto.randomUUID(), type: "texte", textes: { fr: "", nl: "", en: "" } }] })
    .select("id")
    .single<{ id: string }>();
  if (data) redirect(`/admin/newsletter/${data.id}`);
  redirect("/admin/newsletter");
}

export async function enregistrer(id: string, titre: Textes, blocs: Bloc[]): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier la newsletter." };
  const { data: actuel } = await supabase.from("newsletters").select("statut").eq("id", id).maybeSingle<{ statut: string }>();
  if (!actuel) return { erreur: "Numéro introuvable." };
  const propre = { titre: nettoyerTextes(titre, 200), blocs: nettoyerBlocs(blocs) };
  if (actuel.statut === "publiee" && languesManquantes(propre).length)
    return { erreur: "Ce numéro est publié : les trois langues doivent rester complètes." };
  const { error } = await supabase.from("newsletters").update({ ...propre, modifiee_le: new Date().toISOString() }).eq("id", id);
  if (error) return { erreur: "L'enregistrement a échoué." };
  if (actuel.statut === "publiee") updateTag("newsletters");
  return { ok: "Enregistré." };
}

/** Propose une traduction du français vers `vers`, pour le titre et chaque bloc (à relire avant publication). */
export async function proposerTraduction(titre: Textes, blocs: Bloc[], vers: "nl" | "en"): Promise<{ titre?: string; blocs?: string[]; erreur?: string }> {
  const { refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier la newsletter." };
  const sources = [titre.fr ?? "", ...blocs.map((b) => b.textes.fr ?? "")].map((t) => t.slice(0, 4000));
  if (!sources.some((t) => t.trim())) return { erreur: "Écrivez d'abord la version française." };
  try {
    const resultat = await traduireDeepL(sources.map((t) => t || " "), vers);
    if (!resultat) return { erreur: "La traduction automatique n'est pas encore branchée (clé DeepL à saisir dans Vercel)." };
    const nettoye = resultat.map((t, i) => (sources[i].trim() ? t : ""));
    return { titre: nettoye[0], blocs: nettoye.slice(1) };
  } catch {
    return { erreur: "Le service de traduction n'a pas répondu. Réessayez plus tard." };
  }
}

export async function publier(id: string): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de publier." };
  const { data: n } = await supabase.from("newsletters").select("id, numero, titre, blocs, statut").eq("id", id).maybeSingle<Numero>();
  if (!n) return { erreur: "Numéro introuvable." };
  if (n.statut === "publiee") return { ok: "Déjà publié." };
  const manquantes = languesManquantes(n);
  if (manquantes.length) return { erreur: `Publication bloquée : à compléter en ${manquantes.map((l) => l.toUpperCase()).join(", ")}.` };
  let numero = n.numero;
  if (!numero) {
    const { data: dernier } = await supabase.from("newsletters").select("numero").not("numero", "is", null)
      .order("numero", { ascending: false }).limit(1).maybeSingle<{ numero: number }>();
    numero = (dernier?.numero ?? 0) + 1;
  }
  const { error } = await supabase.from("newsletters")
    .update({ statut: "publiee", numero, publiee_le: new Date().toISOString() }).eq("id", id);
  if (error) return { erreur: "La publication a échoué." };
  updateTag("newsletters");
  return { ok: `Numéro ${numero} publié sur le site. (L'envoi par e-mail sera branché avec la liste Mailjet.)` };
}

export async function supprimerBrouillon(id: string) {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) redirect("/admin");
  // La base refuse de supprimer un numéro publié (sauf administrateur) : ici on ne supprime que les brouillons.
  await supabase.from("newsletters").delete().eq("id", id).eq("statut", "brouillon");
  redirect("/admin/newsletter");
}
