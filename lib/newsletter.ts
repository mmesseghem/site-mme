// Newsletter : forme des données (partagée entre l'éditeur et le site). La lecture des numéros publiés est dans newsletter-publique.ts.
import type { Locale } from "@/lib/i18n";

export type Textes = Record<Locale, string>;
export type TypeBloc = "titre" | "texte" | "encadre" | "bouton";
export type Bloc = { id: string; type: TypeBloc; textes: Textes; lien?: string };
export type Numero = {
  id: string; numero: number | null; titre: Textes; blocs: Bloc[];
  statut: "brouillon" | "programmee" | "publiee"; publiee_le: string | null; modifiee_le: string;
};

export const langues: Locale[] = ["fr", "nl", "en"];
export const libellesBlocs: Record<TypeBloc, string> = {
  titre: "Intertitre", texte: "Texte", encadre: "Encadré (à noter)", bouton: "Bouton (lien)",
};
export const textesVides = (): Textes => ({ fr: "", nl: "", en: "" });

/** Liste des langues encore incomplètes d'un numéro (titre ou bloc vide). */
export function languesManquantes(n: Pick<Numero, "titre" | "blocs">): Locale[] {
  return langues.filter((l) => !n.titre[l]?.trim() || n.blocs.some((b) => !b.textes[l]?.trim()));
}

