// Page d'accueil — version B : en-tête et cartes d'accès rapide de la version A,
// puis les sections proposées par le groupe de travail : infos pratiques, urgences,
// nos soins, soins au forfait, activités et La Récré. « Notre philosophie » en version courte.
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import IconeSoin from "@/components/Icones";
import MaisonAnimee from "@/components/MaisonAnimee";
import StatutOuverture from "@/components/StatutOuverture";
import { getDictionnaire } from "@/content/dictionnaires";
import { deuxPoints, hasLocale, href } from "@/lib/i18n";
import { contact, soins } from "@/lib/site";

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
                {a.boutonAppeler}
              </a>
              <Link href={href(lang, "/pratique/demande-medicaments")} className="bouton bouton-contour">
                {a.boutonMedic}
              </Link>
            </div>
          </div>
          <div className="hero-visuel">
            <Image
              src="/images/photos/facade-2026.jpg"
              alt={a.altFacade}
              width={1600}
              height={1024}
              sizes="(max-width: 960px) 100vw, 560px"
              priority
            />
            <StatutOuverture t={a.statut} lang={lang} />
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

      <section className="wrap infos-pratiques" aria-label={dict.pied.colPratique}>
        <div>
          <h2>{a.libAdresse}</h2>
          <p>
            {contact.rue}, {contact.ville}
          </p>
          <p>
            <Link href={href(lang, "/contact")}>{a.lienAcces}</Link>
          </p>
          <p className="a-completer">{a.aCompleterAcces}</p>
        </div>
        <div>
          <h2>{a.libContact}</h2>
          <p>
            <a href={contact.telephoneLien}>{contact.telephone}</a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
        <div>
          <h2>{a.libHoraires}</h2>
          <p>{a.horaires}</p>
          <p className="a-completer">{a.aCompleterConsultations}</p>
        </div>
      </section>

      <section className="wrap" aria-labelledby="titre-urgence">
        <div className="urgence">
          <div>
            <h2 id="titre-urgence">{a.urgenceTitre}</h2>
            <p>{a.urgenceTexte}</p>
          </div>
          <p className="urgence-numeros">
            <a href={contact.gardeLien}>
              {a.libGarde}
              {deuxPoints(lang)}
              <strong>{contact.garde}</strong>
            </a>
            <span aria-hidden="true">·</span>
            <a href={contact.urgencesLien}>
              {a.libUrgences}
              {deuxPoints(lang)}
              <strong>{contact.urgences}</strong>
            </a>
          </p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="titre-soins">
        <h2 id="titre-soins" className="titre-section">
          {a.soinsTitre}
        </h2>
        <ul className="grille-soins">
          {soins.map((s) => (
            <li key={s}>
              <Link href={href(lang, `/equipe/${s}`)}>
                <span className="soin-icone">
                  <IconeSoin soin={s} />
                </span>
                <span className="soin-nom">{dict.poles[s]}</span>
                <Fleche />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" aria-labelledby="titre-forfait" style={{ paddingBottom: 72 }}>
        <div className="forfait">
          <div>
            <h2 id="titre-forfait">{a.forfaitTitre}</h2>
            <p>{a.forfaitTexte}</p>
          </div>
          <Link href={href(lang, "/pratique/inscription")} className="bouton bouton-sombre">
            {a.forfaitBouton}
          </Link>
        </div>
      </section>

      <section className="wrap activites" aria-label={`${a.activitesTitre} · ${a.recreTitre}`}>
        <div className="activite">
          <h2>{a.activitesTitre}</h2>
          <p>{a.activitesTexte}</p>
          <p className="activite-date">{a.prochaineDate}</p>
          <Link href={href(lang, "/actions/planning")}>{a.activitesLien}</Link>
        </div>
        <div className="activite">
          <h2>{a.recreTitre}</h2>
          <p>{a.recreTexte}</p>
          <p className="activite-date">{a.prochaineDate}</p>
          <Link href={href(lang, "/actions/la-recre")}>{a.recreLien}</Link>
        </div>
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
          <Link href={href(lang, "/philosophie")} className="philosophie-lien">
            {a.philoLien}
          </Link>
        </div>
      </section>
    </>
  );
}
