import { Suspense } from "react";
import { exigerSession, libellesRoles, type Profil } from "@/lib/admin/session";
import { clientService, serviceConfigure } from "@/lib/supabase/service";
import { basculerActif } from "../../actions";
import FormulaireInvitation from "./FormulaireInvitation";

export const metadata = { title: "Comptes" };

export default function Page() {
  return (
    <>
      <h1>Comptes</h1>
      <p className="admin-aide">
        Personne ne peut créer son propre compte : seul l&apos;administrateur invite. Un compte désactivé ne voit plus rien,
        immédiatement.
      </p>
      <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
        <Liste />
      </Suspense>
    </>
  );
}

async function Liste() {
  const { supabase, profil: moi, refuse } = await exigerSession(["administrateur"]);
  if (refuse) return <p className="admin-erreur">Accès réservé à l&apos;administrateur.</p>;
  const { data: profils } = await supabase.from("profils").select("id, nom, role, actif").order("cree_le").returns<Profil[]>();
  const emails = new Map<string, string>();
  if (serviceConfigure()) {
    const { data } = await clientService().auth.admin.listUsers({ perPage: 200 });
    for (const u of data?.users ?? []) emails.set(u.id, u.email ?? "");
  }
  return (
    <>
      <div className="admin-liste">
        {(profils ?? []).map((p) => (
          <div className="admin-ligne" key={p.id}>
            <span>
              <strong>{p.nom}</strong> {emails.get(p.id) ? `· ${emails.get(p.id)}` : ""}
              <br />
              <span className="admin-petit">
                {libellesRoles[p.role]} · {p.actif ? "actif" : "désactivé"}
              </span>
            </span>
            {p.id !== moi.id && (
              <form action={basculerActif}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="admin-bouton-contour">
                  {p.actif ? "Désactiver" : "Réactiver"}
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
      <h2>Ajouter une personne</h2>
      <FormulaireInvitation />
    </>
  );
}
