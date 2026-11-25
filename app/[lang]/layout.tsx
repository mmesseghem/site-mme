import type { Metadata } from "next";
import { notFound } from "next/navigation";
// Polices hébergées avec le site (pas d'appel aux serveurs de Google : mieux pour le RGPD).
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "../globals.css";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import { getDictionnaire } from "@/content/dictionnaires";
import { hasLocale, locales } from "@/lib/i18n";
import { alerte } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionnaire(lang);
  return {
    title: { default: dict.meta.titre, template: `%s — ${dict.commun.nomComplet}` },
    description: dict.meta.description,
    icons: { icon: "/images/icone.png", apple: "/images/icone-apple.png" },
    // Site en construction : il ne doit pas apparaître dans Google tant que l'ancien site est en ligne.
    // À retirer au moment de la mise en ligne officielle.
    robots: { index: false, follow: false },
  };
}

export default async function LayoutLangue({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionnaire(lang);

  return (
    <html lang={lang}>
      <body>
        <a href="#contenu" className="lien-evitement">
          {dict.commun.allerAuContenu}
        </a>
        {alerte && (
          <div className="alerte" role="status">
            <div className="wrap">
              <strong>{dict.commun.alerte} :</strong> {alerte[lang]}
            </div>
          </div>
        )}
        <EnTete
          lang={lang}
          dict={{
            commun: dict.commun,
            nav: dict.nav,
            poles: dict.poles,
            pratique: dict.pratique,
            actions: dict.actions,
          }}
        />
        <main id="contenu">{children}</main>
        <PiedDePage lang={lang} dict={dict} />
      </body>
    </html>
  );
}
