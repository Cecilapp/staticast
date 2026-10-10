---
title: About
description: "Staticast is a ready to use Progressive Web App to publish your podcast, with an RSS feed ready for syndication platforms."
menu:
  main:
    weight: 999
---

_Staticast_ is a ready to use Progressive Web App to publish your podcast, with an RSS feed ready for syndication platforms.

This website is a demo: the episodes are fake, but everything else is exactly what you get out of the box.

## Features

- **Podcast RSS feed** compatible with Apple Podcasts, Spotify and other platforms, with a style sheet to display it nicely in browsers
- **Persistent audio player**: browse the website without interrupting the episode you are listening to, and resume where you left off
- **Progressive Web App**: installable on mobile and desktop, works offline
- **Search** through all the episodes
- **Multilingual**: English and French out of the box
- **Light and dark themes**
- **Fast and secure**: a static website, without database, that can be hosted anywhere

## How does it work?

1. Add your MP3 files in the `assets` directory
2. Write a Markdown file for each episode in `pages/episodes`
3. Configure your podcast in `cecil.yml`
4. Build the website and publish it to your favorite host (or deploy it to [Netlify](https://www.netlify.com) or [Vercel](https://vercel.com) in one click)

## Credits

_Staticast_ is built with [Cecil](https://cecil.app), a simple and powerful static site generator, and [Tailwind CSS](https://tailwindcss.com).

It is a free software distributed under the terms of the MIT license, created by [Arnaud Ligny](https://arnaudligny.fr).

See the [GitHub project](https://github.com/Cecilapp/staticast#readme) for details.
