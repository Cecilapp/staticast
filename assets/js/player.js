/*
 * Staticast persistent audio player.
 *
 * The player lives in a `data-turbo-permanent` element, so Turbo Drive keeps it
 * (and the playback) alive while navigating from page to page.
 * Episodes are described by a JSON `data-episode` attribute on play buttons.
 */
(() => {
  const STATE_KEY = 'staticast:episode';
  const SKIP_TIME = 10;
  const storage = {
    get: (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set: (key, value) => { try { localStorage.setItem(key, value); } catch (e) {} },
    remove: (key) => { try { localStorage.removeItem(key); } catch (e) {} },
  };

  const player = document.getElementById('player');
  const audio = document.getElementById('audioplayer');
  if (!player || !audio) return;
  const labels = player.dataset;
  let current = null;
  let baseTitle = document.title;

  // navigation helper (falls back to a full page load without Turbo)
  const visit = (url) => (window.Turbo ? window.Turbo.visit(url) : (window.location.href = url));

  const formatTime = (time) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return m + ':' + s;
  };

  const parseEpisode = (element) => {
    try { return JSON.parse(element.dataset.episode); } catch (e) { return null; }
  };

  // loads an episode in the player, and plays it if requested
  const load = (episode, autoplay) => {
    if (!current || current.key !== episode.key) {
      current = episode;
      audio.src = episode.src;
      storage.set(STATE_KEY, JSON.stringify(episode));
      const title = player.querySelector('[data-player-title]');
      title.textContent = episode.title;
      title.href = episode.url;
      player.querySelector('[data-player-artist]').textContent = episode.artist;
      const image = player.querySelector('[data-player-image]');
      image.src = episode.thumb;
      image.alt = episode.title;
      setMediaSession(episode);
    }
    player.hidden = false;
    if (autoplay) {
      audio.play().catch(() => {});
    }
    updateButtons();
  };

  // empties and hides the player
  const close = () => {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    current = null;
    storage.remove(STATE_KEY);
    player.hidden = true;
    document.title = baseTitle;
    updateButtons();
  };

  // returns the state of an episode: play, pause, resume or ended
  const state = (key) => {
    if (current && current.key === key && !audio.paused) return 'pause';
    const position = storage.get(key);
    if (position === 'ended') return 'ended';
    if (position !== null && parseFloat(position) > 0) return 'resume';
    return 'play';
  };

  // syncs play buttons with the player state
  const updateButtons = () => {
    document.querySelectorAll('[data-player-play]').forEach((button) => {
      const episode = parseEpisode(button);
      if (!episode) return;
      const buttonState = state(episode.key);
      button.dataset.state = buttonState;
      const label = button.querySelector('[data-player-label]');
      if (label) label.textContent = labels['label' + buttonState.charAt(0).toUpperCase() + buttonState.slice(1)];
    });
  };

  // media session (OS / lock screen controls)
  const setMediaSession = (episode) => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: episode.artist,
      artwork: [{ src: episode.image, sizes: episode.imageSizes, type: episode.imageType }],
    });
    const handlers = {
      previoustrack: episode.prev ? () => visit(episode.prev + '#autoplay') : null,
      nexttrack: episode.next ? () => visit(episode.next + '#autoplay') : null,
    };
    setActionHandlers(handlers);
  };
  const setActionHandlers = (handlers) => {
    Object.keys(handlers).forEach((action) => {
      try {
        navigator.mediaSession.setActionHandler(action, handlers[action]);
      } catch (error) {
        console.log(`The Media Session action "${action}" is not supported yet.`);
      }
    });
  };
  if ('mediaSession' in navigator) {
    setActionHandlers({
      seekbackward: (details) => {
        audio.currentTime = Math.max(audio.currentTime - (details.seekOffset || SKIP_TIME), 0);
      },
      seekforward: (details) => {
        audio.currentTime = Math.min(audio.currentTime + (details.seekOffset || SKIP_TIME), audio.duration);
      },
    });
  }

  // audio events
  audio.addEventListener('loadedmetadata', () => {
    if (!current) return;
    // resume position
    const position = storage.get(current.key);
    if (position === 'ended') {
      // restarts an ended episode if played, otherwise shows it as ended
      if (audio.paused) audio.currentTime = audio.duration;
    } else if (position !== null) {
      audio.currentTime = parseFloat(position) || 0;
    }
  });
  audio.addEventListener('timeupdate', () => {
    if (!current) return;
    // save position
    if (!audio.ended) {
      storage.set(current.key, audio.currentTime);
    }
    // display progress in page's title
    if (!audio.paused) {
      document.title = current.title + ' (' + formatTime(audio.currentTime) + ')';
    }
  });
  audio.addEventListener('ended', () => {
    if (current) storage.set(current.key, 'ended');
    updateButtons();
  });
  audio.addEventListener('play', updateButtons);
  audio.addEventListener('pause', () => {
    document.title = baseTitle;
    updateButtons();
  });

  // clicks (delegated, so it works with pages loaded by Turbo)
  document.addEventListener('click', (event) => {
    // let the browser handle modified clicks (new tab, etc.)
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // play / pause
    const playButton = event.target.closest('[data-player-play]');
    if (playButton) {
      const episode = parseEpisode(playButton);
      if (!episode) return;
      event.preventDefault();
      if (current && current.key === episode.key && !audio.paused) {
        audio.pause();
      } else {
        load(episode, true);
      }
      return;
    }

    // mark as read / unread
    const readButton = event.target.closest('[data-player-read]');
    if (readButton) {
      const key = readButton.dataset.key;
      const ended = storage.get(key) === 'ended';
      if (current && current.key === key && audio.duration) {
        audio.pause();
        audio.currentTime = ended ? 0 : audio.duration;
      }
      storage.set(key, ended ? 0 : 'ended');
      updateButtons();
      return;
    }

    // share
    const shareButton = event.target.closest('[data-share]');
    if (shareButton && navigator.share) {
      navigator.share({ text: shareButton.dataset.shareTitle, url: shareButton.dataset.shareUrl })
        .then(() => console.log('Thanks for sharing!'))
        .catch(console.error);
      return;
    }

    // close player
    if (event.target.closest('[data-player-close]')) {
      close();
    }
  });

  // page load (initial load and each Turbo visit)
  const onPageLoad = () => {
    baseTitle = document.title;
    if (!navigator.share) {
      document.querySelectorAll('[data-share]').forEach((button) => button.remove());
    }
    // episode page: autoplay, or preload the episode if nothing is playing
    const pageEpisode = document.querySelector('[data-player-play][data-player-autoload]');
    if (pageEpisode) {
      const episode = parseEpisode(pageEpisode);
      if (episode && window.location.hash === '#autoplay') {
        load(episode, true);
      } else if (episode && (!current || audio.paused)) {
        load(episode, false);
      }
    }
    updateButtons();
  };

  // restores the last listened episode (paused)
  try {
    const saved = JSON.parse(storage.get(STATE_KEY));
    if (saved && saved.key && saved.src) load(saved, false);
  } catch (e) {}

  if (window.Turbo) {
    document.addEventListener('turbo:load', onPageLoad);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
  } else {
    onPageLoad();
  }
})();
