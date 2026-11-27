// Affichage d'un numéro de newsletter, aux couleurs de la MME.
// Sert à la fois pour l'aperçu de l'éditeur et pour la page publique du numéro.
import type { Locale } from "@/lib/i18n";
import type { Bloc } from "@/lib/newsletter";

const surtitres: Record<Locale, string> = { fr: "NEWSLETTER", nl: "NIEUWSBRIEF", en: "NEWSLETTER" };
const aNoter: Record<Locale, string> = { fr: "À NOTER", nl: "OM TE ONTHOUDEN", en: "PLEASE NOTE" };

export default function ApercuNumero({ titre, blocs, langue, numero, date }: {
  titre: string; blocs: Bloc[]; langue: Locale; numero: number | null; date?: string;
}) {
  return (
    <article className="numero" lang={langue}>
      <p className="numero-surtitre">
        {surtitres[langue]}
        {numero ? ` · N° ${numero}` : ""}
        {date ? ` · ${date}` : ""}
      </p>
      <h2 className="numero-titre">{titre || "…"}</h2>
      {blocs.map((b) => {
        const t = b.textes[langue];
        if (b.type === "titre") return <h3 key={b.id} className="numero-intertitre">{t}</h3>;
        if (b.type === "encadre")
          return (
            <div key={b.id} className="numero-encadre">
              <span>{aNoter[langue]}</span>
              <p>{t}</p>
            </div>
          );
        if (b.type === "bouton")
          return (
            <p key={b.id}>
              <a className="bouton bouton-plein" href={b.lien || "#"} {...(b.lien?.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {t || "…"}
              </a>
            </p>
          );
        return <p key={b.id} className="numero-texte">{t}</p>;
      })}
    </article>
  );
}
