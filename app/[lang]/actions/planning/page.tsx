// Page publique « Planning des activités ». Les activités viennent de l'espace d'administration (Supabase) ;
// l'affichage (liste, calendrier, « en ce moment ») se calcule dans le navigateur, à l'heure de Bruxelles.
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionnaire } from "@/content/dictionnaires";
import { pagesContenu } from "@/content/pages";
import { textesPlanning } from "@/content/planning";
import { hasLocale, href, locales } from "@/lib/i18n";
import { planningPublie } from "@/lib/planning-public";
import PlanningPublic from "@/components/planning/PlanningPublic";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/actions/planning">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionnaire(lang).actions.planning } : {};
}

export default async function Page({ params }: PageProps<"/[lang]/actions/planning">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionnaire(lang);
  const intro = pagesContenu["actions/planning"]?.[lang];
  const premierParagraphe = intro?.blocs.find((b) => b.t === "p");
  return (
    <>
      <section className="page-entete">
        <div className="wrap">
          <nav aria-label={dict.commun.filAriane} className="fil-ariane">
            <ol>
              <li><Link href={href(lang)}>{dict.commun.accueil}</Link></li>
              <li>{dict.nav.actions}</li>
              <li aria-current="page">{dict.actions.planning}</li>
            </ol>
          </nav>
          <h1 className="titre-page">{dict.actions.planning}</h1>
          {intro?.soustitre && <p className="page-soustitre">{intro.soustitre}</p>}
        </div>
      </section>
      <section className="wrap section">
        {premierParagraphe && "texte" in premierParagraphe && <p className="pl-intro">{premierParagraphe.texte}</p>}
        <Suspense fallback={<p className="pl-petit">{textesPlanning[lang].chargement}</p>}>
          <Planning lang={lang} />
        </Suspense>
      </section>
    </>
  );
}

async function Planning({ lang }: { lang: "fr" | "nl" | "en" }) {
  const donnees = await planningPublie();
  return <PlanningPublic donnees={donnees} lang={lang} />;
}
