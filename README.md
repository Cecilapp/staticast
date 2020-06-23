# Staticast

_Staticast_ is a podcast website [template](https://github.com/Cecilapp/staticast), powered by [Cecil](https://cecil.app).

You could deploy your own in few seconds with [Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/Cecilapp/staticast).
<!-- break -->
## Usage

_Staticast_ is a theme for Cecil, so you need to download and run Cecil to build a new website, then you can publish your static where you want.

### Download and serve locally

1. [Download _Staticast_](https://github.com/Cecilapp/staticast/archive/master.zip)
2. [Download `cecil.phar`](https://github.com/Cecilapp/Cecil/releases/latest/download/cecil.phar)
3. Move `cecil.phar` at the root of _Staticast_
4. Run `php cecil.phar serve`
5. Open http://localhost:8080

### Add/edit content

#### Episodes

Create a new Markdown file in `content/episodes`.

Example (`my-episode.md`):

```yaml
---
episode:
  file: my-episode.mp3
---
Description of the episode
```

Add MP3 files in `static` directory.
