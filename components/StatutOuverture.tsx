"use client";

// Carte « ouvert / fermé » en temps réel, posée sur la photo de l'accueil.
// Quand c'est fermé, elle met en avant la garde (1733) et les urgences (112).
// Avant le chargement du script (ou si le navigateur le bloque), elle affiche simplement les horaires.
import { useSyncExternalStore } from "react";
import { estOuvert } from "@/lib/horaires";
import { contact } from "@/lib/site";

export type TextesStatut = {
  horairesTitre: string;
  ouvertMaintenant: string;
  fermeActuellement: string;
  horairesSemaine: string;
  garde: string;
  libGarde: string;
  libUrgences: string;
};

// Revérifie chaque minute, pour passer de « ouvert » à « fermé » sans recharger la page.
function abonner(rappel: () => void) {
  const id = setInterval(rappel, 60_000);
  return () => clearInterval(id);
}

export default function StatutOuverture({ t }: { t: TextesStatut }) {
  const statut = useSyncExternalStore(
    abonner,
    () => (estOuvert() ? "ouvert" : "ferme"),
    () => "inconnu",
  );

  if (statut === "ferme") {
    return (
      <div className="carte-horaires ferme" role="status">
        <strong>{t.fermeActuellement}</strong>
        <span>{t.horairesSemaine}</span>
        <span className="carte-horaires-garde">
          <a href={contact.gardeLien}>
            {t.libGarde} : <b>{contact.garde}</b>
          </a>
          <a href={contact.urgencesLien}>
            {t.libUrgences} : <b>{contact.urgences}</b>
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className="carte-horaires" role="status">
      <strong>{statut === "ouvert" ? t.ouvertMaintenant : t.horairesTitre}</strong>
      <span>{t.horairesSemaine}</span>
      <span>{t.garde}</span>
    </div>
  );
}
