"use client";
// Éditeur d'une activité du planning : contenu en blocs (comme la newsletter), infos pratiques,
// règle de répétition avec la liste des séances (annuler, déplacer), pauses, publication.
import { useMemo, useState, useTransition } from "react";
import type { Locale } from "@/lib/i18n";
import { libellesBlocs, textesVides, type Bloc, type Textes, type TypeBloc } from "@/lib/newsletter";
import {
  datesDeLaRegle, formatDate, formatPlage, jourSemaine, languesManquantesActivite, maintenantBruxelles, nomsJours, resumeRegle, seances,
  type Activite, type Categorie, type Exception, type Repetition,
} from "@/lib/planning";
import FicheActivite from "@/components/planning/FicheActivite";
import { enregistrerActivite, proposerTraductionPlanning, publierActivite, supprimerActivite } from "../../../planning-actions";

const nomsLangues: Record<Locale, string> = { fr: "Français", nl: "Nederlands", en: "English" };
const langues: Locale[] = ["fr", "nl", "en"];
const carte = { border: "1px solid var(--bordure)", borderRadius: 16, padding: 16, background: "var(--blanc)", display: "flex", flexDirection: "column" as const, gap: 12 };
const ligne = { display: "flex", flexWrap: "wrap" as const, gap: 12, alignItems: "flex-end" };
const enLigne = { flexDirection: "row" as const, alignItems: "center", gap: 8, fontWeight: 400 };
const actif = { background: "var(--bordeaux)", color: "var(--blanc)", borderColor: "var(--bordeaux)" };

export default function EditeurActivite({ activite, categories, lectureSeule }: { activite: Activite; categories: Categorie[]; lectureSeule: boolean }) {
  const [a, setA] = useState<Activite>(activite);
  const [langue, setLangue] = useState<Locale>("fr");
  const [publiee, setPubliee] = useState(activite.publiee);
  const [message, setMessage] = useState<{ ok?: string; erreur?: string }>({});
  const [aRelire, setARelire] = useState<Locale[]>([]);
  const [modifie, setModifie] = useState(false);
  const [toutVoir, setToutVoir] = useState(false);
  const [deplacement, setDeplacement] = useState<Exception | null>(null);
  const [pause, setPause] = useState({ du: "", au: "" });
  const [enCours, demarrer] = useTransition();

  const manquantes = languesManquantesActivite(a);
  const liste = useMemo(() => seances(a), [a]);
  const nbPrevues = useMemo(() => datesDeLaRegle(a.repetition).length, [a.repetition]);
  const aujourdhui = useMemo(() => maintenantBruxelles().date, []);
  const categorie = categories.find((c) => c.id === a.categorie_id) ?? null;

  const changer = (p: Partial<Activite>) => { setA((x) => ({ ...x, ...p })); setModifie(true); setMessage({}); };
  const regle = (p: Partial<Repetition>) => changer({ repetition: { ...a.repetition, ...p } });
  const texte = (champ: "titre" | "description" | "public_vise", v: string) => changer({ [champ]: { ...a[champ], [langue]: v } as Textes });
  const majBloc = (i: number, b: Partial<Bloc>) => changer({ blocs: a.blocs.map((x, j) => (j === i ? { ...x, ...b } : x)) });
  const deplacerBloc = (i: number, d: number) => {
    const ys = [...a.blocs]; const j = i + d; if (j < 0 || j >= ys.length) return; [ys[i], ys[j]] = [ys[j], ys[i]]; changer({ blocs: ys });
  };
  const ajouterBloc = (type: TypeBloc) => changer({ blocs: [...a.blocs, { id: crypto.randomUUID(), type, textes: textesVides(), ...(type === "bouton" ? { lien: "/fr" } : {}) }] });
  const exception = (date: string, e: Exception | null) =>
    changer({ exceptions: [...a.exceptions.filter((x) => x.date !== date), ...(e ? [e] : [])] });

  const sauver = () => demarrer(async () => { const r = await enregistrerActivite(a.id, a); setMessage(r); if (r.ok) setModifie(false); });
  const basculerPublication = (publier: boolean) => demarrer(async () => {
    if (modifie) { const r = await enregistrerActivite(a.id, a); if (r.erreur) { setMessage(r); return; } setModifie(false); }
    const r = await publierActivite(a.id, publier); setMessage(r); if (r.ok) setPubliee(publier);
  });
  const traduire = (vers: "nl" | "en") => demarrer(async () => {
    const sources = [a.titre.fr, a.description.fr, a.public_vise.fr, ...a.blocs.map((b) => b.textes.fr)];
    const r = await proposerTraductionPlanning(sources, vers);
    if (r.erreur || !r.textes) { setMessage({ erreur: r.erreur }); return; }
    const [titre, description, publicVise, ...blocs] = r.textes;
    setA((x) => ({
      ...x,
      titre: { ...x.titre, [vers]: titre }, description: { ...x.description, [vers]: description }, public_vise: { ...x.public_vise, [vers]: publicVise },
      blocs: x.blocs.map((b, i) => ({ ...b, textes: { ...b.textes, [vers]: blocs[i] ?? "" } })),
    }));
    setARelire((l) => [...new Set([...l, vers])]); setModifie(true);
    setMessage({ ok: "Traduction proposée : relisez-la, corrigez si besoin, puis enregistrez." });
  });

  const r = a.repetition;
  const montrees = toutVoir ? liste : liste.slice(0, 8);
  const fermer = lectureSeule;

  return (
    <>
      <h1>{a.titre.fr || "Nouvelle activité"} · {publiee ? "publiée" : "brouillon"}</h1>
      {lectureSeule && <p className="admin-message">Lecture seule : votre rôle ne permet pas de modifier le planning.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: "999 1 460px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* ---------- Textes ---------- */}
          <section style={carte} aria-labelledby="t-textes">
            <h2 id="t-textes" className="admin-surtitre">TEXTES</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {langues.map((l) => (
                <button key={l} type="button" onClick={() => setLangue(l)} className="admin-bouton-contour" style={langue === l ? actif : undefined}>
                  {nomsLangues[l]} · {manquantes.includes(l) ? "à compléter" : aRelire.includes(l) ? "à relire" : "prêt"}
                </button>
              ))}
            </div>
            {langue !== "fr" && !fermer && (
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
            <label>Titre ({langue.toUpperCase()})
              <input value={a.titre[langue]} maxLength={200} disabled={fermer} onChange={(e) => texte("titre", e.target.value)} />
            </label>
            <label>Résumé en une phrase ({langue.toUpperCase()}) <span className="admin-petit" style={{ fontWeight: 400 }}>affiché dans la liste et sur l&apos;accueil</span>
              <input value={a.description[langue]} maxLength={300} disabled={fermer} onChange={(e) => texte("description", e.target.value)} />
            </label>
            {a.blocs.map((b, i) => (
              <div key={b.id} style={{ border: "1px solid var(--bordure)", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
                  <span className="admin-surtitre">{libellesBlocs[b.type].toUpperCase()}</span>
                  {!fermer && (
                    <span style={{ display: "flex", gap: 6 }}>
                      <button type="button" className="admin-bouton-contour" aria-label="Monter" onClick={() => deplacerBloc(i, -1)}>↑</button>
                      <button type="button" className="admin-bouton-contour" aria-label="Descendre" onClick={() => deplacerBloc(i, 1)}>↓</button>
                      <button type="button" className="admin-bouton-contour" onClick={() => changer({ blocs: a.blocs.filter((_, j) => j !== i) })}>Retirer</button>
                    </span>
                  )}
                </div>
                <textarea rows={b.type === "texte" ? 5 : 2} value={b.textes[langue]} disabled={fermer} maxLength={4000}
                  aria-label={`${libellesBlocs[b.type]} (${langue.toUpperCase()})`}
                  onChange={(e) => majBloc(i, { textes: { ...b.textes, [langue]: e.target.value } })} />
                {b.type === "bouton" && (
                  <label className="admin-petit">Lien du bouton (page du site, par exemple /fr/pratique/faq, ou adresse https://…)
                    <input value={b.lien ?? ""} disabled={fermer} onChange={(e) => majBloc(i, { lien: e.target.value })} />
                  </label>
                )}
              </div>
            ))}
            {!fermer && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(Object.keys(libellesBlocs) as TypeBloc[]).map((t) => (
                  <button key={t} type="button" className="admin-bouton-contour" style={{ borderStyle: "dashed" }} onClick={() => ajouterBloc(t)}>+ {libellesBlocs[t]}</button>
                ))}
                <span className="admin-petit" style={{ alignSelf: "center" }}>Photos : bientôt (en même temps que pour la newsletter).</span>
              </div>
            )}
          </section>

          {/* ---------- Infos pratiques ---------- */}
          <section style={carte} aria-labelledby="t-infos">
            <h2 id="t-infos" className="admin-surtitre">INFOS PRATIQUES</h2>
            <div style={ligne}>
              <label style={{ flex: "1 1 200px" }}>Catégorie
                <select value={a.categorie_id ?? ""} disabled={fermer} onChange={(e) => changer({ categorie_id: e.target.value || null })}>
                  <option value="">(aucune)</option>
                  {categories.filter((c) => !c.masquee || c.id === a.categorie_id).map((c) => <option key={c.id} value={c.id}>{c.nom.fr}</option>)}
                </select>
              </label>
              <label style={{ flex: "2 1 260px" }}>Pour qui ? ({langue.toUpperCase()}, facultatif)
                <input value={a.public_vise[langue]} maxLength={120} placeholder="Parents et bébés (0–3 ans)" disabled={fermer} onChange={(e) => texte("public_vise", e.target.value)} />
              </label>
            </div>
            <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <legend style={{ fontWeight: 600, marginBottom: 6 }}>Lieu</legend>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <label style={enLigne}><input type="radio" name="lieu" checked={a.lieu_type === "mme"} disabled={fermer} onChange={() => changer({ lieu_type: "mme" })} /> À la MME</label>
                <label style={enLigne}><input type="radio" name="lieu" checked={a.lieu_type === "ailleurs"} disabled={fermer} onChange={() => changer({ lieu_type: "ailleurs" })} /> Ailleurs (extérieur)</label>
              </div>
              <input value={a.lieu ?? ""} maxLength={200} disabled={fermer} aria-label={a.lieu_type === "mme" ? "Salle (facultatif)" : "Adresse ou point de rendez-vous"}
                placeholder={a.lieu_type === "mme" ? "Salle (facultatif), par exemple salle commune" : "Adresse ou point de rendez-vous, par exemple parc de la Jeunesse, entrée avenue…"}
                onChange={(e) => changer({ lieu: e.target.value })} />
            </fieldset>
            <div style={ligne}>
              <label>Début<input type="time" value={a.heure_debut} disabled={fermer} onChange={(e) => changer({ heure_debut: e.target.value })} /></label>
              <label>Fin (facultatif)<input type="time" value={a.heure_fin ?? ""} disabled={fermer} onChange={(e) => changer({ heure_fin: e.target.value || null })} /></label>
              <label style={{ ...enLigne, paddingBottom: 12 }}><input type="checkbox" checked={a.gratuit} disabled={fermer} onChange={(e) => changer({ gratuit: e.target.checked })} /> Gratuit</label>
              {!a.gratuit && <label>Prix<input value={a.prix ?? ""} maxLength={60} placeholder="2 € par séance" disabled={fermer} onChange={(e) => changer({ prix: e.target.value })} /></label>}
            </div>
          </section>

          {/* ---------- Répétition ---------- */}
          <section style={carte} aria-labelledby="t-repet">
            <h2 id="t-repet" className="admin-surtitre">DATES ET RÉPÉTITION</h2>
            <div style={ligne}>
              <label>Premier jour
                <input type="date" value={r.premier} disabled={fermer} onChange={(e) => e.target.value && regle({ premier: e.target.value, jours: r.frequence === "semaine" ? r.jours : [jourSemaine(e.target.value)] })} />
              </label>
              <label>Se répète
                <select value={r.frequence} disabled={fermer} onChange={(e) => regle({ frequence: e.target.value as Repetition["frequence"], jours: r.jours.length ? r.jours : [jourSemaine(r.premier)] })}>
                  <option value="une">Une seule fois</option>
                  <option value="semaine">Chaque semaine</option>
                  <option value="mois">Chaque mois</option>
                </select>
              </label>
              {r.frequence !== "une" && (
                <label>{r.frequence === "semaine" ? "Toutes les … semaines" : "Tous les … mois"}
                  <input type="number" min={1} max={12} step={1} value={r.intervalle} style={{ width: 90 }} disabled={fermer}
                    onChange={(e) => regle({ intervalle: Math.max(1, Math.min(12, Math.round(Number(e.target.value)) || 1)) })} />
                </label>
              )}
            </div>

            {r.frequence === "semaine" && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 600, marginBottom: 6 }}>Les jours</legend>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {nomsJours.fr.map((j, i) => {
                    const coche = r.jours.includes(i);
                    return (
                      <button key={j} type="button" aria-pressed={coche} disabled={fermer} className="admin-bouton-contour" style={coche ? actif : undefined}
                        onClick={() => regle({ jours: coche ? r.jours.filter((x) => x !== i) : [...r.jours, i] })}>{j}</button>
                    );
                  })}
                </div>
              </fieldset>
            )}
            {r.frequence === "mois" && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <label style={enLigne}><input type="radio" name="mensuel" checked={r.mensuel === "rang"} disabled={fermer} onChange={() => regle({ mensuel: "rang" })} />
                  {resumeRegle({ ...r, mensuel: "rang", intervalle: 1, fin: { type: "nombre", n: 1 } }, "fr").replace(/^Chaque mois, /, "").replace(/, 1 fois$/, "")}
                </label>
                <label style={enLigne}><input type="radio" name="mensuel" checked={r.mensuel === "date"} disabled={fermer} onChange={() => regle({ mensuel: "date" })} />
                  {resumeRegle({ ...r, mensuel: "date", intervalle: 1, fin: { type: "nombre", n: 1 } }, "fr").replace(/^Chaque mois, /, "").replace(/, 1 fois$/, "")}
                </label>
              </div>
            )}
            {r.frequence !== "une" && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>Fin :</span>
                <label style={enLigne}><input type="radio" name="fin" checked={r.fin.type === "date"} disabled={fermer}
                  onChange={() => regle({ fin: { type: "date", date: r.fin.type === "date" ? r.fin.date : datesDeLaRegle(r).at(-1) ?? r.premier } })} /> jusqu&apos;au</label>
                <input type="date" aria-label="Date de fin" value={r.fin.type === "date" ? r.fin.date : ""} disabled={fermer || r.fin.type !== "date"} min={r.premier}
                  onChange={(e) => e.target.value && regle({ fin: { type: "date", date: e.target.value } })} />
                <label style={enLigne}><input type="radio" name="fin" checked={r.fin.type === "nombre"} disabled={fermer}
                  onChange={() => regle({ fin: { type: "nombre", n: Math.max(1, liste.length || 10) } })} /> après</label>
                <input type="number" aria-label="Nombre de séances" min={1} max={300} step={1} style={{ width: 80 }} disabled={fermer || r.fin.type !== "nombre"}
                  value={r.fin.type === "nombre" ? r.fin.n : ""} onChange={(e) => regle({ fin: { type: "nombre", n: Math.max(1, Math.min(300, Math.round(Number(e.target.value)) || 1)) } })} />
                <span>séances</span>
              </div>
            )}
            <p className="admin-message" style={{ margin: 0 }}>
              {resumeRegle(r, "fr")} · {formatPlage(a.heure_debut, a.heure_fin, "fr")} · <strong>{liste.filter((s) => !s.annulee).length} séance{liste.filter((s) => !s.annulee).length > 1 ? "s" : ""}</strong>
              {nbPrevues !== liste.length ? ` (pauses déduites)` : ""}
            </p>
            {r.frequence === "semaine" && !r.jours.length && <p className="admin-erreur" style={{ margin: 0 }}>Cochez au moins un jour.</p>}

            {/* Pauses */}
            {r.frequence !== "une" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>Pauses (vacances…)</span>
                {a.pauses.map((p, i) => (
                  <div key={p.du + p.au} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span>Du {formatDate(p.du, "fr")} au {formatDate(p.au, "fr", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
                    {!fermer && <button type="button" className="admin-bouton-contour" onClick={() => changer({ pauses: a.pauses.filter((_, j) => j !== i) })}>Retirer</button>}
                  </div>
                ))}
                {!fermer && (
                  <div style={ligne}>
                    <label>Du<input type="date" value={pause.du} onChange={(e) => setPause({ ...pause, du: e.target.value })} /></label>
                    <label>Au<input type="date" value={pause.au} min={pause.du} onChange={(e) => setPause({ ...pause, au: e.target.value })} /></label>
                    <button type="button" className="admin-bouton-contour" style={{ marginBottom: 6 }}
                      onClick={() => {
                        if (!pause.du || !pause.au || pause.au < pause.du) { setMessage({ erreur: "Pause : choisissez une date de début et une date de fin (dans l'ordre)." }); return; }
                        changer({ pauses: [...a.pauses, pause] }); setPause({ du: "", au: "" });
                      }}>Ajouter la pause</button>
                  </div>
                )}
              </div>
            )}

            {/* Séances */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 600, marginBottom: 4 }}>Séances</span>
              {liste.length === 0 && <span className="admin-petit">Aucune séance avec ces réglages.</span>}
              {montrees.map((s) => (
                <div key={s.dateOrigine} style={{ borderBottom: "1px solid var(--bordure)", padding: "8px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
                    <span style={s.annulee ? { textDecoration: "line-through", color: "var(--bordeaux)" } : s.date < aujourdhui ? { color: "var(--gris)" } : undefined}>
                      {formatDate(s.date, "fr")} · {formatPlage(s.heureDebut, s.heureFin, "fr")}{s.lieu && s.lieu !== a.lieu ? ` · ${s.lieu}` : ""}
                      {s.annulee ? " — annulée" : s.deplacee ? ` — modifiée (prévue le ${formatDate(s.dateOrigine, "fr", { day: "numeric", month: "long" })})` : ""}
                    </span>
                    {!fermer && (
                      <span style={{ display: "flex", gap: 6 }}>
                        {s.annulee || s.deplacee ? (
                          <button type="button" className="admin-bouton-contour" onClick={() => exception(s.dateOrigine, null)}>Remettre comme prévu</button>
                        ) : (
                          <>
                            <button type="button" className="admin-bouton-contour" onClick={() => exception(s.dateOrigine, { date: s.dateOrigine, annulee: true })}>Annuler</button>
                            <button type="button" className="admin-bouton-contour"
                              onClick={() => setDeplacement({ date: s.dateOrigine, nouvelle_date: s.date, heure_debut: s.heureDebut, heure_fin: s.heureFin ?? undefined, lieu: s.lieu ?? undefined })}>Déplacer</button>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  {deplacement?.date === s.dateOrigine && (
                    <div style={{ ...ligne, background: "var(--fond-rose)", padding: 10, borderRadius: 10 }}>
                      <label>Nouvelle date<input type="date" value={deplacement.nouvelle_date ?? ""} onChange={(e) => setDeplacement({ ...deplacement, nouvelle_date: e.target.value })} /></label>
                      <label>Début<input type="time" value={deplacement.heure_debut ?? ""} onChange={(e) => setDeplacement({ ...deplacement, heure_debut: e.target.value })} /></label>
                      <label>Fin<input type="time" value={deplacement.heure_fin ?? ""} onChange={(e) => setDeplacement({ ...deplacement, heure_fin: e.target.value })} /></label>
                      <label style={{ flex: "1 1 180px" }}>Lieu (si différent)<input value={deplacement.lieu ?? ""} maxLength={200} onChange={(e) => setDeplacement({ ...deplacement, lieu: e.target.value })} /></label>
                      <span style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        <button type="button" className="admin-bouton-contour" style={actif}
                          onClick={() => {
                            const d = deplacement;
                            if (!d.nouvelle_date) { setMessage({ erreur: "Choisissez la nouvelle date." }); return; }
                            if (d.heure_debut && d.heure_fin && d.heure_fin <= d.heure_debut) { setMessage({ erreur: "L'heure de fin doit être après l'heure de début." }); return; }
                            exception(d.date, {
                              date: d.date,
                              ...(d.nouvelle_date !== d.date ? { nouvelle_date: d.nouvelle_date } : {}),
                              ...(d.heure_debut && d.heure_debut !== a.heure_debut ? { heure_debut: d.heure_debut } : {}),
                              ...(d.heure_fin && d.heure_fin !== a.heure_fin ? { heure_fin: d.heure_fin } : {}),
                              ...(d.lieu && d.lieu !== a.lieu ? { lieu: d.lieu } : {}),
                            });
                            setDeplacement(null);
                          }}>Valider</button>
                        <button type="button" className="admin-bouton-contour" onClick={() => setDeplacement(null)}>Fermer</button>
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {liste.length > 8 && (
                <button type="button" className="admin-bouton-contour" style={{ alignSelf: "flex-start", marginTop: 8 }} onClick={() => setToutVoir((v) => !v)}>
                  {toutVoir ? "Voir moins" : `Voir les ${liste.length} séances`}
                </button>
              )}
            </div>
          </section>
        </div>

        {/* ---------- Colonne d'actions ---------- */}
        <aside style={{ ...carte, flex: "1 1 260px", position: "sticky", top: 16, padding: 18 }}>
          {message.ok && <p className="admin-message" role="status" style={{ margin: 0 }}>{message.ok}</p>}
          {message.erreur && <p className="admin-erreur" role="alert" style={{ margin: 0 }}>{message.erreur}</p>}
          {!fermer && (
            <>
              <button type="button" className="admin-bouton-contour" disabled={enCours || !modifie} onClick={sauver}>
                {modifie ? "Enregistrer" : "Tout est enregistré"}
              </button>
              {publiee ? (
                <>
                  <span className="admin-petit">Publiée : visible sur le site.</span>
                  <button type="button" className="admin-bouton-contour" disabled={enCours} onClick={() => basculerPublication(false)}>Retirer du site</button>
                </>
              ) : (
                <>
                  <button type="button" className="admin-bouton" disabled={enCours || manquantes.length > 0 || aRelire.length > 0 || liste.length === 0}
                    onClick={() => basculerPublication(true)} style={manquantes.length || aRelire.length || !liste.length ? { background: "#b9aeac" } : undefined}>
                    Publier sur le site
                  </button>
                  <span className="admin-petit">
                    {manquantes.length ? `Bloqué : à compléter en ${manquantes.map((l) => l.toUpperCase()).join(", ")}.`
                      : aRelire.length ? "Bloqué : une traduction automatique reste à relire."
                      : !liste.length ? "Bloqué : aucune séance." : "Tout est prêt."}
                  </span>
                </>
              )}
              <label style={enLigne}>
                <input type="checkbox" checked={a.vitrine} onChange={(e) => changer({ vitrine: e.target.checked })} />
                Montrer dans « Déjà réalisé » une fois terminée
              </label>
              {!publiee && (
                <form action={supprimerActivite.bind(null, a.id)} onSubmit={(e) => { if (!window.confirm("Supprimer définitivement cette activité ?")) e.preventDefault(); }}>
                  <button type="submit" className="admin-bouton-contour">Supprimer cette activité</button>
                </form>
              )}
            </>
          )}
        </aside>
      </div>

      <h2 style={{ fontFamily: "var(--titres)", margin: "12px 0 0" }}>Aperçu ({nomsLangues[langue]})</h2>
      <div style={{ border: "1px dashed var(--bordure)", borderRadius: 16, padding: 16, background: "var(--fond)" }}>
        <FicheActivite a={a} categorie={categorie} lang={langue} toutesSeances={liste} aujourdhui={aujourdhui} />
      </div>
    </>
  );
}
