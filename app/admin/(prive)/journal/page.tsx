import { Suspense } from "react";
import { exigerSession } from "@/lib/admin/session";

export const metadata = { title: "Journal" };

const dateHeure = new Intl.DateTimeFormat("fr-BE", { dateStyle: "short", timeStyle: "medium", timeZone: "Europe/Brussels" });

export default function Page() {
  return (
    <>
      <h1>Journal des actions</h1>
      <p className="admin-aide">Les 200 dernières actions. Personne ne peut modifier ce journal, pas même l&apos;administrateur.</p>
      <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
        <Liste />
      </Suspense>
    </>
  );
}

async function Liste() {
  const { supabase, refuse } = await exigerSession(["administrateur"]);
  if (refuse) return <p className="admin-erreur">Accès réservé à l&apos;administrateur.</p>;
  const [{ data: lignes }, { data: profils }] = await Promise.all([
    supabase.from("journal").select("id, quand, qui, action").order("id", { ascending: false }).limit(200)
      .returns<{ id: number; quand: string; qui: string | null; action: string }[]>(),
    supabase.from("profils").select("id, nom").returns<{ id: string; nom: string }[]>(),
  ]);
  const noms = new Map((profils ?? []).map((p) => [p.id, p.nom]));
  if (!lignes?.length) return <p className="admin-message">Aucune action pour l&apos;instant.</p>;
  return (
    <div className="admin-liste">
      {lignes.map((l) => (
        <div className="admin-ligne" key={l.id}>
          <span>
            <strong>{dateHeure.format(new Date(l.quand))}</strong> · {l.qui ? noms.get(l.qui) ?? "compte supprimé" : "système"} ·{" "}
            {l.action}
          </span>
        </div>
      ))}
    </div>
  );
}
