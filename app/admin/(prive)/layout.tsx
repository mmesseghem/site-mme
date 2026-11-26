import { Suspense } from "react";
import Link from "next/link";
import { exigerSession } from "@/lib/admin/session";
import { seDeconnecter } from "../actions";

// Cadre commun des pages protégées : barre du haut et menu selon le rôle.
// Chaque page revérifie elle-même la personne connectée.
export default function CadrePrive({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="admin-barre"><strong>MME · ADMINISTRATION</strong></div>}>
        <Barre />
      </Suspense>
      <div className="admin-corps">
        <Suspense fallback={<nav className="admin-menu" aria-label="Menu" />}>
          <Menu />
        </Suspense>
        <main className="admin-contenu">{children}</main>
      </div>
    </>
  );
}

async function Barre() {
  const { profil } = await exigerSession();
  return (
    <div className="admin-barre">
      <strong>MME · ADMINISTRATION</strong>
      <form action={seDeconnecter}>
        <span>Connecté·e : {profil.nom}</span>
        <button type="submit">Se déconnecter</button>
      </form>
    </div>
  );
}

async function Menu() {
  const { profil } = await exigerSession();
  const admin = profil.role === "administrateur";
  return (
    <nav className="admin-menu" aria-label="Menu">
      <Link href="/admin">Accueil</Link>
      <Link href="/admin/newsletter">Newsletter</Link>
      <Link href="/admin/planning">Planning</Link>
      {admin && <Link href="/admin/medicaments">Demandes de médicaments</Link>}
      {admin && <Link href="/admin/comptes">Comptes</Link>}
      {admin && <Link href="/admin/journal">Journal</Link>}
    </nav>
  );
}
