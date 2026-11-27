import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { exigerSession } from "@/lib/admin/session";
import { formatDate, maintenantBruxelles, resumeRegle, type Activite, type Categorie } from "@/lib/planning";
import { creerActivite } from "../../planning-actions";

export const metadata = { title: "Planning" };

export default function Page() {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Contenu />
    </Suspense>
  );
}

async function Contenu() {
  await connection();
  const { supabase, refuse } = await exigerSession(["administrateur", "contenu"]);
  const [{ data: activites }, { data: categories }] = await Promise.all([
    supabase.from("activites").select("id, titre, repetition, premiere_date, derniere_date, publiee, categorie_id")
      .order("premiere_date", { ascending: true }).returns<Pick<Activite, "id" | "titre" | "repetition" | "premiere_date" | "derniere_date" | "publiee" | "categorie_id">[]>(),
    supabase.from("categories_activites").select("id, nom").returns<Pick<Categorie, "id" | "nom">[]>(),
  ]);
  const aujourdhui = maintenantBruxelles().date;
  const nomCategorie = new Map((categories ?? []).map((c) => [c.id, c.nom.fr]));
  const liste = activites ?? [];
  const groupes = [
    { titre: "Brouillons", items: liste.filter((a) => !a.publiee) },
    { titre: "En cours et à venir", items: liste.filter((a) => a.publiee && (a.derniere_date ?? "") >= aujourdhui) },
    { titre: "Terminées (« Déjà réalisé » sur le site pendant 12 mois)", items: liste.filter((a) => a.publiee && (a.derniere_date ?? "") < aujourdhui).reverse() },
  ];

  return (
    <>
      <h1>Planning</h1>
      <p className="admin-aide">
        Chaque activité a une règle de répétition (une fois, chaque semaine, chaque mois…). Les séances se calculent toutes seules ;
        vous pouvez en annuler ou en déplacer une. Les activités terminées sont effacées automatiquement deux ans après leur dernière séance.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {!refuse && (
          <form action={creerActivite}>
            <button type="submit" className="admin-bouton">Nouvelle activité</button>
          </form>
        )}
        <Link href="/admin/planning/categories" className="admin-bouton-contour" style={{ alignSelf: "center", textDecoration: "none" }}>Catégories</Link>
      </div>
      {refuse && <p className="admin-message">Lecture seule : votre rôle ne permet pas de modifier le planning.</p>}
      {groupes.map((g) => (
        <section key={g.titre} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ fontFamily: "var(--titres)", margin: "8px 0 0", fontSize: 20 }}>{g.titre} ({g.items.length})</h2>
          {g.items.length > 0 && (
            <div className="admin-liste">
              {g.items.map((a) => (
                <div key={a.id} className="admin-ligne">
                  <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <strong>{a.titre.fr || "(sans titre)"}</strong>
                    <span className="admin-petit">
                      {resumeRegle(a.repetition, "fr")}
                      {a.premiere_date ? ` · du ${formatDate(a.premiere_date, "fr", { day: "numeric", month: "short", year: "numeric" })}` : ""}
                      {a.derniere_date && a.derniere_date !== a.premiere_date ? ` au ${formatDate(a.derniere_date, "fr", { day: "numeric", month: "short", year: "numeric" })}` : ""}
                      {a.categorie_id && nomCategorie.get(a.categorie_id) ? ` · ${nomCategorie.get(a.categorie_id)}` : ""}
                    </span>
                  </span>
                  <Link href={`/admin/planning/${a.id}`}>{refuse ? "Voir" : "Modifier"}</Link>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}
