// Page affichée quand une adresse n'existe pas (message dans les trois langues).
import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <section className="wrap section">
      <h1 className="titre-page">Page introuvable</h1>
      <div className="encadre" style={{ marginTop: 32 }}>
        <p>Cette page n&apos;existe pas ou a été déplacée.</p>
        <p lang="nl">Deze pagina bestaat niet of werd verplaatst.</p>
        <p lang="en">This page does not exist or has been moved.</p>
        <p>
          <Link href="/fr">Accueil</Link> · <Link href="/nl" lang="nl">Home</Link> ·{" "}
          <Link href="/en" lang="en">Home</Link>
        </p>
      </div>
    </section>
  );
}
