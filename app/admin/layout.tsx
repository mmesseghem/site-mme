import type { Metadata } from "next";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "../globals.css";
import "./admin.css";

// Espace d'administration : jamais dans les moteurs de recherche.
export const metadata: Metadata = {
  title: { default: "Administration", template: "%s — Administration MME" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="admin">{children}</body>
    </html>
  );
}
