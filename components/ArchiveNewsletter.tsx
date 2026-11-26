// Liste des numéros publiés, sur la page « Newsletter » du site.
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { numerosPublies } from "@/lib/newsletter-publique";

const textes: Record<Locale, { titre: string; vide: string; lire: string }> = {
  fr: { titre: "Les numéros parus", vide: "Les numéros paraîtront ici.", lire: "Lire" },
  nl: { titre: "Verschenen nummers", vide: "De nummers verschijnen hier.", lire: "Lezen" },
  en: { titre: "Past issues", vide: "Issues will appear here.", lire: "Read" },
};
const formats: Record<Locale, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat("fr-BE", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
  nl: new Intl.DateTimeFormat("nl-BE", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
  en: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
};

export default async function ArchiveNewsletter({ lang }: { lang: Locale }) {
  const numeros = await numerosPublies();
  const t = textes[lang];
  return (
    <section aria-labelledby="archive-titre">
      <h2 id="archive-titre">{t.titre}</h2>
      {numeros.length === 0 ? (
        <p>{t.vide}</p>
      ) : (
        <div className="archive-numeros">
          {numeros.map((n) => (
            <Link key={n.id} className="archive-numero" href={href(lang, `/newsletter/${n.numero}`)}>
              <span className="numero-surtitre">N° {n.numero} · {n.publiee_le ? formats[lang].format(new Date(n.publiee_le)) : ""}</span>
              <strong>{n.titre[lang]}</strong>
              <span>{t.lire} →</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
