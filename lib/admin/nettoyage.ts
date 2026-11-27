// Nettoyage des données envoyées par l'éditeur (newsletter, planning) avant de les écrire dans la base.
// On ne fait jamais confiance au navigateur : longueurs limitées, types vérifiés, liens filtrés.
import { langues, type Bloc, type Textes, type TypeBloc } from "@/lib/newsletter";

const types: TypeBloc[] = ["titre", "texte", "encadre", "bouton"];

export function nettoyerTextes(t: unknown, max: number): Textes {
  const src = (t ?? {}) as Record<string, unknown>;
  const r = { fr: "", nl: "", en: "" } as Textes;
  for (const l of langues) r[l] = typeof src[l] === "string" ? (src[l] as string).slice(0, max) : "";
  return r;
}

export function nettoyerBlocs(blocs: unknown): Bloc[] {
  if (!Array.isArray(blocs)) return [];
  return blocs.slice(0, 40).flatMap((b) => {
    const x = b as Partial<Bloc>;
    if (!x || !types.includes(x.type as TypeBloc)) return [];
    const bloc: Bloc = { id: String(x.id ?? crypto.randomUUID()).slice(0, 40), type: x.type as TypeBloc, textes: nettoyerTextes(x.textes, 4000) };
    // Liens : uniquement vers une page du site (/…) ou une adresse https sûre.
    if (x.type === "bouton" && typeof x.lien === "string" && /^(\/[^\s]*|https:\/\/[^\s]+)$/.test(x.lien)) bloc.lien = x.lien.slice(0, 300);
    return [bloc];
  });
}
