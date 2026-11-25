import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site";
import type { Dictionnaire } from "@/content/dictionnaires";

type Props = { lang: Locale; dict: Dictionnaire };

export default function PiedDePage({ lang, dict }: Props) {
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
            <li>
              <Link href={href(lang, "/pratique/demande-medicaments")}>{dict.pratique["demande-medicaments"]}</Link>
            </li>
            <li>
              <Link href={href(lang, "/pratique/faq")}>{dict.pratique.faq}</Link>
            </li>
            <li>
              <Link href={href(lang, "/contact")}>{dict.nav.contact}</Link>
            </li>
          </ul>
        </nav>
        <nav className="pied-colonne" aria-label={dict.pied.colMaison}>
          <span className="pied-titre">{dict.pied.colMaison}</span>
          <ul>
            <li>
              <Link href={href(lang, "/philosophie")}>{dict.maison.philosophie}</Link>
            </li>
            <li>
              <Link href={href(lang, "/historique")}>{dict.maison.historique}</Link>
            </li>
            <li>
              <Link href={href(lang, "/offres-emploi")}>{dict.maison["offres-emploi"]}</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap pied-bas">
        © {dict.pied.asbl} · <Link href={href(lang, "/confidentialite")}>{dict.maison.confidentialite}</Link>
      </div>
    </footer>
  );
}
