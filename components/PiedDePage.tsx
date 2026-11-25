import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site";
import type { Dictionnaire } from "@/content/dictionnaires";

type Props = { lang: Locale; dict: Dictionnaire };

export default function PiedDePage({ lang, dict }: Props) {
  const pratique = [
    { href: "/pratique/demande-medicaments", texte: dict.pratique["demande-medicaments"] },
    { href: "/pratique/inscription", texte: dict.pratique.inscription },
    { href: "/pratique/faq", texte: dict.pratique.faq },
    { href: "/pratique/newsletter", texte: dict.pratique.newsletter },
    { href: "/contact", texte: dict.nav.contact },
  ];
  const maison = [
    { href: "/equipe", texte: dict.maison.equipe },
    { href: "/philosophie", texte: dict.maison.philosophie },
    { href: "/historique", texte: dict.maison.historique },
    { href: "/offres-emploi", texte: dict.maison["offres-emploi"] },
  ];

  return (
    <footer className="pied">
      <div className="wrap pied-colonnes">
        <div className="pied-colonne">
          <span className="pied-nom">{dict.commun.nomComplet}</span>
          <span>
            {contact.rue}, {contact.ville}
          </span>
          <span>
            <a href={contact.telephoneLien}>{contact.telephone}</a> ·{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </span>
          <span>{dict.pied.garde}</span>
        </div>
        <nav className="pied-colonne" aria-label={dict.pied.colPratique}>
          <span className="pied-titre">{dict.pied.colPratique}</span>
          <ul>
            {pratique.map((l) => (
              <li key={l.href}>
                <Link href={href(lang, l.href)}>{l.texte}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="pied-colonne" aria-label={dict.pied.colMaison}>
          <span className="pied-titre">{dict.pied.colMaison}</span>
          <ul>
            {maison.map((l) => (
              <li key={l.href}>
                <Link href={href(lang, l.href)}>{l.texte}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap pied-bas">
        © {dict.pied.asbl} · <Link href={href(lang, "/confidentialite")}>{dict.maison.confidentialite}</Link>
      </div>
    </footer>
  );
}
