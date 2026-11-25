"use client";

// En-tête du site : bandeau d'infos, choix de la langue, menu principal (ordinateur et téléphone).
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, locales, type Locale } from "@/lib/i18n";
import { actions, contact, equipe, pratique } from "@/lib/site";
import type { Dictionnaire } from "@/content/dictionnaires";

type Props = {
  lang: Locale;
  dict: Pick<Dictionnaire, "commun" | "nav" | "poles" | "pratique" | "actions">;
};

type Groupe = "equipe" | "pratique" | "actions";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function EnTete({ lang, dict }: Props) {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState<Groupe | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Ferme les sous-menus au clic à l'extérieur ou avec la touche Échap.
  useEffect(() => {
    function clic(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOuvert(null);
    }
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOuvert(null);
        setMobile(false);
      }
    }
    document.addEventListener("click", clic);
    document.addEventListener("keydown", touche);
    return () => {
      document.removeEventListener("click", clic);
      document.removeEventListener("keydown", touche);
    };
  }, []);

  // Ferme les menus quand on change de page.
  const [cheminPrecedent, setCheminPrecedent] = useState(chemin);
  if (chemin !== cheminPrecedent) {
    setCheminPrecedent(chemin);
    setOuvert(null);
    setMobile(false);
  }

  // Même page, autre langue : /fr/contact -> /nl/contact
  const versLangue = (l: Locale) => chemin.replace(/^\/(fr|nl|en)(?=\/|$)/, `/${l}`);

  const groupes: { cle: Groupe; titre: string; liens: { href: string; texte: string }[] }[] = [
    {
      cle: "equipe",
      titre: dict.nav.equipe,
      liens: equipe.map((s) => ({ href: href(lang, `/equipe/${s}`), texte: dict.poles[s] })),
    },
    {
      cle: "pratique",
      titre: dict.nav.pratique,
      liens: pratique.map((s) => ({ href: href(lang, `/pratique/${s}`), texte: dict.pratique[s] })),
    },
    {
      cle: "actions",
      titre: dict.nav.actions,
      liens: actions.map((s) => ({ href: href(lang, `/actions/${s}`), texte: dict.actions[s] })),
    },
  ];

  return (
    <>
      <div className="bandeau">
        <div className="wrap">
          <div className="bandeau-infos">
            <span>
              {contact.rue}, {contact.ville}
            </span>
            <span>{dict.commun.horairesCourts}</span>
            <span>{dict.commun.gardeCourte}</span>
          </div>
          <ul className="langues" aria-label={dict.commun.choisirLangue}>
            {locales.map((l) => (
              <li key={l}>
                <Link href={versLangue(l)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}>
                  {l.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header className="entete">
        <div className="wrap entete-barre">
          <Link href={href(lang)} className="marque">
            <Image src="/images/logo-mme-symbole.png" alt="" width={570} height={350} priority />
            <span className="marque-texte">
              <span>Maison Médicale</span>
              <span>Esseghem</span>
            </span>
          </Link>

          <nav ref={navRef} className="nav-bureau" aria-label={dict.nav.principal}>
            <Link href={href(lang)}>{dict.nav.accueil}</Link>
            {groupes.map((g) => (
              <div className="nav-groupe" key={g.cle}>
                <button
                  type="button"
                  className="nav-bouton"
                  aria-expanded={ouvert === g.cle}
                  aria-controls={`sous-menu-${g.cle}`}
                  onClick={() => setOuvert(ouvert === g.cle ? null : g.cle)}
                >
                  {g.titre} <Chevron />
                </button>
                {ouvert === g.cle && (
                  <ul className="sous-menu" id={`sous-menu-${g.cle}`}>
                    {g.liens.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.texte}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link href={href(lang, "/contact")}>{dict.nav.contact}</Link>
            <a href={contact.telephoneLien} className="bouton-tel" aria-label={`${dict.nav.appeler} : ${contact.telephone}`}>
              {contact.telephone}
            </a>
          </nav>

          <button
            type="button"
            className="burger"
            aria-expanded={mobile}
            aria-controls="menu-mobile"
            aria-label={mobile ? dict.nav.fermerMenu : dict.nav.ouvrirMenu}
            onClick={() => setMobile(!mobile)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {mobile ? (
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {mobile && (
          <nav id="menu-mobile" className="nav-mobile" aria-label={dict.nav.principal}>
            <ul>
              <li>
                <Link href={href(lang)}>{dict.nav.accueil}</Link>
              </li>
            </ul>
            {groupes.map((g) => (
              <div key={g.cle}>
                <span className="nav-mobile-titre">{g.titre}</span>
                <ul>
                  {g.liens.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.texte}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul>
              <li>
                <Link href={href(lang, "/contact")}>{dict.nav.contact}</Link>
              </li>
              <li>
                <a href={contact.telephoneLien}>
                  {dict.nav.appeler} : {contact.telephone}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
