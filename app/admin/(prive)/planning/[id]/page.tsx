import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exigerSession } from "@/lib/admin/session";
import { lireActivite, type Activite, type Categorie } from "@/lib/planning";
import EditeurActivite from "./EditeurActivite";

export const metadata = { title: "Modifier une activité" };

export default function Page({ params }: PageProps<"/admin/planning/[id]">) {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Chargement params={params} />
    </Suspense>
  );
}

async function Chargement({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase, refuse } = await exigerSession(["administrateur", "contenu"]);
  const [{ data }, { data: categories }] = await Promise.all([
    supabase.from("activites").select("*").eq("id", id).maybeSingle<Activite>(),
    supabase.from("categories_activites").select("id, nom, couleur, icone, ordre, masquee").order("ordre").returns<Categorie[]>(),
  ]);
  if (!data) notFound();
  return (
    <>
      <Link href="/admin/planning" className="admin-petit">← Planning</Link>
      <EditeurActivite activite={lireActivite(data)} categories={categories ?? []} lectureSeule={refuse} />
    </>
  );
}
