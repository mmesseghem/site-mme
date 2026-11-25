import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contenu from "@/components/Contenu";
import { getDictionnaire } from "@/content/dictionnaires";
import { pagesContenu } from "@/content/pages";
import { hasLocale, href } from "@/lib/i18n";
import { contact } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionnaire(lang).contact.titre } : {};
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionnaire(lang);
  const c = dict.contact;

  return (
    <section className="wrap section">
      <nav aria-label={dict.commun.filAriane} className="fil-ariane">
        <ol>
          <li>
            <Link href={href(lang)}>{dict.commun.accueil}</Link>
          </li>
          <li aria-current="page">{dict.nav.contact}</li>
        </ol>
      </nav>
      <h1 className="titre-page" style={{ marginBottom: 40 }}>
        {c.titre}
      </h1>
      <div className="grille-2" style={{ alignItems: "start" }}>
        <dl className="cartes-contact">
          <div>
            <dt>{c.adresse}</dt>
            <dd>
              {contact.rue}
              <br />
              {contact.ville}
            </dd>
          </div>
          <div>
            <dt>{c.telephone}</dt>
            <dd>
              <a href={contact.telephoneLien}>{contact.telephone}</a>
              <br />
              {c.fax} {contact.fax}
            </dd>
          </div>
          <div>
            <dt>{c.email}</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>{c.horaires}</dt>
            <dd>{c.horairesValeur}</dd>
          </div>
          <div>
            <dt>{c.horsHoraires}</dt>
            <dd>{c.horsHorairesValeur}</dd>
          </div>
        </dl>
        <div className="contact-visuel">
          {/* À remplacer par la photo de la façade. */}
          <div className="photo-a-venir">{c.photoFacade}</div>
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <Contenu blocs={pagesContenu.contact[lang].blocs} lang={lang} />
      </div>
    </section>
  );
}
