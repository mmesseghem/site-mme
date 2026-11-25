// Page d'accueil : base de la maquette version 1, avec les cartes numérotées,
// « Notre philosophie » et « Nous trouver » repris de la version premium.
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaisonAnimee from "@/components/MaisonAnimee";
import { getDictionnaire } from "@/content/dictionnaires";
import { hasLocale, href } from "@/lib/i18n";
import { contact, equipe } from "@/lib/site";

function Fleche() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function Accueil({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionnaire(lang);
  const a = dict.accueil;

  const liensAcces = [contact.telephoneLien, href(lang, "/pratique/demande-medicaments"), href(lang, "/pratique/inscription")];

  return (
    <>
      <section className="hero">
        <div className="wrap grille-2">
          <div className="hero-texte">
            <span className="surtitre">{a.surtitre}</span>
            <h1>{a.titre}</h1>
            <p>{a.texte}</p>
            <div className="boutons">
              <a href={contact.telephoneLien} className="bouton bouton-plein">
                {a.boutonRdv}
              </a>
              <Link href={href(lang, "/pratique/demande-medicaments")} className="bouton bouton-contour">
                {a.boutonMedic}
              </Link>
            </div>
          </div>
          <div className="hero-visuel">
            <Image
              src="/images/photos/equipe-2025.jpg"
              alt={a.altEquipe}
              width={1024}
              height={683}
              sizes="(max-width: 960px) 100vw, 560px"
              priority
            />
            <p className="carte-horaires">
              <strong>{a.horairesTitre}</strong>
              <span>{a.horaires}</span>
              <span>{a.garde}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <ul className="acces">
          {a.acces.map((carte, i) => {
            const lien = liensAcces[i];
            const contenu = (
              <>
                <span className="acces-numero">{String(i + 1).padStart(2, "0")}</span>
                <span className="acces-titre">{carte.titre}</span>
                <span className="acces-texte">{carte.texte}</span>
              </>
            );
            return (
              <li key={carte.titre} className={i === 1 ? "acces-mis-en-avant" : undefined}>
                {lien.startsWith("tel:") ? <a href={lien}>{contenu}</a> : <Link href={lien}>{contenu}</Link>}
              </li>
            );
          })}
        </ul>
      </div>

      <section className="wrap section" aria-labelledby="titre-poles">
        <div className="entete-section">
          <div>
            <span className="surtitre">{a.polesSurtitre}</span>
            <h2 id="titre-poles">{a.polesTitre}</h2>
          </div>
          <p>{a.polesTexte}</p>
        </div>
        <ul className="grille-poles">
          {equipe.map((s) => (
            <li key={s}>
              <Link href={href(lang, `/equipe/${s}`)}>
                <span>{dict.poles[s]}</span>
                <Fleche />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="philosophie" aria-labelledby="titre-philosophie">
        <MaisonAnimee />
        <div className="wrap">
          <h2 id="titre-philosophie" className="surtitre">
            {a.philoSurtitre}
          </h2>
          <p className="philosophie-citation">
            {a.philoDebut} <em>{a.philoMisEnAvant}</em>
            {a.philoFin}
          </p>
          <dl className="valeurs">
            {a.valeurs.map((v) => (
              <div key={v.titre}>
                <dt>{v.titre}</dt>
                <dd>{v.texte}</dd>
              </div>
            ))}
          </dl>
          <Link href={href(lang, "/philosophie")} className="philosophie-lien">
            {a.philoLien}
          </Link>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="titre-trouver">
        <div className="trouver">
          <Image
            src="/images/photos/entree-2026.jpg"
            alt={a.altFacade}
            width={1400}
            height={1501}
            sizes="(max-width: 960px) 100vw, 600px"
          />
          <div className="trouver-infos">
            <span className="surtitre">{a.trouverSurtitre}</span>
            <h2 id="titre-trouver">
              {contact.rue},
              <br />
              {contact.ville}
            </h2>
            <dl>
              <div>
                <dt>{a.libTelephone}</dt>
                <dd>
                  <a href={contact.telephoneLien}>{contact.telephone}</a>
                </dd>
              </div>
              <div>
                <dt>{a.libEmail}</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>{a.libHoraires}</dt>
                <dd>{a.horairesValeur}</dd>
              </div>
              <div>
                <dt>{a.libGarde}</dt>
                <dd>{contact.garde}</dd>
              </div>
            </dl>
            <Link href={href(lang, "/contact")} className="bouton bouton-contour">
              {a.trouverLien}
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 96 }}>
        <div className="rejoindre">
          <div>
            <h2>{a.rejoindreTitre}</h2>
            <p>{a.rejoindreTexte}</p>
          </div>
          <Link href={href(lang, "/offres-emploi")} className="bouton bouton-sombre">
            {a.rejoindreBouton}
          </Link>
        </div>
      </div>
    </>
  );
}
