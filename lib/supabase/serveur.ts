// Connexion à la base de données Supabase, côté serveur, au nom de la personne connectée.
// Les règles de sécurité de la base (voir supabase/migrations) s'appliquent : chacun ne voit que ce que son rôle permet.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Vrai si les réglages Supabase sont saisis dans Vercel. */
export function supabaseConfigure(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function clientSupabase() {
  const magasin = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => magasin.getAll(),
      setAll: (aEcrire) => {
        try {
          for (const { name, value, options } of aEcrire) magasin.set(name, value, options);
        } catch {
          // Appelé depuis une page (lecture seule) : le « proxy » se charge de rafraîchir la session.
        }
      },
    },
  });
}
