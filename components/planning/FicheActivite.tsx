// Fiche d'une activité : sert à la fois pour l'aperçu de l'éditeur et pour la page publique de l'activité.
import type { Locale } from "@/lib/i18n";
import { textesPlanning } from "@/content/planning";
import IconePlanning from "@/components/IconesPlanning";
import { couleurs, formatDate, formatPlage, resumeRegle, type Activite, type Categorie, type Seance } from "@/lib/planning";

const aNoter: Record<Locale, string> = { fr: "À NOTER", nl: "OM TE ONTHOUDEN", en: "PLEASE NOTE" };

export function PastilleCategorie({ c, lang }: { c: Pick<Categorie, "nom" | "couleur" | "icone">; lang: Locale }) {
  const k = couleurs[c.couleur];
  return (
    <span className="pl-categorie" style={{ background: k.fond, color: k.texte }}>
      <IconePlanning nom={c.icone} taille={15} /> {c.nom[lang]}
    </span>
  );
}

export default function FicheActivite({ a, categorie, lang, toutesSeances, aujourdhui, lienAgenda }: {
  a: Activite; categorie: Categorie | null; lang: Locale; toutesSeances: Seance[]; aujourdhui: string | null; lienAgenda?: string;
}) {
  const t = textesPlanning[lang];
  const aVenir = toutesSeances.filter((s) => !aujourdhui || s.date >= aujourdhui);
  const montrees = aVenir.slice(0, 6);
  return (
    <article className="pl-fiche" lang={lang}>
      <header className="pl-fiche-tete">
        {categorie && <PastilleCategorie c={categorie} lang={lang} />}
        <h1 className="pl-fiche-titre">{a.titre[lang] || "…"}</h1>
        {a.description[lang] && <p className="pl-fiche-resume">{a.description[lang]}</p>}
      </header>

      <div className="pl-fiche-grille">
        <div className="pl-fiche-texte">
          {a.blocs.map((b) => {
            const x = b.textes[lang];
            if (b.type === "titre") return <h2 key={b.id} className="numero-intertitre">{x}</h2>;
            if (b.type === "encadre") return <div key={b.id} className="numero-encadre"><span>{aNoter[lang]}</span><p>{x}</p></div>;
            if (b.type === "bouton") return (
              <p key={b.id}>
                <a className="bouton bouton-plein" href={b.lien || "#"} {...(b.lien?.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{x || "…"}</a>
              </p>
            );
            return <p key={b.id} className="numero-texte">{x}</p>;
          })}
        </div>

        <aside className="pl-fiche-infos" aria-label={t.infoPratique}>
          <dl>
            <div><dt><IconePlanning nom="repete" /> {t.quand}</dt><dd>{resumeRegle(a.repetition, lang)}<br />{formatPlage(a.heure_debut, a.heure_fin, lang)}</dd></div>
            <div><dt><IconePlanning nom={a.lieu_type === "mme" ? "maison" : "dehors"} /> {t.ou}</dt>
              <dd>{a.lieu_type === "mme" ? <>{t.aLaMme}<br />Rue Esseghem 24, 1090 Jette{a.lieu ? <><br />{a.lieu}</> : null}</> : a.lieu}</dd></div>
            {a.public_vise[lang] && <div><dt><IconePlanning nom="public" /> {t.pourQui}</dt><dd>{a.public_vise[lang]}</dd></div>}
            <div><dt><IconePlanning nom="info" /> {t.prix}</dt><dd>{a.gratuit ? t.gratuit : a.prix}</dd></div>
          </dl>
          {montrees.length > 0 && (
            <>
              <h2 className="pl-fiche-sous">{t.prochainesDates}</h2>
              <ul className="pl-fiche-dates">
                {montrees.map((s) => (
                  <li key={s.dateOrigine} className={s.annulee ? "pl-annulee" : undefined}>
                    <span className="pl-date-texte">{formatDate(s.date, lang)}</span>
                    <span>{formatPlage(s.heureDebut, s.heureFin, lang)}{s.lieu && s.lieu !== a.lieu ? ` · ${s.lieu}` : ""}</span>
                    {s.annulee && <span className="pl-etiquette pl-etiquette-annule">{t.annule}</span>}
                    {s.deplacee && <span className="pl-etiquette">{t.deplace}</span>}
                  </li>
                ))}
              </ul>
              {aVenir.length > montrees.length && <p className="pl-petit">{t.autresDates(aVenir.length - montrees.length)}</p>}
            </>
          )}
          {lienAgenda && montrees.length > 0 && (
            <a className="bouton bouton-contour" href={lienAgenda} download>
              <IconePlanning nom="calendrier" /> {t.ajouterAgenda}
            </a>
          )}
        </aside>
      </div>
    </article>
  );
}
