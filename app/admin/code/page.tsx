import { Suspense } from "react";
import { redirect } from "next/navigation";
import { clientSupabase, supabaseConfigure } from "@/lib/supabase/serveur";
import FormulaireCode from "./FormulaireCode";

export const metadata = { title: "Deuxième vérification" };

export default function Code() {
  return (
    <main className="admin-centre">
      <div className="admin-carte">
        <h1>Deuxième vérification</h1>
        <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
          <EtapeCode />
        </Suspense>
      </div>
    </main>
  );
}

async function EtapeCode() {
  if (!supabaseConfigure()) redirect("/admin/non-configure");
  const supabase = await clientSupabase();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/admin/connexion");
  const { data: niveau } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (niveau?.currentLevel === "aal2") redirect("/admin");
  const { data: facteurs } = await supabase.auth.mfa.listFactors();
  const dejaRelie = Boolean(facteurs?.totp.some((f) => f.status === "verified"));
  return <FormulaireCode premiereFois={!dejaRelie} />;
}
