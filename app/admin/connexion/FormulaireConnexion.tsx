"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { envoyerLien, type EtatSimple } from "../actions";

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState<EtatSimple, FormData>(envoyerLien, {});
  const params = useSearchParams();
  return (
    <form action={action}>
      {params.get("refuse") && <p className="admin-erreur">Ce compte est désactivé ou n&apos;existe pas.</p>}
      {params.get("lien") && <p className="admin-erreur">Ce lien n&apos;est plus valable. Demandez-en un nouveau.</p>}
      {etat.erreur && <p className="admin-erreur" role="alert">{etat.erreur}</p>}
      {etat.message ? (
        <p className="admin-message" role="status">{etat.message}</p>
      ) : (
        <>
          <label>
            Adresse e-mail
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <button type="submit" className="admin-bouton" disabled={enCours}>
            {enCours ? "Envoi…" : "Recevoir le lien"}
          </button>
        </>
      )}
    </form>
  );
}
