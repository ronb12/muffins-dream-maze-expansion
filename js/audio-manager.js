/**
 * Dream Maze audio — loads original MP3 loops from /audio/
 * (Replace files with GarageBand exports; see audio/GARAGEBAND.md)
 */
(() => {
  const tracks = {
    atmosphere: "audio/music-atmosphere.mp3",
    garden: "audio/music-garden.mp3",
    nebula: "audio/music-nebula.mp3",
    victory: "audio/music-victory.mp3",
    star: "audio/sfx-star.mp3",
    gate: "audio/sfx-gate.mp3",
    gateReady: "audio/sfx-gate-ready.mp3",
    puddle: "audio/sfx-puddle.mp3",
    pickup: "audio/sfx-pickup.mp3",
    nearStar: "audio/sfx-near-star.mp3",
  };

  const musicEls = {};
  const sfxEls = {};
  let musicEnabled = false;
  let currentTheme = "atmosphere";
  let lastGateCharge = 0;
  let nearStarCooldown = 0;

  let loadFailed = false;

  function makeAudio(src, { loop = false, volume = 1 } = {}) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = "auto";
    audio.volume = volume;
    audio.addEventListener(
      "error",
      () => {
        loadFailed = true;
        console.warn("[DreamAudio] Missing:", src, "— run: python3 scripts/build-dream-audio.py");
      },
      { once: true }
    );
    return audio;
  }

  const musicKeys = new Set(["atmosphere", "garden", "nebula", "victory"]);

  function preload() {
    Object.entries(tracks).forEach(([key, src]) => {
      const isMusic = musicKeys.has(key);
      const el = makeAudio(src, {
        loop: isMusic && key !== "victory",
        volume: isMusic ? (key === "victory" ? 0.5 : 0.42) : 0.55,
      });
      if (isMusic) musicEls[key] = el;
      else sfxEls[key] = el;
    });
  }

  function fadeTo(el, target, ms = 600) {
    if (!el) return;
    const start = el.volume;
    const steps = 12;
    let step = 0;
    const delta = (target - start) / steps;
    const timer = setInterval(() => {
      step += 1;
      el.volume = Math.max(0, Math.min(1, start + delta * step));
      if (step >= steps) {
        clearInterval(timer);
        el.volume = target;
      }
    }, ms / steps);
  }

  function stopAllMusic() {
    Object.values(musicEls).forEach((el) => {
      el.pause();
      el.currentTime = 0;
    });
  }

  function playMusic(theme = "atmosphere") {
    stopAllMusic();
    const el = musicEls[theme] || musicEls.atmosphere;
    if (!el) return;
    currentTheme = theme;
    el.currentTime = 0;
    el.volume = 0.08;
    el.play().catch(() => {});
    fadeTo(el, 0.42, 900);
  }

  function start() {
    musicEnabled = true;
    playMusic(currentTheme);
  }

  function stop() {
    musicEnabled = false;
    stopAllMusic();
  }

  function toggle() {
    if (musicEnabled) stop();
    else start();
    return musicEnabled;
  }

  function playSfx(name) {
    const template = sfxEls[name];
    if (!template || loadFailed) {
      window.__muffinGame?.playToneFallback?.(name);
      return;
    }
    const clip = template.cloneNode();
    clip.volume = template.volume;
    clip.play().catch(() => window.__muffinGame?.playToneFallback?.(name));
  }

  function setWorldTheme(levelIndex) {
    if (!musicEnabled) return;
    const theme = levelIndex < 33 ? "garden" : levelIndex < 66 ? "nebula" : "atmosphere";
    if (theme === currentTheme) return;
    playMusic(theme);
  }

  function onGateCharge(percent) {
    if (percent > lastGateCharge && percent < 100) {
      playSfx("gate");
    }
    if (percent >= 100 && lastGateCharge < 100) {
      playSfx("gateReady");
    }
    lastGateCharge = percent;
  }

  function resetGateCharge() {
    lastGateCharge = 0;
  }

  function tickNearStar(nearby) {
    if (!musicEnabled || !nearby) return;
    const now = performance.now();
    if (now < nearStarCooldown) return;
    nearStarCooldown = now + 1400;
    playSfx("nearStar");
  }

  preload();

  window.DreamAudio = {
    start,
    stop,
    toggle,
    isEnabled: () => musicEnabled,
    playSfx,
    setWorldTheme,
    onGateCharge,
    resetGateCharge,
    tickNearStar,
    playVictory: () => {
      playSfx("gateReady");
      const sting = musicEls.victory;
      if (sting) {
        sting.currentTime = 0;
        sting.volume = 0.55;
        sting.play().catch(() => {});
      }
    },
  };
})();
