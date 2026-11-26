import { Suspense } from "react";
import Link from "next/link";
import { exigerSession } from "@/lib/admin/session";
import { languesManquantes, type Numero } from "@/lib/newsletter";
import { creerNumero } from "../../newsletter-actions";

export const metadata = { title: "Newsletter" };
const date = new Intl.DateTimeFormat("fr-BE", { dateStyle: "short", timeZone: "Europe/Brussels" });

export default function Page() {
  return (
    <>
      <h1>Newsletter</h1>
      <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
        <Liste />
      </Suspense>
    </>
  );
}

async function Liste() {
  const { supabase, refuse } = await exigerSession();
  const { data } = await supabase.from("newsletters")
    .select("id, numero, titre, blocs, statut, publiee_le, modifiee_le")
    .order("modifiee_le", { ascending: false }).returns<Numero[]>();
  return (
    <>
      {!refuse && (
        <form action={creerNumero}>
          <button type="submit" className="admin-bouton" style={{ alignSelf: "flex-start" }}>+ Nouveau numéro</button>
        </form>
      )}
      {!data?.length ? (
        <p className="admin-message">Aucun numéro pour l&apos;instant.</p>
      ) : (
        <div className="admin-liste">
          {data.map((n) => {
            const manque = languesManquantes(n);
            return (
              <div className="admin-ligne" key={n.id}>
                <span>
                  <strong>{n.numero ? `N° ${n.numero} · ` : ""}{n.titre.fr || "(sans titre)"}</strong>
                  <br />
                  <span className="admin-petit">
                    {n.statut === "publiee" ? `Publié le ${date.format(new Date(n.publiee_le!))}` : `Brouillon, modifié le ${date.format(new Date(n.modifiee_le))}`}
                    {manque.length ? ` · à compléter : ${manque.map((l) => l.toUpperCase()).join(", ")}` : " · FR NL EN prêts"}
                  </span>
                </span>
                <Link className="admin-bouton-contour" href={`/admin/newsletter/${n.id}`}>{refuse ? "Voir" : "Ouvrir"}</Link>
              </div>
            );
          })}
        </div>
      )}
      <p className="admin-petit">Les inscrits et les désinscriptions sont gérés par Mailjet : aucune adresse n&apos;est gardée ici.</p>
    </>
  );
}
