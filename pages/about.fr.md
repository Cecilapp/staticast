---
title: À propos
description: "Staticast est une Progressive Web App prête à l’emploi pour publier votre podcast, avec un flux RSS prêt pour les plateformes de diffusion."
menu:
  main:
    weight: 999
---

_Staticast_ est une Progressive Web App prête à l’emploi pour publier votre podcast, avec un flux RSS prêt pour les plateformes de diffusion.

Ce site est une démo : les épisodes sont fictifs, mais tout le reste correspond exactement à ce que vous obtenez par défaut.

## Fonctionnalités

- **Flux RSS de podcast** compatible avec Apple Podcasts, Spotify et les autres plateformes, avec une feuille de style pour l’afficher joliment dans les navigateurs
- **Lecteur audio persistant** : naviguez sur le site sans interrompre l’épisode en cours d’écoute, et reprenez là où vous vous êtes arrêté
- **Progressive Web App** : installable sur mobile et ordinateur, fonctionne hors ligne
- **Recherche** parmi tous les épisodes
- **Multilingue** : anglais et français par défaut
- **Thèmes clair et sombre**
- **Rapide et sécurisé** : un site statique, sans base de données, hébergeable n’importe où

## Comment ça marche ?

1. Ajoutez vos fichiers MP3 dans le dossier `assets`
2. Rédigez un fichier Markdown par épisode dans `pages/episodes`
3. Configurez votre podcast dans `cecil.yml`
4. Générez le site et publiez-le chez votre hébergeur préféré (ou déployez-le sur [Netlify](https://www.netlify.com) ou [Vercel](https://vercel.com) en un clic)

## Crédits

_Staticast_ est construit avec [Cecil](https://cecil.app), un générateur de site statique simple et puissant, et [Tailwind CSS](https://tailwindcss.com).

C’est un logiciel libre distribué sous licence MIT, créé par [Arnaud Ligny](https://arnaudligny.fr).

Consultez le [projet GitHub](https://github.com/Cecilapp/staticast#readme) pour plus de détails.
