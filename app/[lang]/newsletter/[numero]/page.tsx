import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { numerosPublies } from "@/lib/newsletter-publique";
import ApercuNumero from "@/components/ApercuNumero";

const formats: Record<Locale, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat("fr-BE", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
  nl: new Intl.DateTimeFormat("nl-BE", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
  en: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "Europe/Brussels" }),
};

// Numéros déjà publiés au moment de la construction ; les suivants sont affichés à la demande.
export async function generateStaticParams() {
  const numeros = await numerosPublies();
  return numeros.length ? numeros.map((n) => ({ numero: String(n.numero) })) : [{ numero: "1" }];
}

export default function Page({ params }: PageProps<"/[lang]/newsletter/[numero]">) {
  return (
    <section className="wrap section">
        <Suspense>
          <Numero params={params} />
        </Suspense>
    </section>
  );
}

async function Numero({ params }: { params: Promise<{ lang: string; numero: string }> }) {
  const { lang, numero } = await params;
  if (!hasLocale(lang) || !/^\d{1,5}$/.test(numero)) notFound();
  const n = (await numerosPublies()).find((x) => x.numero === Number(numero));
  if (!n) notFound();
  return (
    <ApercuNumero titre={n.titre[lang]} blocs={n.blocs} langue={lang} numero={n.numero}
      date={n.publiee_le ? formats[lang].format(new Date(n.publiee_le)) : undefined} />
  );
}
