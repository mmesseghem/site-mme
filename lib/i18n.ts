// Langues du site. Le français est la langue par défaut.
export const locales = ["fr", "nl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Construit une adresse dans la bonne langue : href("nl", "/contact") -> "/nl/contact"
export function href(lang: Locale, path = "/"): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Typographie : espace avant les deux-points en français seulement.
export function deuxPoints(lang: Locale): string {
  return lang === "fr" ? " : " : ": ";
}
