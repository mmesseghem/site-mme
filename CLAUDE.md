# CLAUDE.md — site de la Maison Médicale Esseghem (MME)

Ce fichier est lu par Claude Code au début de chaque session. Il est écrit en français : les personnes qui travaillent sur ce dépôt (Michaël, kiné et référent technique ; Séverine, responsable du contenu) ne sont pas informaticiennes de métier. Réponds en français, sans jargon. Si un terme technique est nécessaire, explique-le en une phrase.

## Le projet
Site vitrine de la MME (ASBL, Rue Esseghem 24, 1090 Jette), en Next.js, déployé sur Vercel à partir de ce dépôt GitHub. Trois langues : français, néerlandais, anglais. Un espace d'administration (Supabase, données hébergées en Europe) est prévu pour le planning des activités, la newsletter et les inscriptions.

Le contexte complet (décisions, inventaire de l'ancien site, historique) est dans le projet Claude « Site internet » (fichier `Contexte_Projet_Site_MME_v2`). Il n'est volontairement pas copié dans ce dépôt public, car il contient des informations internes (comptes, domaines, piratage de l'ancien site). Les repères utiles au code sont résumés ci-dessous. Si une information manque ou semble dépassée, demande-la au lieu de la deviner.

Commandes utiles :
- `npm run dev` : lance le site en local pour le regarder pendant le travail (http://localhost:3000).
- `npm run lint` : vérifie que le code est propre.
- `npm run build` : construit le site comme Vercel le fera ; doit passer sans erreur avant toute pull request.

Organisation du code :
- `app/[lang]/` : les pages, une version par langue (`/fr`, `/nl`, `/en`).
- `content/dictionnaires.ts` : tous les textes du site dans les trois langues.
- `lib/site.ts` : coordonnées et structure du menu.
- `components/` : en-tête, pied de page et éléments réutilisés.
- `app/globals.css` : la charte graphique (couleurs, polices, mise en page).
- Version de Next.js récente : lis `AGENTS.md` et la documentation dans `node_modules/next/dist/docs/` avant d'écrire du code.

## Repères
- **Coordonnées** : Rue Esseghem 24, 1090 Jette · 02 424 25 40 · fax 02 420 36 90 · info@mmesseghem.be · lundi–vendredi 8h–19h · en dehors des heures : garde bruxelloise 1733.
- **Design** : la version 1 de la maquette est la base. Repris de la version premium : les cartes numérotées d'accès rapide (Prendre rendez-vous / Demander un médicament / Devenir patient), la section « Nous trouver » (coordonnées + photo de la façade), la section « Notre philosophie » et son animation. À ne pas reprendre : le trait-maison (ligne interrompue après la maison) et le slider « maman + enfant ».
- **Charte** : bordeaux #6C0E0F (principal), #4E0A0B (foncé) ; vert #189144 (accent), #137A39 pour les petits textes ; gris #5E5F62 ; encre #2A1A1B ; fonds #FBF9F8, #F6EEEE, #EAF5ED. Polices : Outfit (titres), Figtree (texte). Libellés en majuscules espacées, comme le logo.
- **Menu** (version 1) : Accueil · L'équipe · En pratique · Nos actions en santé · Contacts, plus le bouton téléphone.
  - *L'équipe* (9 pôles, dans cet ordre) : Accueil, Médecine générale, Kinésithérapie, Pôle infirmier, Psychologue, Assistante sociale, Logopédie, Actrices en santé, Pôle administratif.
  - *En pratique* : Demande de médicament(s), S'inscrire à la maison médicale, FAQ, Newsletter.
  - *Nos actions en santé* : Planning des activités, La récré, Psychomotricité relationnelle.
  - *Notre philosophie* et *Historique* : accessibles depuis l'accueil et le pied de page.
- **Photos** : en priorité les vraies photos de la MME. Banques d'images gratuites seulement pour des visuels neutres.

## Qui modifie quoi
- **Michaël** : référent technique. Le code est modifié avec Claude Code, via des branches et des pull requests.
- **Séverine** : contenu, via l'espace d'administration. Elle publie elle-même, sans validation de Michaël : la newsletter, les nouvelles activités du planning, et la gestion des inscriptions. Le site doit le permettre sans aucune intervention technique.
- **Garde-fou** (règles précises à définir lors de la conception de l'espace d'administration) : toute action qui modifie la structure du site ou supprime une page demande une confirmation ou une validation.

## Le dépôt est public
Tout ce qui est écrit ici peut être lu par n'importe qui. Il ne doit donc jamais contenir de mot de passe, de clé d'accès, de jeton ni de donnée de patient. Les secrets vivent uniquement dans les variables d'environnement de Vercel et dans un fichier `.env.local` ignoré par Git. Si tu en vois un dans le code, signale-le tout de suite.

## Façon de travailler
- Michaël travaille depuis plusieurs endroits (ordinateur fixe, portable, Claude Code dans le cloud). Au début de chaque session, récupère la dernière version du dépôt ; à la fin, envoie le travail sur GitHub, pour que rien ne reste coincé sur un seul ordinateur.
- Travaille toujours sur une branche séparée, jamais directement sur la branche principale. Propose la modification via une pull request. Vercel crée alors un lien de prévisualisation : donne-le à la personne.
- Avant de proposer une mise en ligne, passe la liste de contrôle ci-dessous et indique le résultat de chaque point (OK, à corriger, ou non applicable).
- Demande confirmation avant de créer un document ou un fichier qui n'est pas du code du site.
- Explique en une ou deux phrases ce que tu as changé et pourquoi, en termes simples.
- Quand une décision change, propose de mettre à jour ce fichier.

## Liste de contrôle avant publication
1. **Cohérence** : charte respectée (couleurs et polices ci-dessus), structure du menu, style de la maquette version 1.
2. **Langues** : contenu complet en FR, NL et EN, aucune page à moitié traduite.
3. **Secrets** : aucun secret dans le code ni dans l'historique Git.
4. **Données personnelles** : aucune nouvelle collecte sans mention RGPD et sans l'accord de Michaël.
5. **Sécurité** : pas de dépendance inutile ou douteuse, anti-spam sur les formulaires, pas de lien externe suspect.
6. **Accessibilité et mobile** : textes lisibles, images avec description, affichage correct sur téléphone.
7. **Contrôles automatiques** : `npm run build` et `npm run lint` passent, et les vérifications de GitHub sont au vert.
8. **Contenu** : pas de restes de thème ou de démo, pas de lien cassé, coordonnées exactes (voir Repères).

Si un point n'est pas OK, ne propose pas la mise en ligne : explique le problème et propose une correction.

## Changements qui demandent l'accord de Michaël
Prépare la modification, puis arrête-toi et demande son accord avant de la fusionner, si elle touche :
- le formulaire de médicaments ou tout formulaire qui recueille des données de santé ;
- la connexion à l'espace d'administration, les droits d'accès, les comptes ;
- la base de données Supabase et la conservation des données ;
- les variables secrètes, les réglages Vercel ou GitHub, les workflows automatiques (sauf les vérifications automatiques, voir ci-dessous) ;
- les domaines, DNS et adresses e-mail.

Exception, accord permanent de Michaël : les **vérifications automatiques** (fichiers de `.github/workflows/` qui contrôlent le code : lint, construction, audit de sécurité, tests) peuvent être ajoutées ou ajustées sans lui demander, à condition qu'elles ne fassent que vérifier : droits en lecture seule, aucun secret utilisé, aucune publication ni déploiement. Ne jamais supprimer ou affaiblir une vérification existante sans son accord.

Tout le reste (textes, pages, sections, images, mise en page) peut être fusionné une fois la liste de contrôle passée et les vérifications automatiques au vert.

## À ne jamais faire
- Modifier la branche principale directement, ou contourner les vérifications automatiques.
- Toucher aux DNS ou aux adresses e-mail de la MME sans le prestataire informatique.
- Publier des données de patients ou inventer des informations médicales ou des horaires.
- Remettre en ligne les restes de l'ancien site (liens cachés, pages de démo, plugins abandonnés).
