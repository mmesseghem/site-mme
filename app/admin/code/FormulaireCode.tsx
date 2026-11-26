"use client";
import { useActionState, useState } from "react";
import { preparerCode, verifierCode, type EtatCode } from "../actions";

export default function FormulaireCode({ premiereFois }: { premiereFois: boolean }) {
  const [etat, action, enCours] = useActionState<EtatCode, FormData>(verifierCode, {});
  const [relier, setRelier] = useState<EtatCode | null>(null);
  const [prep, setPrep] = useState(false);

  if (premiereFois && !relier) {
    return (
      <>
        <p className="admin-aide">
          Première connexion : reliez une application de codes à votre téléphone (par exemple Google Authenticator ou
          Microsoft Authenticator, gratuites). Elle affichera un nouveau code à 6 chiffres toutes les 30 secondes.
        </p>
        <button
          type="button"
          className="admin-bouton"
          disabled={prep}
          onClick={async () => {
            setPrep(true);
            setRelier(await preparerCode());
            setPrep(false);
          }}
        >
          {prep ? "Préparation…" : "Relier mon téléphone"}
        </button>
      </>
    );
  }

  return (
    <form action={action}>
      {relier?.erreur && <p className="admin-erreur">{relier.erreur}</p>}
      {relier?.qr && (
        <>
          <p className="admin-aide">Dans l&apos;application, choisissez « ajouter un compte », puis scannez ce code :</p>
          {/* eslint-disable-next-line @next/next/no-img-element -- image générée par Supabase (SVG), pas un fichier du site */}
          <img className="admin-qr" src={relier.qr} alt="Code QR à scanner avec l'application de codes" />
          <p className="admin-petit">Impossible de scanner ? Saisissez cette clé dans l&apos;application :</p>
          <p className="admin-code-secret">{relier.secret}</p>
          <input type="hidden" name="factorId" value={relier.factorId} />
        </>
      )}
      {!relier && <p className="admin-aide">Entrez le code à 6 chiffres affiché dans l&apos;application de votre téléphone.</p>}
      {etat.erreur && <p className="admin-erreur" role="alert">{etat.erreur}</p>}
      <label>
        Code
        <input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]{6,7}" required maxLength={7} />
      </label>
      <button type="submit" className="admin-bouton" disabled={enCours}>
        {enCours ? "Vérification…" : "Valider"}
      </button>
    </form>
  );
}
