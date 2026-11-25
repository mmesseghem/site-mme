// Registre des pages de contenu, par adresse (sans la langue) : "equipe/kinesitherapie", "philosophie"…
// Une adresse absente d'ici affiche la page provisoire « en préparation ».
import { pagesActions } from "./actions";
import { pagesDivers } from "./divers";
import { pagesEquipe } from "./equipe";
import { pagesMaison } from "./maison";
import { pagesPratique } from "./pratique";
import type { PageTraduite } from "./types";

export const pagesContenu: Record<string, PageTraduite> = {
  ...pagesEquipe,
  ...pagesPratique,
  ...pagesActions,
  ...pagesMaison,
  ...pagesDivers,
};
