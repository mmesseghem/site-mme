import { Suspense } from "react";
import Link from "next/link";
import { exigerSession } from "@/lib/admin/session";
import type { Categorie } from "@/lib/planning";
import GestionCategories from "./GestionCategories";

export const metadata = { title: "Catégories d'activités" };

export default function Page() {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Contenu />
    </Suspense>
  );
}

async function Contenu() {
  const { supabase, refuse } = await exigerSession(["administrateur", "contenu"]);
  const { data } = await supabase.from("categories_activites").select("id, nom, couleur, icone, ordre, masquee")
    .order("ordre").order("cree_le").returns<Categorie[]>();
  return (
    <>
      <Link href="/admin/planning" className="admin-petit">← Planning</Link>
      <h1>Catégories d&apos;activités</h1>
      <p className="admin-aide">
        Elles servent de filtres sur la page du planning. Chaque catégorie a un nom dans les trois langues, une couleur de la charte et une icône.
        Une catégorie encore utilisée ne peut pas être supprimée : masquez-la (elle disparaît des filtres et des nouveaux choix).
      </p>
      <GestionCategories categories={data ?? []} lectureSeule={refuse} />
    </>
  );
}
