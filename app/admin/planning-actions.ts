"use server";
// Actions du planning (rôles « contenu » et « administrateur »). Revérifiées côté serveur à chaque appel.
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { exigerSession } from "@/lib/admin/session";
import { nettoyerBlocs, nettoyerTextes } from "@/lib/admin/nettoyage";
import { traduire as traduireDeepL } from "@/lib/traduction";
import { langues, type Textes } from "@/lib/newsletter";
import {
  bornes, estDate, estHeure, languesManquantesActivite, maintenantBruxelles, regleParDefaut, seances, MAX_SEANCES,
  type Activite, type Categorie, type Couleur, type Exception, type Pause, type Repetition,
} from "@/lib/planning";
import { iconesCategories } from "@/components/IconesPlanning";

const rolesEdition = ["administrateur", "contenu"] as const;
export type Resultat = { ok?: string; erreur?: string };

const COLONNES = "id, titre, description, blocs, categorie_id, public_vise, lieu_type, lieu, gratuit, prix, heure_debut, heure_fin, repetition, pauses, exceptions, premiere_date, derniere_date, vitrine, temps_fort, annonce_des, inscription_requise, infos_inscription, inscription_avant, places, publiee, modifiee_le";
const texteCourt = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");
const heure = (s: unknown) => (typeof s === "string" && estHeure(s.slice(0, 5)) ? s.slice(0, 5) : null);

// ---------- Nettoyage ----------
function nettoyerRepetition(x: unknown): Repetition | null {
  const r = (x ?? {}) as Partial<Repetition>;
  if (!estDate(r.premier)) return null;
  const frequence = r.frequence === "semaine" || r.frequence === "mois" ? r.frequence : "une";
  const jours = Array.isArray(r.jours) ? [...new Set(r.jours.filter((j) => Number.isInteger(j) && j >= 0 && j <= 6))] : [];
  const fin = r.fin?.type === "date" && estDate(r.fin.date)
    ? { type: "date" as const, date: r.fin.date }
    : { type: "nombre" as const, n: Math.max(1, Math.min(MAX_SEANCES, Math.round(Number((r.fin as { n?: number })?.n) || 1))) };
  return {
    premier: r.premier, frequence,
    intervalle: Math.max(1, Math.min(12, Math.round(Number(r.intervalle) || 1))),
    jours, mensuel: r.mensuel === "date" ? "date" : "rang", fin,
  };
}

function nettoyerPauses(x: unknown): Pause[] {
  if (!Array.isArray(x)) return [];
  return x.slice(0, 20).flatMap((p) => (estDate(p?.du) && estDate(p?.au) && p.du <= p.au ? [{ du: p.du, au: p.au }] : []));
}

function nettoyerExceptions(x: unknown): Exception[] {
  if (!Array.isArray(x)) return [];
  return x.slice(0, MAX_SEANCES).flatMap((e): Exception[] => {
    if (!estDate(e?.date)) return [];
    if (e.annulee) return [{ date: e.date, annulee: true }];
    const r: Exception = { date: e.date };
    if (estDate(e.nouvelle_date) && e.nouvelle_date !== e.date) r.nouvelle_date = e.nouvelle_date;
    const hd = heure(e.heure_debut), hf = heure(e.heure_fin);
    if (hd) r.heure_debut = hd;
    if (hf) r.heure_fin = hf;
    const lieu = texteCourt(e.lieu, 200);
    if (lieu) r.lieu = lieu;
    return Object.keys(r).length > 1 ? [r] : [];
  });
}

type DonneesActivite = Omit<Activite, "id" | "premiere_date" | "derniere_date" | "publiee" | "modifiee_le">;

function nettoyerActivite(a: Partial<DonneesActivite>): { propre?: DonneesActivite & { premiere_date: string | null; derniere_date: string | null }; erreur?: string } {
  const repetition = nettoyerRepetition(a.repetition);
  if (!repetition) return { erreur: "Choisissez le premier jour de l'activité." };
  if (repetition.frequence === "semaine" && !repetition.jours.length) return { erreur: "Cochez au moins un jour de la semaine." };
  const heure_debut = heure(a.heure_debut);
  if (!heure_debut) return { erreur: "Indiquez l'heure de début." };
  const heure_fin = heure(a.heure_fin);
  if (heure_fin && heure_fin <= heure_debut) return { erreur: "L'heure de fin doit être après l'heure de début." };
  const propre = {
    titre: nettoyerTextes(a.titre, 200),
    description: nettoyerTextes(a.description, 300),
    blocs: nettoyerBlocs(a.blocs),
    categorie_id: typeof a.categorie_id === "string" && /^[0-9a-f-]{36}$/.test(a.categorie_id) ? a.categorie_id : null,
    public_vise: nettoyerTextes(a.public_vise, 120),
    lieu_type: a.lieu_type === "ailleurs" ? ("ailleurs" as const) : ("mme" as const),
    lieu: texteCourt(a.lieu, 200) || null,
    gratuit: a.gratuit !== false,
    prix: a.gratuit === false ? texteCourt(a.prix, 60) || null : null,
    heure_debut, heure_fin, repetition,
    pauses: nettoyerPauses(a.pauses),
    exceptions: nettoyerExceptions(a.exceptions),
    vitrine: a.vitrine !== false,
    temps_fort: Boolean(a.temps_fort),
    annonce_des: a.temps_fort && estDate(a.annonce_des) ? a.annonce_des : null,
    inscription_requise: Boolean(a.inscription_requise),
    infos_inscription: a.inscription_requise ? nettoyerTextes(a.infos_inscription, 300) : nettoyerTextes({}, 0),
    inscription_avant: a.inscription_requise && estDate(a.inscription_avant) ? a.inscription_avant : null,
    places: a.inscription_requise && Number(a.places) >= 1 ? Math.min(10000, Math.round(Number(a.places))) : null,
  };
  if (propre.lieu_type === "ailleurs" && !propre.lieu) return { erreur: "Indiquez l'adresse ou le point de rendez-vous." };
  const { premiere, derniere } = bornes(propre);
  return { propre: { ...propre, premiere_date: premiere, derniere_date: derniere } };
}

// ---------- Activités ----------
export async function creerActivite() {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) redirect("/admin/planning");
  const aujourdhui = maintenantBruxelles().date;
  const vide = { fr: "", nl: "", en: "" };
  const { data } = await supabase.from("activites").insert({
    titre: vide, description: vide, public_vise: vide, infos_inscription: vide, temps_fort: true,
    blocs: [{ id: crypto.randomUUID(), type: "texte", textes: vide }],
    repetition: regleParDefaut(aujourdhui), premiere_date: aujourdhui, derniere_date: aujourdhui,
  }).select("id").single<{ id: string }>();
  redirect(data ? `/admin/planning/${data.id}` : "/admin/planning");
}

export async function enregistrerActivite(id: string, donnees: Partial<DonneesActivite>): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier le planning." };
  const { data: actuel } = await supabase.from("activites").select("publiee").eq("id", id).maybeSingle<{ publiee: boolean }>();
  if (!actuel) return { erreur: "Activité introuvable." };
  const { propre, erreur } = nettoyerActivite(donnees);
  if (!propre) return { erreur };
  if (actuel.publiee) {
    if (languesManquantesActivite(propre).length) return { erreur: "Cette activité est publiée : les trois langues doivent rester complètes." };
    if (!seances(propre).length) return { erreur: "Cette activité est publiée : elle doit garder au moins une séance." };
  }
  const { error } = await supabase.from("activites").update({ ...propre, modifiee_le: new Date().toISOString() }).eq("id", id);
  if (error) return { erreur: "L'enregistrement a échoué." };
  if (actuel.publiee) updateTag("planning");
  return { ok: "Enregistré." };
}

export async function publierActivite(id: string, publier: boolean): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de publier." };
  const { data: a } = await supabase.from("activites").select(COLONNES).eq("id", id).maybeSingle<Activite>();
  if (!a) return { erreur: "Activité introuvable." };
  if (publier) {
    const manquantes = languesManquantesActivite(a);
    if (manquantes.length) return { erreur: `Publication bloquée : à compléter en ${manquantes.map((l) => l.toUpperCase()).join(", ")}.` };
    if (!seances(a).length) return { erreur: "Publication bloquée : aucune séance (vérifiez la répétition et les pauses)." };
  }
  const { error } = await supabase.from("activites").update({ publiee: publier }).eq("id", id);
  if (error) return { erreur: "L'opération a échoué." };
  updateTag("planning");
  return { ok: publier ? "Publiée sur le site." : "Retirée du site (elle reste ici en brouillon)." };
}

export async function supprimerActivite(id: string) {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) redirect("/admin/planning");
  // Garde-fou : une activité publiée doit d'abord être retirée du site.
  await supabase.from("activites").delete().eq("id", id).eq("publiee", false);
  redirect("/admin/planning");
}

/** Propose une traduction du français vers `vers` pour une liste de textes (à relire avant publication). */
export async function proposerTraductionPlanning(sources: string[], vers: "nl" | "en"): Promise<{ textes?: string[]; erreur?: string }> {
  const { refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier le planning." };
  const propres = sources.slice(0, 60).map((t) => (typeof t === "string" ? t.slice(0, 4000) : ""));
  if (!propres.some((t) => t.trim())) return { erreur: "Écrivez d'abord la version française." };
  try {
    const r = await traduireDeepL(propres.map((t) => t || " "), vers);
    if (!r) return { erreur: "La traduction automatique n'est pas encore branchée (clé DeepL à saisir dans Vercel)." };
    return { textes: r.map((t, i) => (propres[i].trim() ? t : "")) };
  } catch {
    return { erreur: "Le service de traduction n'a pas répondu. Réessayez plus tard." };
  }
}

// ---------- Catégories ----------
export async function enregistrerCategorie(c: Partial<Categorie> & { id?: string }): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier les catégories." };
  const nom: Textes = nettoyerTextes(c.nom, 60);
  const manquantes = langues.filter((l) => !nom[l].trim());
  if (manquantes.length) return { erreur: `Nom à compléter en ${manquantes.map((l) => l.toUpperCase()).join(", ")}.` };
  const couleur: Couleur = c.couleur === "vert" || c.couleur === "gris" ? c.couleur : "bordeaux";
  const icone = iconesCategories.some((i) => i.cle === c.icone) ? c.icone! : "etoile";
  const ligne = { nom, couleur, icone, ordre: Math.max(0, Math.min(999, Math.round(Number(c.ordre) || 0))), masquee: Boolean(c.masquee) };
  const { error } = c.id && /^[0-9a-f-]{36}$/.test(c.id)
    ? await supabase.from("categories_activites").update(ligne).eq("id", c.id)
    : await supabase.from("categories_activites").insert(ligne);
  if (error) return { erreur: "L'enregistrement a échoué." };
  updateTag("planning");
  return { ok: "Catégorie enregistrée." };
}

export async function supprimerCategorie(id: string): Promise<Resultat> {
  const { supabase, refuse } = await exigerSession([...rolesEdition]);
  if (refuse) return { erreur: "Votre rôle ne permet pas de modifier les catégories." };
  const { count } = await supabase.from("activites").select("id", { count: "exact", head: true }).eq("categorie_id", id);
  if (count) return { erreur: `Catégorie utilisée par ${count} activité${count > 1 ? "s" : ""} : masquez-la plutôt.` };
  const { error } = await supabase.from("categories_activites").delete().eq("id", id);
  if (error) return { erreur: "La suppression a échoué." };
  updateTag("planning");
  return { ok: "Catégorie supprimée." };
}
