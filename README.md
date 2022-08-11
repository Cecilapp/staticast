# Staticast

_Staticast_ is a ready to use Progressive Web App to publish your podcast, with a RSS feed ready for syndication platforms, and a user friendly CMS.

[![Staticast preview](https://user-images.githubusercontent.com/80580/150656228-4e7b08e2-b3f3-4c54-9bb1-818260e88e19.png)](https://staticast.cecil.app)

## Installation

### Manually

_Staticast_ is a website generated by [Cecil](https://cecil.app), so you need to download and run Cecil to build your website, then you can publish it where you want.

1. Be sure PHP is available
2. [Download _Staticast_](https://github.com/Cecilapp/staticast/archive/master.zip) and install components with `composer install`
3. [Download `cecil.phar`](https://github.com/Cecilapp/Cecil/releases/latest/download/cecil.phar) and move it to the root of _Staticast_

### Automatically

Use the button to get your own copy of the repository on [Netlify](https://www.netlify.com).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Cecilapp/staticast&stack=cms)

This will setup everything needed for running your website, with a CMS:

- A new repository in your GitHub account
- Continuous Deployment to Netlify's CDN
- Control users and access with Netlify Identity
- Manage content with Netlify CMS

## Usage

### Create a new episode

1. Add the MP3 file in `assets` directory
2. Create a new Markdown file in `pages/episodes`

Example (`1.md`):

```yaml
---
title: "Episode #1"
episode:
  file: episode-1.mp3
---
Short description of the episode.
<!-- break -->
Notes of the episode.
```

See _[Podcast component](https://github.com/Cecilapp/theme-podcast#usage)_ theme for advanced options.

### Preview

Run the following command:

```bash
php cecil.phar serve --open
```

### Publish

1. Run `php cecil.phar build`
2. Copy `_site` folder to your web server

### Configuration

See the [`config.yml`](https://github.com/Cecilapp/staticast/blob/master/config.yml) file and more precisely the `podcast` section.

## Development

_Staticast_ use Tailwind CSS so you can customize the stylesheet with the following files:

- `tailwind.config.js`
- `assets/tailwind.css`

```bash
npm install
npx tailwindcss -i ./assets/tailwind.css -o ./assets/styles.css --watch
php cecil.phar serve -v --config=config/dev.yml
```

## License

_Staticast_ is a free software distributed under the terms of the MIT license.

© [Arnaud Ligny](https://arnaudligny.fr)
