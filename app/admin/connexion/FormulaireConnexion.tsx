"use client";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { envoyerLien, verifierCodeEmail, type EtatSimple } from "../actions";

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState<EtatSimple, FormData>(envoyerLien, {});
  const [etatCode, actionCode, verif] = useActionState<EtatSimple, FormData>(verifierCodeEmail, {});
  const [email, setEmail] = useState("");
  const params = useSearchParams();
  return (
    <>
      <form action={action}>
        {params.get("refuse") && <p className="admin-erreur">Ce compte est désactivé ou n&apos;existe pas.</p>}
        {params.get("lien") && <p className="admin-erreur">Ce lien n&apos;est plus valable. Demandez-en un nouveau.</p>}
        {etat.erreur && <p className="admin-erreur" role="alert">{etat.erreur}</p>}
        {etat.message && <p className="admin-message" role="status">{etat.message}</p>}
        <label>
          Adresse e-mail
          <input type="email" name="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" className="admin-bouton" disabled={enCours}>
          {enCours ? "Envoi…" : etat.message ? "Renvoyer un e-mail" : "Recevoir l'e-mail de connexion"}
        </button>
      </form>
      {etat.message && (
        <form action={actionCode}>
          <input type="hidden" name="email" value={email} />
          {etatCode.erreur && <p className="admin-erreur" role="alert">{etatCode.erreur}</p>}
          <label>
            Code reçu par e-mail
            <input name="token" inputMode="numeric" autoComplete="one-time-code" required maxLength={12} />
          </label>
          <button type="submit" className="admin-bouton" disabled={verif}>
            {verif ? "Vérification…" : "Valider le code"}
          </button>
        </form>
      )}
    </>
  );
}
