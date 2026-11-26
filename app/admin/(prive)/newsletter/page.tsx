import { Suspense } from "react";
import { exigerSession } from "@/lib/admin/session";

export const metadata = { title: "Newsletter" };

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
      <h1>Newsletter</h1>
      <p className="admin-message">{"L'éditeur de newsletter (blocs aux couleurs de la MME, trois langues, traduction DeepL, aperçu, publication sur le site et envoi Mailjet) est la prochaine étape de construction."}</p>
    </>
  );
}
