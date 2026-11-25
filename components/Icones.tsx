// Petites icônes au trait pour les soins (dessinées à la main, aucune bibliothèque externe).
import type { SoinSlug } from "@/lib/site";

const traces: Record<SoinSlug, React.ReactNode> = {
  "medecine-generale": <path d="M12 5v14M5 12h14" />,
  "pole-infirmier": (
    <>
      <path d="M15 4l5 5M17.5 6.5l2-2" />
      <path d="M16 8l-8.5 8.5-3 .5.5-3L13.5 5.5z" />
      <path d="M11 8l2 2M9 10l2 2" />
    </>
  ),
  kinesitherapie: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M5 9l7 1.5L19 9M12 10.5V15M8 21l4-6 4 6" />
    </>
  ),
  psychologue: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  logopedie: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
  ergotherapie: <path d="M4 11l8-7 8 7v9H4zM10 20v-5h4v5" />,
  "assistante-sociale": (
    <>
      <circle cx="8.5" cy="7" r="2.5" />
      <circle cx="16" cy="8" r="2" />
      <path d="M3.5 19a5 5 0 0 1 10 0M14 14a4 4 0 0 1 6.5 3.2" />
    </>
  ),
};

export default function IconeSoin({ soin }: { soin: SoinSlug }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {traces[soin]}
    </svg>
  );
}

// Icônes du bloc d'infos pratiques.
const tracesInfos = {
  adresse: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  contact: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  horaires: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function IconeInfo({ type }: { type: keyof typeof tracesInfos }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {tracesInfos[type]}
    </svg>
  );
}
