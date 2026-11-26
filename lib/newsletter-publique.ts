// Lecture des numéros de newsletter publiés, pour les pages publiques du site (côté serveur uniquement).
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Numero } from "@/lib/newsletter";

function clientPublic() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
const configure = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** Numéros publiés (le public ne voit que ceux-là : règle de la base). Mis en cache, rafraîchi à chaque publication. */
export async function numerosPublies(): Promise<Numero[]> {
  "use cache";
  cacheTag("newsletters");
  cacheLife("hours");
  if (!configure()) return [];
  const { data } = await clientPublic()
    .from("newsletters")
    .select("id, numero, titre, blocs, statut, publiee_le, modifiee_le")
    .eq("statut", "publiee")
    .order("numero", { ascending: false })
    .returns<Numero[]>();
  return data ?? [];
}
