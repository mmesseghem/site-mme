// Lecture des activités publiées, pour les pages publiques du site (côté serveur uniquement).
// Mis en cache, rafraîchi à chaque publication depuis l'espace d'administration (étiquette « planning »).
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { lireActivite, type Activite, type Categorie } from "@/lib/planning";
import { exemplesPlanning } from "@/lib/planning-exemples";

export type DonneesPlanning = { activites: Activite[]; categories: Categorie[]; exemple: boolean };

const configure = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
// Les données d'exemple ne s'affichent JAMAIS sur le site en ligne : seulement en local et sur les liens de prévisualisation,
// tant que la base n'a pas encore la structure du planning (fichier 0002_planning.sql pas encore exécuté).
const exemplesPermis = () => process.env.VERCEL_ENV !== "production";

export async function planningPublie(): Promise<DonneesPlanning> {
  "use cache";
  cacheTag("planning");
  cacheLife("hours");
  if (!configure()) return exemplesPermis() ? { ...exemplesPlanning(), exemple: true } : { activites: [], categories: [], exemple: false };
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // Le public ne voit que les activités publiées (règle de la base) ; on le redemande quand même.
  const [a, c] = await Promise.all([
    client.from("activites").select("id, titre, description, blocs, categorie_id, public_vise, lieu_type, lieu, gratuit, prix, heure_debut, heure_fin, repetition, pauses, exceptions, premiere_date, derniere_date, vitrine, publiee")
      .eq("publiee", true).order("premiere_date").returns<Activite[]>(),
    client.from("categories_activites").select("id, nom, couleur, icone, ordre, masquee").order("ordre").returns<Categorie[]>(),
  ]);
  if (a.error || c.error) return exemplesPermis() ? { ...exemplesPlanning(), exemple: true } : { activites: [], categories: [], exemple: false };
  return { activites: (a.data ?? []).map(lireActivite), categories: c.data ?? [], exemple: false };
}
