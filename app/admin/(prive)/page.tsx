import { Suspense } from "react";
import Link from "next/link";
import { exigerSession } from "@/lib/admin/session";

export const metadata = { title: "Accueil" };

export default function Accueil() {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Tableau />
    </Suspense>
  );
}

async function Tableau() {
  const { profil } = await exigerSession();
  const admin = profil.role === "administrateur";
  return (
    <>
      <h1>Bonjour {profil.nom}</h1>
      <div className="admin-tuiles">
        <Link className="admin-tuile" href="/admin/newsletter">
          <span className="admin-surtitre">NEWSLETTER</span>
          <strong>Écrire et publier</strong>
          <span className="admin-petit">En trois langues, sur le site et par e-mail.</span>
        </Link>
        <Link className="admin-tuile" href="/admin/planning">
          <span className="admin-surtitre">PLANNING</span>
          <strong>Activités</strong>
          <span className="admin-petit">Ajouter une activité, gérer les places.</span>
        </Link>
        {admin && (
          <Link className="admin-tuile" href="/admin/medicaments">
            <span className="admin-surtitre">MÉDICAMENTS</span>
            <strong>Copie de secours</strong>
            <span className="admin-petit">Retrouver une demande des 30 derniers jours.</span>
          </Link>
        )}
        {admin && (
          <Link className="admin-tuile" href="/admin/comptes">
            <span className="admin-surtitre">COMPTES</span>
            <strong>Inviter, désactiver</strong>
            <span className="admin-petit">Qui peut entrer, et avec quel rôle.</span>
          </Link>
        )}
      </div>
    </>
  );
}
