_Staticast_ is a podcast website [template](https://github.com/Cecilapp/staticast), powered by [Cecil](https://cecil.app) and could be deployed in few seconds with [Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/Cecilapp/staticast).
<!-- break -->
## Usage

_Staticast_ is a theme for Cecil, so you need to download and run Cecil to build a new website, then you can publish your static where you want.

### Download and serve locally

1. Be sure PHP is available
2. [Download _Staticast_](https://github.com/Cecilapp/staticast/archive/master.zip) and install theme with `composer install`
3. [Download `cecil.phar`](https://github.com/Cecilapp/Cecil/releases/latest/download/cecil.phar) and move it to the root of _Staticast_
4. Run `php cecil.phar serve`
5. Open `http://localhost:8080`

### Add a new episode

1. Add the MP3 file in `static` directory.
2. Create a new Markdown file in `content/episodes`.

Example (`my-episode.md`):

```yaml
---
episode:
  file: my-episode.mp3
---
Description of the episode
```
