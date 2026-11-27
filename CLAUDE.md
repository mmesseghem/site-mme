# CLAUDE.md — site de la Maison Médicale Esseghem (MME)

Ce fichier est lu par Claude Code au début de chaque session. Il est écrit en français : les personnes qui travaillent sur ce dépôt (Michaël, kiné et référent technique ; Séverine, responsable du contenu) ne sont pas informaticiennes de métier. Réponds en français, sans jargon. Si un terme technique est nécessaire, explique-le en une phrase.

## Le projet
Site vitrine de la MME (ASBL, Rue Esseghem 24, 1090 Jette), en Next.js, déployé sur Vercel à partir de ce dépôt GitHub. Trois langues : français, néerlandais, anglais. Un espace d'administration (Supabase, données hébergées en Europe) est en construction pour le planning des activités, la newsletter, les inscriptions et le suivi des demandes de médicaments. Les e-mails partent par Mailjet ; la traduction de la newsletter utilise DeepL.

Le contexte complet (décisions, inventaire de l'ancien site, historique) est dans le projet Claude « Site internet » (fichier `Contexte_Projet_Site_MME_v2`). Il n'est volontairement pas copié dans ce dépôt public, car il contient des informations internes (comptes, domaines, piratage de l'ancien site). Les repères utiles au code sont résumés ci-dessous. Si une information manque ou semble dépassée, demande-la au lieu de la deviner.

Commandes utiles :
- `npm run dev` : lance le site en local pour le regarder pendant le travail (http://localhost:3000).
- `npm run lint` : vérifie que le code est propre.
- `npm run build` : construit le site comme Vercel le fera ; doit passer sans erreur avant toute pull request.

Organisation du code :
- `app/[lang]/` : les pages, une version par langue (`/fr`, `/nl`, `/en`).
- `app/[lang]/[...chemin]/page.tsx` : toutes les pages intérieures (contenu tiré de `content/pages/`, sinon page « en préparation »).
- `content/dictionnaires.ts` : les textes communs du site (menu, accueil, pied de page) dans les trois langues.
- `content/pages/` : le contenu des pages intérieures, en blocs (paragraphe, liste, étapes, encadré, FAQ…), affiché par `components/Contenu.tsx`. Étiquettes « à vérifier » (orange) et « à compléter » (jaune) pour ce que l'équipe doit relire.
- `content/formulaires.ts` et `app/actions/medicaments.ts` : le formulaire de demande de médicaments (textes, puis envoi par e-mail via Mailjet).
- `lib/site.ts` : coordonnées, horaires, structure du menu, et les réglages simples : `alerte` (bandeau en haut du site), `inscriptionsOuvertes` (page « S'inscrire »), `medecins` (liste du formulaire ; vide = champ masqué).
- `lib/horaires.ts` : le statut d'ouverture en temps réel (heure de Bruxelles, jours fériés belges).
- `supabase/migrations/` : la structure de la base de données de l'espace d'administration et ses règles de sécurité. Fichiers déjà appliqués dans Supabase : `0001_fondations.sql`, `0002_planning.sql`.
- `lib/planning.ts` : le planning (règle de répétition, calcul des séances, temps forts) ; `lib/planning-public.ts` : lecture des activités publiées ; `components/planning/` : page publique, fiche d'activité, bloc de l'accueil ; `app/admin/planning-actions.ts` et `app/admin/(prive)/planning/` : l'éditeur de l'espace d'administration ; `content/planning.ts` : les textes fixes du planning (FR/NL/EN).
- `.env.example` : la liste des réglages secrets à saisir dans Vercel (sans aucune valeur).
- `components/` : en-tête, pied de page et éléments réutilisés.
- `app/globals.css` : la charte graphique (couleurs, polices, mise en page).
- Version de Next.js récente : lis `AGENTS.md` et la documentation dans `node_modules/next/dist/docs/` avant d'écrire du code.

## Repères
- **Coordonnées** : Rue Esseghem 24, 1090 Jette · 02 424 25 40 · fax 02 420 36 90 · info@mmesseghem.be · lundi–vendredi 8h–19h · en dehors des heures : garde bruxelloise 1733.
- **Design** : la version 1 de la maquette est la base ; l'accueil suit la **version B** (choisie le 26/11/2026) : bandeau d'alerte ; boutons « Prendre un rendez-vous : 02 424 25 40 » et « Demander un médicament » empilés avec le statut d'ouverture à côté ; photo de la façade ; bloc d'infos (adresse, contact, horaires) ; encadré urgences (1733, 112) ; « Je souhaite… » (01 médicament, 02 FAQ, 03 inscription) ; nos soins ; soins au forfait ; activités et La Récré ; philosophie. Repris de la version premium : les cartes numérotées d'accès rapide (Prendre rendez-vous / Demander un médicament / Devenir patient), la section « Nous trouver » (coordonnées + photo de la façade), la section « Notre philosophie » et son animation. À ne pas reprendre : le trait-maison (ligne interrompue après la maison) et le slider « maman + enfant ».
- **Charte** : bordeaux #6C0E0F (principal), #4E0A0B (foncé) ; vert #189144 (accent), #137A39 pour les petits textes ; gris #5E5F62 ; encre #2A1A1B ; fonds #FBF9F8, #F6EEEE, #EAF5ED. Polices : Outfit (titres), Figtree (texte). Libellés en majuscules espacées, comme le logo.
- **Menu** (version 1) : Accueil · L'équipe · En pratique · Nos actions en santé · Contacts, plus le bouton téléphone.
  - *L'équipe* (10 pôles, dans cet ordre) : Accueil, Médecine générale, Kinésithérapie, Pôle infirmier, Psychologue, Assistante sociale, Logopédie, Ergothérapie, Actrices en santé, Pôle administratif.
  - *En pratique* : Demande de médicament(s), S'inscrire à la maison médicale, FAQ, Newsletter.
  - *Nos actions en santé* : Planning des activités, La récré, Psychomotricité relationnelle.
  - *Notre philosophie* et *Historique* : accessibles depuis l'accueil et le pied de page.
- **Inscriptions des patients** : fermées, sans liste d'attente (`inscriptionsOuvertes = false`). Si cela change, mettre aussi à jour la carte « S'inscrire » de l'accueil dans le dictionnaire.
- **Formulaire de médicaments** : envoi par e-mail (Mailjet) à l'adresse réglée dans Vercel ; en « mode test » tant que les réglages manquent ; anti-spam (champ piège, délai minimum, limite par appareil) ; jamais de faux « envoyé ».
- **Espace d'administration** (décisions du 26/11/2026) : comptes sur invitation seulement (Michaël administrateur), connexion par lien e-mail + code sur le téléphone, rôles (administrateur, contenu, accueil, lecture), journal des actions, demandes de médicaments gardées 30 jours puis effacées. La sécurité passe avant tout : l'ancien site a été piraté par un accès d'administration.
- **Newsletter** : écrite dans l'espace d'administration, publiée à la fois sur le site et par e-mail (Mailjet garde les inscrits). Trois langues ; chaque inscrit reçoit la sienne (français par défaut, lien pour changer). Traduction proposée par DeepL et relue avant publication ; publication bloquée tant qu'une langue manque.
- **Planning des activités** (décisions du 27/11/2026) : géré par Séverine dans l'espace d'administration, sans Google Agenda. Catégories créées par l'équipe (nom FR/NL/EN, une des 3 couleurs de la charte, une icône) ; une catégorie utilisée se masque au lieu d'être supprimée. Une activité = une règle de répétition (une fois ; chaque semaine, jours au choix, toutes les N semaines ; chaque mois, date fixe ou « 2e mardi » ; fin à une date ou après N séances), plus pauses et séances annulées ou déplacées. **Temps forts** (activités exceptionnelles, cochées d'office si ponctuelles) : mis en avant dans « À ne pas manquer » et en tête de l'accueil, 2 mois avant par défaut ou dès la date choisie. Inscription : informations seulement (comment, date limite, places) ; l'inscription en ligne viendra plus tard avec sa mention RGPD. Page publique : vue Liste en trois parties (À ne pas manquer / Chaque semaine, uniquement les hebdomadaires / Agenda, où les mensuelles indiquent leur rythme) ou Calendrier ; « Déjà réalisé » montre les activités terminées depuis moins de 12 mois ; effacement automatique 2 ans après la dernière séance. Accueil : temps forts (2 au maximum) puis activités des 14 prochains jours, 4 lignes au total. Photos des activités : à faire avec celles de la newsletter.
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
- Une conversation par chantier (ou par branche) : en fin de chantier, propose de mettre à jour ce fichier et le fichier de contexte du projet Claude.
- La branche principale `main` contient tout le travail validé (contenu des pages, espace d'administration, planning : fusionnés le 27/11/2026). Pars de `main` pour chaque nouveau chantier.
- Base de données : un nouveau fichier dans `supabase/migrations/` n'est appliqué qu'à la main, par Michaël (Supabase > SQL Editor), après son accord. Teste-le d'abord sur une base d'essai et donne-lui le texte exact à coller. Claude n'a pas d'accès direct à Supabase (choix de sécurité).

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
