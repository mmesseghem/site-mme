"use client";
// Éditeur de newsletter : des blocs simples, toujours mis en page aux couleurs de la MME.
import { useState, useTransition } from "react";
import type { Locale } from "@/lib/i18n";
import { langues, languesManquantes, libellesBlocs, textesVides, type Bloc, type Numero, type Textes, type TypeBloc } from "@/lib/newsletter";
import { enregistrer, proposerTraduction, publier, supprimerBrouillon } from "../../../newsletter-actions";
import ApercuNumero from "@/components/ApercuNumero";

const nomsLangues: Record<Locale, string> = { fr: "Français", nl: "Nederlands", en: "English" };

export default function Editeur({ numero, lectureSeule }: { numero: Numero; lectureSeule: boolean }) {
  const [titre, setTitre] = useState<Textes>(numero.titre);
  const [blocs, setBlocs] = useState<Bloc[]>(numero.blocs);
  const [langue, setLangue] = useState<Locale>("fr");
  const [statut, setStatut] = useState(numero.statut);
  const [message, setMessage] = useState<{ ok?: string; erreur?: string }>({});
  const [aRelire, setARelire] = useState<Locale[]>([]);
  const [modifie, setModifie] = useState(false);
  const [enCours, demarrer] = useTransition();

  const manquantes = languesManquantes({ titre, blocs });
  const changer = (f: () => void) => { f(); setModifie(true); setMessage({}); };
  const majBloc = (i: number, b: Partial<Bloc>) => changer(() => setBlocs((xs) => xs.map((x, j) => (j === i ? { ...x, ...b } : x))));
  const deplacer = (i: number, d: number) => changer(() => setBlocs((xs) => {
    const ys = [...xs]; const j = i + d; if (j < 0 || j >= ys.length) return xs; [ys[i], ys[j]] = [ys[j], ys[i]]; return ys;
  }));
  const ajouter = (type: TypeBloc) => changer(() => setBlocs((xs) => [...xs, { id: crypto.randomUUID(), type, textes: textesVides(), ...(type === "bouton" ? { lien: "/fr" } : {}) }]));

  const sauver = () => demarrer(async () => { const r = await enregistrer(numero.id, titre, blocs); setMessage(r); if (r.ok) setModifie(false); });
  const traduire = (vers: "nl" | "en") => demarrer(async () => {
    const r = await proposerTraduction(titre, blocs, vers);
    if (r.erreur || !r.blocs) { setMessage({ erreur: r.erreur }); return; }
    setTitre((t) => ({ ...t, [vers]: r.titre ?? "" }));
    setBlocs((xs) => xs.map((b, i) => ({ ...b, textes: { ...b.textes, [vers]: r.blocs![i] ?? "" } })));
    setARelire((l) => [...new Set([...l, vers])]); setModifie(true);
    setMessage({ ok: "Traduction proposée : relisez-la, corrigez si besoin, puis enregistrez." });
  });
  const lancerPublication = () => demarrer(async () => {
    if (modifie) { const r = await enregistrer(numero.id, titre, blocs); if (r.erreur) { setMessage(r); return; } setModifie(false); }
    const r = await publier(numero.id); setMessage(r); if (r.ok) setStatut("publiee");
  });

  return (
    <>
      <h1>{numero.numero ? `Numéro ${numero.numero}` : "Nouveau numéro"} {statut === "publiee" ? "· publié" : "· brouillon"}</h1>
      {lectureSeule && <p className="admin-message">Lecture seule : votre rôle ne permet pas de modifier la newsletter.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {langues.map((l) => (
          <button key={l} type="button" onClick={() => setLangue(l)} className="admin-bouton-contour"
            style={langue === l ? { background: "var(--bordeaux)", color: "var(--blanc)", borderColor: "var(--bordeaux)" } : undefined}>
            {nomsLangues[l]} · {manquantes.includes(l) ? "à compléter" : aRelire.includes(l) ? "à relire" : "prêt"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: "999 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {langue !== "fr" && !lectureSeule && (
            <button type="button" className="admin-bouton-contour" disabled={enCours} onClick={() => traduire(langue)}
              style={{ alignSelf: "flex-start", borderColor: "var(--vert)", color: "var(--vert-texte)", background: "var(--fond-vert)" }}>
              Proposer une traduction depuis le français (DeepL)
            </button>
          )}
          {aRelire.includes(langue) && (
            <p className="admin-erreur" style={{ margin: 0 }}>
              Traduction automatique : relisez avant de publier.{" "}
              <button type="button" className="admin-bouton-contour" onClick={() => setARelire((l) => l.filter((x) => x !== langue))}>J&apos;ai relu</button>
            </p>
          )}
          <label>
            Titre du numéro ({langue.toUpperCase()})
            <input value={titre[langue]} maxLength={200} disabled={lectureSeule}
              onChange={(e) => changer(() => setTitre((t) => ({ ...t, [langue]: e.target.value })))} />
          </label>
          {blocs.map((b, i) => (
            <div key={b.id} style={{ border: "1px solid var(--bordure)", borderRadius: 12, padding: 12, background: "var(--blanc)", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
                <span className="admin-surtitre">{libellesBlocs[b.type].toUpperCase()}</span>
                {!lectureSeule && (
                  <span style={{ display: "flex", gap: 6 }}>
                    <button type="button" className="admin-bouton-contour" aria-label="Monter" onClick={() => deplacer(i, -1)}>↑</button>
                    <button type="button" className="admin-bouton-contour" aria-label="Descendre" onClick={() => deplacer(i, 1)}>↓</button>
                    <button type="button" className="admin-bouton-contour" onClick={() => changer(() => setBlocs((xs) => xs.filter((_, j) => j !== i)))}>Retirer</button>
                  </span>
                )}
              </div>
              <textarea rows={b.type === "texte" ? 5 : 2} value={b.textes[langue]} disabled={lectureSeule} maxLength={4000}
                aria-label={`${libellesBlocs[b.type]} (${langue.toUpperCase()})`}
                onChange={(e) => majBloc(i, { textes: { ...b.textes, [langue]: e.target.value } })} />
              {b.type === "bouton" && (
                <label className="admin-petit">
                  Lien du bouton (page du site, par exemple /fr/actions/planning, ou adresse https://…)
                  <input value={b.lien ?? ""} disabled={lectureSeule} onChange={(e) => majBloc(i, { lien: e.target.value })} />
                </label>
              )}
            </div>
          ))}
          {!lectureSeule && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(Object.keys(libellesBlocs) as TypeBloc[]).map((t) => (
                <button key={t} type="button" className="admin-bouton-contour" style={{ borderStyle: "dashed" }} onClick={() => ajouter(t)}>+ {libellesBlocs[t]}</button>
              ))}
            </div>
          )}
        </div>

        <aside style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 12, padding: 18, border: "1px solid var(--bordure)", borderRadius: 16, background: "var(--blanc)" }}>
          {message.ok && <p className="admin-message" role="status" style={{ margin: 0 }}>{message.ok}</p>}
          {message.erreur && <p className="admin-erreur" role="alert" style={{ margin: 0 }}>{message.erreur}</p>}
          {!lectureSeule && (
            <>
              <button type="button" className="admin-bouton-contour" disabled={enCours || !modifie} onClick={sauver}>
                {modifie ? "Enregistrer" : "Tout est enregistré"}
              </button>
              {statut !== "publiee" && (
                <>
                  <button type="button" className="admin-bouton" disabled={enCours || manquantes.length > 0 || aRelire.length > 0} onClick={lancerPublication}
                    style={manquantes.length || aRelire.length ? { background: "#b9aeac" } : undefined}>
                    Publier sur le site
                  </button>
                  <span className="admin-petit">
                    {manquantes.length ? `Bloqué : à compléter en ${manquantes.map((l) => l.toUpperCase()).join(", ")}.`
                      : aRelire.length ? "Bloqué : une traduction automatique reste à relire." : "Tout est prêt."}
                  </span>
                  <form action={supprimerBrouillon.bind(null, numero.id)}>
                    <button type="submit" className="admin-bouton-contour">Supprimer ce brouillon</button>
                  </form>
                </>
              )}
            </>
          )}
        </aside>
      </div>

      <h2 style={{ fontFamily: "var(--titres)", margin: "12px 0 0" }}>Aperçu ({nomsLangues[langue]})</h2>
      <div style={{ border: "1px dashed var(--bordure)", borderRadius: 16, padding: 8 }}>
        <ApercuNumero titre={titre[langue]} blocs={blocs} langue={langue} numero={numero.numero} />
      </div>
    </>
  );
}
