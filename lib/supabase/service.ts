// Connexion « de service » à Supabase : contourne les règles de sécurité de la base.
// Uniquement côté serveur, et uniquement pour deux usages précis :
//   1. enregistrer la copie de secours d'une demande de médicaments (le patient n'a pas de compte) ;
//   2. inviter une personne et lire les adresses e-mail des comptes (après vérification que c'est l'administrateur).
// La clé SUPABASE_SERVICE_ROLE_KEY ne doit JAMAIS être envoyée au navigateur ni écrite dans le code.
// Ne jamais importer ce fichier dans un composant « use client ».
import { createClient } from "@supabase/supabase-js";

export function serviceConfigure(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function clientService() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
