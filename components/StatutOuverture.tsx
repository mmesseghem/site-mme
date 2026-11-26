"use client";

// Carte « ouvert / fermé » en temps réel, posée sur la photo de l'accueil.
// Ouvert : annonce l'heure de fermeture (compte à rebours la dernière heure).
// Fermé : annonce la prochaine ouverture et met en avant la garde (1733) et les urgences (112).
// Avant le chargement du script (ou si le navigateur le bloque), elle affiche simplement les horaires.
import { useSyncExternalStore } from "react";
import { statutOuverture } from "@/lib/horaires";
import { deuxPoints, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site";

export type TextesStatut = {
  horairesTitre: string;
  ouvertMaintenant: string;
  fermeActuellement: string;
  horairesSemaine: string;
  garde: string;
  libGarde: string;
  libUrgences: string;
  fermeA: string; // « Ferme à {heure} »
  fermeBientot: string; // « Ferme dans {min} min, à {heure} »
  rouvre: string; // « Rouvre {quand} à {heure} »
  aujourdhui: string;
  demain: string;
  prefixeJour: string; // « op » en néerlandais, « on » en anglais, rien en français
};

// Revérifie toutes les 30 secondes, pour suivre l'heure sans recharger la page.
function abonner(rappel: () => void) {
  const id = setInterval(rappel, 30_000);
  return () => clearInterval(id);
}

// Instantané comparable (une chaîne), recalculé à chaque vérification.
function instantane(): string {
  return JSON.stringify(statutOuverture());
}

function formatHeure(lang: Locale, heure: number): string {
  if (lang === "en") return `${heure % 12 || 12} ${heure < 12 ? "am" : "pm"}`;
  if (lang === "nl") return `${heure} uur`;
  return `${heure} h`;
}

// Formats de date régionaux : belge pour le français et le néerlandais, britannique pour l'anglais.
const regions: Record<Locale, string> = { fr: "fr-BE", nl: "nl-BE", en: "en-GB" };

function remplir(modele: string, valeurs: Record<string, string>): string {
  return modele.replace(/\{(\w+)\}/g, (_, k: string) => valeurs[k] ?? "");
}

export default function StatutOuverture({ t, lang }: { t: TextesStatut; lang: Locale }) {
  const brut = useSyncExternalStore(abonner, instantane, () => "");

  if (!brut) {
    return (
      <div className="carte-horaires">
        <strong>{t.horairesTitre}</strong>
        <span>{t.horairesSemaine}</span>
        <span>{t.garde}</span>
      </div>
    );
  }

  const s = statutOuverture();

  if (s.ouvert) {
    const heure = formatHeure(lang, s.fermeA);
    const detail =
      s.minutesRestantes <= 60
        ? remplir(t.fermeBientot, { min: String(s.minutesRestantes), heure })
        : remplir(t.fermeA, { heure });
    return (
      <div className="carte-horaires" role="status">
        <strong>{t.ouvertMaintenant}</strong>
        <span className={`statut-detail${s.minutesRestantes <= 60 ? " bientot" : ""}`}>{detail}</span>
        <span>{t.horairesSemaine}</span>
        <span>{t.garde}</span>
      </div>
    );
  }

  let detail = "";
  if (s.prochaine) {
    const p = s.prochaine;
    const quand =
      p.dansJours === 0
        ? t.aujourdhui
        : p.dansJours === 1
          ? t.demain
          : `${t.prefixeJour}${new Intl.DateTimeFormat(regions[lang], {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            }).format(p.jour)}`;
    detail = remplir(t.rouvre, { quand, heure: formatHeure(lang, p.heure) });
  }

  return (
    <div className="carte-horaires ferme" role="status">
      <strong>{t.fermeActuellement}</strong>
      {detail && <span className="statut-detail">{detail}</span>}
      <span className="carte-horaires-garde">
        <a href={contact.gardeLien}>
          {t.libGarde}
          {deuxPoints(lang)}
          <b>{contact.garde}</b>
        </a>
        <a href={contact.urgencesLien}>
          {t.libUrgences}
          {deuxPoints(lang)}
          <b>{contact.urgences}</b>
        </a>
      </span>
    </div>
  );
}
