// Petites icônes au trait pour le planning (catégories, lieu, heure). Dessinées à la main, aucune bibliothèque externe.
// Les noms (« bouger », « enfants »…) sont ceux que Séverine choisit pour une catégorie : en ajouter un ici le rend disponible.

const traces: Record<string, React.ReactNode> = {
  etoile: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" />,
  bouger: (
    <>
      <circle cx="14" cy="4.5" r="1.8" />
      <path d="M7 20l3-5 3 2 1-5 3 3h3M9 9l3.5-1.5 2 3.5" />
    </>
  ),
  discussion: <path d="M4 5h12v8H9l-4 3v-3H4zM18 9h2v8h-1v3l-4-3h-4v-2" />,
  enfants: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M10.5 7.5h.01M13.5 7.5h.01M10.8 9.6c.7.5 1.7.5 2.4 0M6 21c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" />
    </>
  ),
  cuisine: <path d="M6 3v6a2 2 0 0 0 4 0V3M8 3v18M16 3c-1.7 1-2.5 3-2.5 6s1 3 2.5 3v9" />,
  nature: <path d="M12 21v-7M12 14l-6-1 3-4-2-1 7-6 7 6-2 1 3 4z" />,
  coeur: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.5h.01" />
    </>
  ),
  creatif: <path d="M14.5 4.5l5 5L10 19l-5.5.5.5-5.5zM12.5 6.5l5 5" />,
  musique: (
    <>
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="15" r="2.5" />
      <path d="M9.5 17V6l10-2v11" />
    </>
  ),
  prevention: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  // Pictogrammes pratiques (pas proposés comme catégorie)
  maison: <path d="M4 11l8-7 8 7v9H4zM10 20v-5h4v5" />,
  dehors: <path d="M12 21v-6M7 15h10l-5-11zM4 21h16" />,
  horloge: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  repete: <path d="M4 10a7 7 0 0 1 12.5-4L19 8M19 4v4h-4M20 14a7 7 0 0 1-12.5 4L5 16M5 20v-4h4" />,
  calendrier: <path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" />,
  liste: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  public: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.5a3 3 0 0 1 0 5.5M17 14a5 5 0 0 1 3.5 5" />
    </>
  ),
};

/** Icônes proposées pour les catégories, avec leur nom dans l'espace d'administration. */
export const iconesCategories: { cle: string; nom: string }[] = [
  { cle: "etoile", nom: "Étoile" },
  { cle: "bouger", nom: "Bouger" },
  { cle: "discussion", nom: "Discussion" },
  { cle: "enfants", nom: "Enfants" },
  { cle: "cuisine", nom: "Cuisine" },
  { cle: "nature", nom: "Nature" },
  { cle: "coeur", nom: "Cœur" },
  { cle: "info", nom: "Information" },
  { cle: "creatif", nom: "Créatif" },
  { cle: "musique", nom: "Musique" },
  { cle: "prevention", nom: "Prévention" },
];

export default function IconePlanning({ nom, taille = 20 }: { nom: string; taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ flex: "none" }}>
      {traces[nom] ?? traces.etoile}
    </svg>
  );
}
