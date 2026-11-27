"use client";
// Gestion des catégories du planning : nom en FR/NL/EN, couleur (3 couleurs de la charte), icône, ordre, masquée.
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import IconePlanning, { iconesCategories } from "@/components/IconesPlanning";
import { couleurs, type Categorie, type Couleur } from "@/lib/planning";
import { enregistrerCategorie, supprimerCategorie } from "../../../planning-actions";

const nouvelle = (): Categorie => ({ id: "", nom: { fr: "", nl: "", en: "" }, couleur: "bordeaux", icone: "etoile", ordre: 0, masquee: false });

export function Pastille({ c, lang = "fr" }: { c: Pick<Categorie, "nom" | "couleur" | "icone">; lang?: "fr" | "nl" | "en" }) {
  const k = couleurs[c.couleur];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: k.fond, color: k.texte, fontSize: 14 }}>
      <IconePlanning nom={c.icone} taille={16} /> {c.nom[lang] || "…"}
    </span>
  );
}

export default function GestionCategories({ categories, lectureSeule }: { categories: Categorie[]; lectureSeule: boolean }) {
  const [edition, setEdition] = useState<Categorie | null>(null);
  const [message, setMessage] = useState<{ ok?: string; erreur?: string }>({});
  const [enCours, demarrer] = useTransition();
  const router = useRouter();

  const sauver = () => edition && demarrer(async () => {
    const r = await enregistrerCategorie({ ...edition, id: edition.id || undefined });
    setMessage(r);
    if (r.ok) { setEdition(null); router.refresh(); }
  });
  const supprimer = (id: string) => demarrer(async () => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    const r = await supprimerCategorie(id); setMessage(r); if (r.ok) router.refresh();
  });

  return (
    <>
      {message.ok && <p className="admin-message" role="status">{message.ok}</p>}
      {message.erreur && <p className="admin-erreur" role="alert">{message.erreur}</p>}
      <div className="admin-liste">
        {categories.length === 0 && <div className="admin-ligne"><span className="admin-aide">Aucune catégorie pour l&apos;instant.</span></div>}
        {categories.map((c) => (
          <div key={c.id} className="admin-ligne">
            <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Pastille c={c} />
              <span className="admin-petit">{c.nom.nl} · {c.nom.en}{c.masquee ? " · masquée" : ""}</span>
            </span>
            {!lectureSeule && (
              <span style={{ display: "flex", gap: 6 }}>
                <button type="button" className="admin-bouton-contour" onClick={() => { setEdition(c); setMessage({}); }}>Modifier</button>
                <button type="button" className="admin-bouton-contour" disabled={enCours} onClick={() => supprimer(c.id)}>Supprimer</button>
              </span>
            )}
          </div>
        ))}
      </div>
      {!lectureSeule && !edition && (
        <button type="button" className="admin-bouton-contour" style={{ alignSelf: "flex-start", borderStyle: "dashed" }} onClick={() => { setEdition(nouvelle()); setMessage({}); }}>
          + Nouvelle catégorie
        </button>
      )}
      {edition && (
        <div style={{ border: "1px solid var(--bordure)", borderRadius: 16, padding: 18, background: "var(--blanc)", display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
          <strong style={{ fontFamily: "var(--titres)", fontSize: 18 }}>{edition.id ? "Modifier la catégorie" : "Nouvelle catégorie"}</strong>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
            {(["fr", "nl", "en"] as const).map((l) => (
              <label key={l}>Nom ({l.toUpperCase()})
                <input value={edition.nom[l]} maxLength={60} onChange={(e) => setEdition({ ...edition, nom: { ...edition.nom, [l]: e.target.value } })} />
              </label>
            ))}
          </div>
          <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <legend style={{ fontWeight: 600, marginBottom: 6 }}>Couleur</legend>
            {(Object.keys(couleurs) as Couleur[]).map((k) => (
              <label key={k} style={{ flexDirection: "row", alignItems: "center", gap: 6, fontWeight: 400 }}>
                <input type="radio" name="couleur" checked={edition.couleur === k} onChange={() => setEdition({ ...edition, couleur: k })} />
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: couleurs[k].point, display: "inline-block" }} /> {couleurs[k].nom}
              </label>
            ))}
          </fieldset>
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 600, marginBottom: 6 }}>Icône</legend>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {iconesCategories.map((i) => (
                <button key={i.cle} type="button" title={i.nom} aria-label={i.nom} aria-pressed={edition.icone === i.cle}
                  className="admin-bouton-contour" onClick={() => setEdition({ ...edition, icone: i.cle })}
                  style={edition.icone === i.cle ? { background: "var(--bordeaux)", color: "var(--blanc)", borderColor: "var(--bordeaux)", padding: 8 } : { padding: 8 }}>
                  <IconePlanning nom={i.cle} />
                </button>
              ))}
            </div>
          </fieldset>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>Ordre d&apos;affichage
              <input type="number" min={0} max={999} step={1} value={edition.ordre} style={{ width: 90 }} onChange={(e) => setEdition({ ...edition, ordre: Number(e.target.value) })} />
            </label>
            <label style={{ flexDirection: "row", alignItems: "center", gap: 8, fontWeight: 400 }}>
              <input type="checkbox" checked={edition.masquee} onChange={(e) => setEdition({ ...edition, masquee: e.target.checked })} /> Masquée
            </label>
          </div>
          <span>Aperçu : <Pastille c={edition} /></span>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="admin-bouton" disabled={enCours} onClick={sauver}>Enregistrer</button>
            <button type="button" className="admin-bouton-contour" onClick={() => setEdition(null)}>Annuler</button>
          </div>
        </div>
      )}
    </>
  );
}
