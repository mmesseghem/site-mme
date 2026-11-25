// Pages provisoires : chaque lien du menu mène à une vraie page,
// en attendant que son contenu soit repris de l'ancien site.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionnaire, type Dictionnaire } from "@/content/dictionnaires";
import { hasLocale, href, locales, type Locale } from "@/lib/i18n";
import {
  actions,
  contact,
  maison,
  pagesProvisoires,
  pratique,
  soins,
  type ActionSlug,
  type MaisonSlug,
  type PratiqueSlug,
  type SoinSlug,
} from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => pagesProvisoires.map((p) => ({ lang, chemin: p.segments })));
}

// Retrouve le titre de la page et sa rubrique à partir de l'adresse.
function infosPage(dict: Dictionnaire, chemin: string[]) {
  const [rubrique, page] = chemin;
  if (chemin.length === 2 && rubrique === "soins" && (soins as readonly string[]).includes(page))
    return { titre: dict.soins[page as SoinSlug], rubrique: dict.nav.soins };
  if (chemin.length === 2 && rubrique === "pratique" && (pratique as readonly string[]).includes(page))
    return { titre: dict.pratique[page as PratiqueSlug], rubrique: null };
  if (chemin.length === 2 && rubrique === "actions" && (actions as readonly string[]).includes(page))
    return { titre: dict.actions[page as ActionSlug], rubrique: dict.nav.activites };
  if (chemin.length === 1 && (maison as readonly string[]).includes(rubrique))
    return { titre: dict.maison[rubrique as MaisonSlug], rubrique: null };
  return null;
}

function lire(lang: string, chemin: string[]) {
  if (!hasLocale(lang)) return null;
  const dict = getDictionnaire(lang as Locale);
  const infos = infosPage(dict, chemin);
  return infos ? { dict, infos, lang: lang as Locale } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[...chemin]">): Promise<Metadata> {
  const { lang, chemin } = await params;
  const page = lire(lang, chemin);
  return page ? { title: page.infos.titre } : {};
}

export default async function PageProvisoire({ params }: PageProps<"/[lang]/[...chemin]">) {
  const { lang, chemin } = await params;
  const page = lire(lang, chemin);
  if (!page) notFound();
  const { dict, infos } = page;

  return (
    <>
      <section className="page-entete">
        <div className="wrap">
          <nav aria-label={dict.commun.filAriane} className="fil-ariane">
            <ol>
              <li>
                <Link href={href(page.lang)}>{dict.commun.accueil}</Link>
              </li>
              {infos.rubrique && <li>{infos.rubrique}</li>}
              <li aria-current="page">{infos.titre}</li>
            </ol>
          </nav>
          <h1 className="titre-page">{infos.titre}</h1>
        </div>
      </section>
      <section className="wrap section">
        <div className="encadre">
          <p>{dict.provisoire.texte}</p>
          <p>
            {dict.provisoire.enAttendant} <a href={contact.telephoneLien}>{contact.telephone}</a>.
          </p>
          <Link href={href(page.lang)}>{dict.provisoire.retour}</Link>
        </div>
      </section>
    </>
  );
}
