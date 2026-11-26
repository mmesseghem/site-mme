import { Suspense } from "react";
import { exigerSession } from "@/lib/admin/session";

export const metadata = { title: "Planning" };

export default function Page() {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Contenu />
    </Suspense>
  );
}

async function Contenu() {
  await exigerSession();
  return (
    <>
      <h1>Planning</h1>
      <p className="admin-message">{"La gestion du planning des activités (ajout, places, liste d'attente, inscriptions) suivra l'éditeur de newsletter."}</p>
    </>
  );
}
