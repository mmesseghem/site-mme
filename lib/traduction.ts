// Traduction automatique avec DeepL, pour proposer les versions NL et EN de la newsletter
// (Séverine relit toujours avant de publier). Utilisé uniquement côté serveur : la clé ne quitte jamais le serveur.
// Ne jamais y envoyer de données de patients. Ne jamais importer ce fichier dans un composant « use client ».

export type LangueCible = "nl" | "en";

const codesDeepL: Record<LangueCible, string> = { nl: "NL", en: "EN-GB" };

/** Traduit des textes du français vers la langue demandée. Renvoie null si DeepL n'est pas configuré. */
export async function traduire(textes: string[], vers: LangueCible): Promise<string[] | null> {
  const cle = process.env.DEEPL_API_KEY;
  if (!cle || textes.length === 0) return null;
  // Les clés de la formule gratuite finissent par « :fx » et utilisent une autre adresse.
  const adresse = cle.endsWith(":fx") ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
  const reponse = await fetch(adresse, {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text: textes, source_lang: "FR", target_lang: codesDeepL[vers], preserve_formatting: true }),
    cache: "no-store",
  });
  if (!reponse.ok) throw new Error(`DeepL : traduction refusée (code ${reponse.status})`);
  const donnees = (await reponse.json()) as { translations: { text: string }[] };
  return donnees.translations.map((t) => t.text);
}
