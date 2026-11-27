// Affiche les blocs d'une page de contenu (voir content/pages/types.ts).
import Image from "next/image";
import Link from "next/link";
import type { Bloc } from "@/content/pages/types";
import { href, type Locale } from "@/lib/i18n";

const libelleVerifier: Record<Locale, string> = {
  fr: "à vérifier",
  nl: "te controleren",
  en: "to be checked",
};

function AVerifier({ lang }: { lang: Locale }) {
  return <span className="a-verifier">{libelleVerifier[lang]}</span>;
}

export default function Contenu({ blocs, lang }: { blocs: Bloc[]; lang: Locale }) {
  return (
    <div className="contenu">
      {blocs.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                {b.texte}
                {b.verifier && <AVerifier lang={lang} />}
              </p>
            );
          case "h2":
            return <h2 key={i}>{b.texte}</h2>;
          case "liste":
            return (
              <div key={i}>
                <ul>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {b.verifier && <AVerifier lang={lang} />}
              </div>
            );
          case "etapes":
            return (
              <ol key={i} className="etapes">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "encadre":
            return (
              <div key={i} className="encadre">
                {b.titre && <strong>{b.titre}</strong>}
                <p>
                  {b.texte}
                  {b.verifier && <AVerifier lang={lang} />}
                </p>
              </div>
            );
          case "aCompleter":
            return (
              <p key={i}>
                <span className="a-completer">{b.texte}</span>
              </p>
            );
          case "lien":
            return (
              <p key={i} className="contenu-lien">
                {b.href.startsWith("https://") ? (
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    {b.texte} ↗
                  </a>
                ) : b.href.startsWith("tel:") || b.href.startsWith("mailto:") ? (
                  <a href={b.href}>{b.texte} →</a>
                ) : (
                  <Link href={href(lang, b.href)}>{b.texte} →</Link>
                )}
              </p>
            );
          case "photo":
            return (
              <Image
                key={i}
                className="contenu-photo"
                src={b.src}
                alt={b.alt}
                width={b.largeur}
                height={b.hauteur}
                sizes="(max-width: 960px) 100vw, 760px"
              />
            );
          case "dates":
            return (
              <ol key={i} className="frise">
                {b.items.map((d) => (
                  <li key={d.date + d.texte.slice(0, 20)}>
                    <span className="frise-date">{d.date}</span>
                    {d.titre && <h3 className="frise-titre">{d.titre}</h3>}
                    <p>{d.texte}</p>
                  </li>
                ))}
              </ol>
            );
          case "citation":
            return (
              <p key={i} className="contenu-citation">
                {b.texte}
              </p>
            );
          case "questions":
            return (
              <div key={i} className="questions">
                {b.items.map((q) => (
                  <details key={q.q}>
                    <summary>{q.q}</summary>
                    {q.r.map((r) => (
                      <p key={r}>{r}</p>
                    ))}
                  </details>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
