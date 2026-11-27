import { Suspense } from "react";
import { exigerSession } from "@/lib/admin/session";

export const metadata = { title: "Demandes de médicaments" };

type Demande = {
  id: string; recue_le: string; nom: string; prenom: string; naissance: string; telephone: string;
  email: string | null; medecin: string | null; medicaments: string; email_envoye: boolean;
};

const dateHeure = new Intl.DateTimeFormat("fr-BE", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Brussels" });
const date = new Intl.DateTimeFormat("fr-BE", { dateStyle: "short", timeZone: "UTC" });

export default function Page() {
  return (
    <>
      <h1>Demandes de médicaments</h1>
      <p className="admin-aide">
        Copie de secours : l&apos;accueil reçoit et traite les demandes par e-mail. Cette copie sert seulement à retrouver une
        demande perdue. Visible par l&apos;administrateur seul, impossible à modifier, effacée automatiquement après 30 jours.
        Chaque consultation est notée au journal.
      </p>
      <Suspense fallback={<p className="admin-aide">Chargement…</p>}>
        <Liste />
      </Suspense>
    </>
  );
}

async function Liste() {
  const { supabase, refuse } = await exigerSession(["administrateur"]);
  if (refuse) return <p className="admin-erreur">Accès réservé à l&apos;administrateur.</p>;
  await supabase.rpc("noter_consultation_demandes");
  const { data, error } = await supabase
    .from("demandes_medicaments")
    .select("id, recue_le, nom, prenom, naissance, telephone, email, medecin, medicaments, email_envoye")
    .order("recue_le", { ascending: false })
    .returns<Demande[]>();
  if (error) return <p className="admin-erreur">Les demandes n&apos;ont pas pu être chargées.</p>;
  if (!data.length) return <p className="admin-message">Aucune demande sur les 30 derniers jours.</p>;
  return (
    <div className="admin-liste">
      {data.map((d) => (
        <div className="admin-ligne" key={d.id}>
          <div>
            <strong>
              {d.nom.toUpperCase()} {d.prenom}
            </strong>{" "}
            · né·e le {date.format(new Date(d.naissance))} · {d.telephone}
            {d.email ? ` · ${d.email}` : ""}
            <br />
            <span className="admin-petit">
              Reçue le {dateHeure.format(new Date(d.recue_le))} · {d.medecin || "sans préférence"} ·{" "}
              {d.email_envoye ? "e-mail envoyé à l'accueil" : "⚠ e-mail NON envoyé"}
            </span>
            <pre className="admin-pre">{d.medicaments}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
