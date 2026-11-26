"use client";
import { useActionState } from "react";
import { inviter, type EtatSimple } from "../../actions";

export default function FormulaireInvitation() {
  const [etat, action, enCours] = useActionState<EtatSimple, FormData>(inviter, {});
  return (
    <form action={action} style={{ maxWidth: 480 }}>
      {etat.erreur && <p className="admin-erreur" role="alert">{etat.erreur}</p>}
      {etat.message && <p className="admin-message" role="status">{etat.message}</p>}
      <label>
        Nom affiché
        <input name="nom" required maxLength={80} />
      </label>
      <label>
        Adresse e-mail
        <input type="email" name="email" required />
      </label>
      <label>
        Rôle
        <select name="role" defaultValue="contenu">
          <option value="contenu">Contenu (newsletter, planning, inscriptions)</option>
          <option value="lecture">Lecture seule</option>
          <option value="administrateur">Administrateur (tous les droits)</option>
        </select>
      </label>
      <button type="submit" className="admin-bouton" disabled={enCours}>
        {enCours ? "Envoi…" : "Envoyer l'invitation"}
      </button>
    </form>
  );
}
