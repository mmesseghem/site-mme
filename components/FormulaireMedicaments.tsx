"use client";
// Formulaire de demande de médicaments (voir app/actions/medicaments.ts pour l'envoi).
import { useActionState, useEffect, useRef } from "react";
import { envoyerDemandeMedicaments, type ChampMedic, type EtatMedic } from "@/app/actions/medicaments";
import type { TextesFormulaire } from "@/content/formulaires";
import { medecins } from "@/lib/site";

const initial: EtatMedic = { statut: "initial" };

export default function FormulaireMedicaments({ t }: { t: TextesFormulaire }) {
  const [etat, action, enCours] = useActionState(envoyerDemandeMedicaments, initial);
  const debut = useRef<HTMLInputElement>(null);

  // Heure d'ouverture du formulaire (anti-spam : un robot remplit tout en une fraction de seconde).
  useEffect(() => {
    if (debut.current && !debut.current.value) debut.current.value = String(Date.now());
  });

  if (etat.statut === "envoye" || etat.statut === "demo") {
    const demo = etat.statut === "demo";
    return (
      <div className={`form-message ${demo ? "form-message-demo" : "form-message-ok"}`} role="status">
        <h2>{demo ? t.demoTitre : t.merciTitre}</h2>
        <p>{demo ? t.demo : t.merci}</p>
        <button type="button" className="bouton bouton-contour" onClick={() => window.location.reload()}>
          {t.nouvelle}
        </button>
      </div>
    );
  }

  const erreurs = etat.statut === "invalide" ? etat.erreurs : {};
  const valeurs = etat.statut === "invalide" ? etat.valeurs : {};
  const msg = (champ: ChampMedic) => {
    const code = erreurs[champ];
    return code ? (
      <span className="form-erreur" id={`err-${champ}`}>
        {t.erreurs[code]}
      </span>
    ) : null;
  };
  const aria = (champ: ChampMedic) =>
    erreurs[champ] ? { "aria-invalid": true as const, "aria-describedby": `err-${champ}` } : {};
  const requis = <span className="form-requis"> ({t.obligatoire})</span>;

  return (
    <form action={action} className="formulaire" noValidate>
      <h2>{t.titreFormulaire}</h2>

      {etat.statut === "invalide" && (
        <p className="form-alerte" role="alert">
          {t.erreurChamps}
        </p>
      )}
      {(etat.statut === "erreur" || etat.statut === "trop") && (
        <div className="form-alerte" role="alert">
          <strong>{t.erreurTitre}</strong>
          <p>{etat.statut === "trop" ? t.erreurTrop : t.erreurEnvoi}</p>
        </div>
      )}

      {/* Champ piège invisible pour les robots */}
      <div className="form-piege" aria-hidden="true">
        <label>
          Site web
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="debut" ref={debut} defaultValue="" />

      <div className="form-grille">
        <label className="form-champ">
          <span>{t.nom}{requis}</span>
          <input name="nom" required autoComplete="family-name" maxLength={120} defaultValue={valeurs.nom} {...aria("nom")} />
          {msg("nom")}
        </label>
        <label className="form-champ">
          <span>{t.prenom}{requis}</span>
          <input name="prenom" required autoComplete="given-name" maxLength={120} defaultValue={valeurs.prenom} {...aria("prenom")} />
          {msg("prenom")}
        </label>
        <label className="form-champ">
          <span>{t.naissance}{requis}</span>
          <input type="date" name="naissance" required autoComplete="bday" defaultValue={valeurs.naissance} {...aria("naissance")} />
          {msg("naissance")}
        </label>
        <label className="form-champ">
          <span>{t.telephone}{requis}</span>
          <input type="tel" name="telephone" required autoComplete="tel" maxLength={120} defaultValue={valeurs.telephone} {...aria("telephone")} />
          {msg("telephone")}
        </label>
        <label className="form-champ">
          <span>{t.email}</span>
          <input type="email" name="email" autoComplete="email" maxLength={120} defaultValue={valeurs.email} {...aria("email")} />
          {msg("email")}
        </label>
        <label className="form-champ">
          <span>{t.medecin}</span>
          <select name="medecin" defaultValue={valeurs.medecin ?? ""}>
            <option value="">{t.sansPreference}</option>
            {medecins.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-champ">
        <span>{t.medicaments}{requis}</span>
        <small className="form-aide" id="aide-medicaments">{t.aideMedicaments}</small>
        <textarea
          name="medicaments"
          rows={5}
          required
          maxLength={2000}
          defaultValue={valeurs.medicaments}
          aria-describedby={erreurs.medicaments ? "aide-medicaments err-medicaments" : "aide-medicaments"}
          aria-invalid={erreurs.medicaments ? true : undefined}
        />
        {msg("medicaments")}
      </label>

      <div className="form-rgpd">
        <strong>{t.rgpdTitre}</strong>
        <p>{t.rgpd}</p>
      </div>

      <label className="form-case">
        <input type="checkbox" name="consentement" value="oui" required {...aria("consentement")} />
        <span>{t.consentement}{requis}</span>
      </label>
      {msg("consentement")}

      <button type="submit" className="bouton bouton-plein" disabled={enCours}>
        {enCours ? t.envoi : t.envoyer}
      </button>
    </form>
  );
}
