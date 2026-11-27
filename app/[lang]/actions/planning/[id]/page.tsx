// Page publique d'une activité (texte, infos pratiques, prochaines dates, ajout à l'agenda).
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionnaire } from "@/content/dictionnaires";
import { textesPlanning } from "@/content/planning";
import { hasLocale, href, locales, type Locale } from "@/lib/i18n";
import { planningPublie } from "@/lib/planning-public";
import FicheVivante from "@/components/planning/FicheVivante";

// Activités publiées au moment de la construction ; les suivantes sont affichées à la demande.
export async function generateStaticParams() {
  const { activites } = await planningPublie();
  const ids = activites.length ? activites.map((a) => a.id) : ["00000000-0000-4000-9000-000000000001"];
  return locales.flatMap((lang) => ids.map((id) => ({ lang, id })));
}

async function trouver(lang: string, id: string) {
  if (!hasLocale(lang) || !/^[0-9a-f-]{36}$/.test(id)) return null;
  const { activites, categories } = await planningPublie();
  const a = activites.find((x) => x.id === id);
  return a ? { a, categorie: categories.find((c) => c.id === a.categorie_id) ?? null, lang: lang as Locale } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/actions/planning/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const x = await trouver(lang, id);
  return x ? { title: x.a.titre[x.lang], description: x.a.description[x.lang] } : {};
}

export default function Page({ params }: PageProps<"/[lang]/actions/planning/[id]">) {
  return (
    <Suspense>
      <Contenu params={params} />
    </Suspense>
  );
}

async function Contenu({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const x = await trouver(lang, id);
  if (!x) notFound();
  const dict = getDictionnaire(x.lang);
  return (
    <section className="wrap section">
      <nav aria-label={dict.commun.filAriane} className="fil-ariane">
        <ol>
          <li><Link href={href(x.lang)}>{dict.commun.accueil}</Link></li>
          <li><Link href={href(x.lang, "/actions/planning")}>{dict.actions.planning}</Link></li>
          <li aria-current="page">{x.a.titre[x.lang]}</li>
        </ol>
      </nav>
      <FicheVivante a={x.a} categorie={x.categorie} lang={x.lang} lienAgenda={`/agenda/${x.a.id}.ics?lang=${x.lang}`} />
      <p style={{ marginTop: 32 }}><Link href={href(x.lang, "/actions/planning")}>← {textesPlanning[x.lang].retour}</Link></p>
    </section>
  );
}
