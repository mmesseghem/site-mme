// Arrivée depuis le lien reçu par e-mail (connexion ou invitation).
// Le modèle d'e-mail Supabase doit pointer ici avec token_hash (voir le guide de mise en route).
import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { clientSupabase, supabaseConfigure } from "@/lib/supabase/serveur";

const typesAcceptes: EmailOtpType[] = ["email", "magiclink", "invite"];

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const vers = (chemin: string) => NextResponse.redirect(new URL(chemin, url.origin));
  if (!supabaseConfigure()) return vers("/admin/non-configure");

  const supabase = await clientSupabase();
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");

  if (tokenHash && type && typesAcceptes.includes(type)) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return vers("/admin/code");
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return vers("/admin/code");
  }
  return vers("/admin/connexion?lien=1");
}
