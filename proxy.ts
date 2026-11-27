// Rafraîchit la session de connexion de l'espace d'administration à chaque visite d'une page /admin.
// La sécurité ne repose pas sur ce fichier : chaque page et chaque action revérifient la personne connectée.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let reponse = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !cle) return reponse;
  const supabase = createServerClient(url, cle, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (aEcrire) => {
        for (const { name, value } of aEcrire) request.cookies.set(name, value);
        reponse = NextResponse.next({ request });
        for (const { name, value, options } of aEcrire) reponse.cookies.set(name, value, options);
      },
    },
  });
  await supabase.auth.getUser();
  return reponse;
}

export const config = { matcher: ["/admin/:path*"] };
