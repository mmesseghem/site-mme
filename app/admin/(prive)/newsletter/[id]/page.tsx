import { Suspense } from "react";
import { notFound } from "next/navigation";
import { exigerSession } from "@/lib/admin/session";
import type { Numero } from "@/lib/newsletter";
import Editeur from "./Editeur";

export const metadata = { title: "Éditer un numéro" };

export default function Page({ params }: PageProps<"/admin/newsletter/[id]">) {
  return (
    <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
      <Chargement params={params} />
    </Suspense>
  );
}

async function Chargement({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase, refuse } = await exigerSession();
  const { data } = await supabase.from("newsletters")
    .select("id, numero, titre, blocs, statut, publiee_le, modifiee_le").eq("id", id).maybeSingle<Numero>();
  if (!data) notFound();
  return <Editeur numero={data} lectureSeule={refuse} />;
}
