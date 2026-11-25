"use client";

// Contour de la maison du logo, qui se dessine quand la section « Notre philosophie » apparaît à l'écran.
// L'animation est désactivée pour les personnes qui ont demandé à réduire les animations.
import { useEffect, useRef, useState } from "react";

export default function MaisonAnimee() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`philosophie-maison${visible ? " visible" : ""}`}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M60 560 V250 L90 225 V120 H150 V180 L330 40 L540 210 V560"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
