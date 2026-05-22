/**
 * Dream Maze enhancements: tutorial, play mode, world picker, daily run, PWA helpers.
 */
(() => {
  const STORAGE_SETTINGS = "muffin-dream-settings";
  const defaultSettings = {
    lookSensitivity: 1,
    tutorialSeen: false,
    musicPreferred: false,
  };

  function loadSettings() {
    try {
      return { ...defaultSettings, ...JSON.parse(localStorage.getItem(STORAGE_SETTINGS)) };
    } catch (_error) {
      return { ...defaultSettings };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
  }

  let settings = loadSettings();
  let wakeLock = null;

  const tutorialEl = document.getElementById("tutorialOverlay");
  const tutorialStepEl = document.getElementById("tutorialStep");
  const tutorialNextBtn = document.getElementById("tutorialNextBtn");
  const tutorialSkipBtn = document.getElementById("tutorialSkipBtn");
  const worldPickerEl = document.getElementById("worldPickerModal");
  const worldGridEl = document.getElementById("worldGrid");
  const closeWorldPickerBtn = document.getElementById("closeWorldPickerBtn");
  const openWorldPickerBtn = document.getElementById("openWorldPickerBtn");
  const openWorldPickerHeroBtn = document.getElementById("openWorldPickerHeroBtn");
  const settingsModalEl = document.getElementById("settingsModal");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const lookSensitivityEl = document.getElementById("lookSensitivity");
  const lookSensitivityValueEl = document.getElementById("lookSensitivityValue");
  const exportSaveBtn = document.getElementById("exportSaveBtn");
  const importSaveBtn = document.getElementById("importSaveBtn");
  const importSaveInput = document.getElementById("importSaveInput");
  const shareRunBtn = document.getElementById("shareRunBtn");
  const modalShareBtn = document.getElementById("modalShareBtn");
  const dailyRunBtn = document.getElementById("dailyRunBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const playFocusBtn = document.getElementById("playFocusBtn");
  const installAppBtn = document.getElementById("installAppBtn");
  const gbApiStatusEl = document.getElementById("gbApiStatus");
  const gbRecipeSelectEl = document.getElementById("gbRecipeSelect");
  const gbComposeBtn = document.getElementById("gbComposeBtn");
  const gbExportBtn = document.getElementById("gbExportBtn");

  const tutorialSteps = [
    {
      title: "Drag to look",
      body: "On the left side of the maze, drag your finger to steer Muffin's view.",
    },
    {
      title: "Move with the pad",
      body: "Use the arrow buttons to walk. Rush speeds you up when the meter is full.",
    },
    {
      title: "Collect stars, charge the gate",
      body: "Gather every badge star. The exit gate glows green when you can escape.",
    },
  ];
  let tutorialIndex = 0;

  function haptic(pattern = 12) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function getLookMultiplier() {
    return settings.lookSensitivity || 1;
  }

  function maxUnlocked() {
    const game = window.__muffinGame;
    if (!game) return 0;
    const completed = game.state.completed.length ? Math.max(...game.state.completed) : -1;
    return Math.min((window.worlds?.length || 100) - 1, completed + 1);
  }

  function isUnlocked(levelIndex) {
    return levelIndex <= maxUnlocked();
  }

  function dailyWorldIndex() {
    const stamp = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < stamp.length; i += 1) {
      hash = (hash * 31 + stamp.charCodeAt(i)) % 9973;
    }
    return hash % (window.worlds?.length || 100);
  }

  function showTutorial() {
    if (settings.tutorialSeen || !tutorialEl) return;
    tutorialIndex = 0;
    tutorialEl.classList.remove("hidden");
    renderTutorialStep();
  }

  function renderTutorialStep() {
    const step = tutorialSteps[tutorialIndex];
    if (!step || !tutorialStepEl) return;
    tutorialStepEl.innerHTML = `<strong>${step.title}</strong><span>${step.body}</span>`;
    if (tutorialNextBtn) {
      tutorialNextBtn.textContent = tutorialIndex === tutorialSteps.length - 1 ? "Start Playing" : "Next";
    }
  }

  function maybeStartDreamMusic() {
    if (!settings.musicPreferred && window.DreamAudio && !window.DreamAudio.isEnabled()) {
      window.__muffinGame?.startMusic?.();
      settings.musicPreferred = true;
      saveSettings(settings);
    }
  }

  function finishTutorial() {
    settings.tutorialSeen = true;
    saveSettings(settings);
    tutorialEl?.classList.add("hidden");
    enterPlayFocus();
    maybeStartDreamMusic();
    window.__muffinGame?.pushToast?.("Tutorial Complete", "Good luck in the dream maze!");
  }

  function enterPlayFocus() {
    document.body.classList.add("play-focus");
    document.body.dataset.focusPlay = "true";
    window.syncMobileChrome?.();
    document.getElementById("worldStage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestWakeLock();
  }

  function exitPlayFocus() {
    document.body.classList.remove("play-focus");
    document.body.dataset.focusPlay = "false";
    window.syncMobileChrome?.();
    releaseWakeLock();
  }

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLock = await navigator.wakeLock.request("screen");
    } catch (_error) {
      wakeLock = null;
    }
  }

  function releaseWakeLock() {
    wakeLock?.release?.();
    wakeLock = null;
  }

  function renderWorldGrid() {
    if (!worldGridEl || !window.worlds) return;
    const max = maxUnlocked();
    worldGridEl.innerHTML = window.worlds
      .map((world, index) => {
        const unlocked = index <= max;
        const cleared = window.__muffinGame?.state.completed.includes(index);
        const best = window.__muffinGame?.state.bestTimes?.[world.title];
        const daily = dailyWorldIndex() === index;
        return `<button type="button" class="world-chip ${unlocked ? "" : "locked"} ${cleared ? "cleared" : ""} ${daily ? "daily" : ""}" data-world="${index}" ${unlocked ? "" : "disabled"}>
          <span class="world-chip-num">${index + 1}</span>
          <strong>${world.world}</strong>
          <em>${best ? window.__muffinGame.formatTime(best) : unlocked ? "Not cleared" : "Locked"}</em>
          ${daily ? "<b>Daily</b>" : ""}
        </button>`;
      })
      .join("");

    worldGridEl.querySelectorAll("[data-world]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.world);
        window.__muffinGame?.setupWorld(index);
        if (document.body.dataset.page === "worlds") {
          window.location.href = "./play.html";
          return;
        }
        closeWorldPicker();
        enterPlayFocus();
        haptic(18);
      });
    });
  }

  function openWorldPicker() {
    renderWorldGrid();
    worldPickerEl?.classList.remove("hidden");
    worldPickerEl?.setAttribute("aria-hidden", "false");
  }

  function closeWorldPicker() {
    worldPickerEl?.classList.add("hidden");
    worldPickerEl?.setAttribute("aria-hidden", "true");
  }

  async function refreshGarageBandApiStatus() {
    if (!gbApiStatusEl || !window.GarageBandAPI) return;
    try {
      const status = await window.GarageBandAPI.health();
      gbApiStatusEl.textContent = status.garageBandInstalled ? "API online" : "API online (no GarageBand)";
      gbApiStatusEl.style.color = "#86efac";
    } catch (_error) {
      gbApiStatusEl.textContent = "API offline — run server.py";
      gbApiStatusEl.style.color = "#fda4af";
    }
  }

  async function populateGarageBandRecipes() {
    if (!gbRecipeSelectEl || !window.GarageBandAPI) return;
    try {
      const { recipes } = await window.GarageBandAPI.listRecipes();
      gbRecipeSelectEl.innerHTML = recipes
        .map((recipe) => `<option value="${recipe.id}">${recipe.title}</option>`)
        .join("");
    } catch (_error) {
      gbRecipeSelectEl.innerHTML = `<option value="music-garden">Moon Garden Loop</option>`;
    }
  }

  function openSettings() {
    if (lookSensitivityEl) lookSensitivityEl.value = String(settings.lookSensitivity);
    if (lookSensitivityValueEl) lookSensitivityValueEl.textContent = `${settings.lookSensitivity.toFixed(1)}×`;
    settingsModalEl?.classList.remove("hidden");
    settingsModalEl?.setAttribute("aria-hidden", "false");
    refreshGarageBandApiStatus();
    populateGarageBandRecipes();
  }

  function closeSettings() {
    settingsModalEl?.classList.add("hidden");
    settingsModalEl?.setAttribute("aria-hidden", "true");
  }

  function exportSave() {
    const raw = localStorage.getItem("muffin-dream-maze-3d");
    if (!raw) return;
    navigator.clipboard?.writeText(raw);
    window.__muffinGame?.pushToast?.("Save Exported", "Journey code copied to clipboard.");
  }

  function importSave() {
    importSaveInput?.click();
  }

  function shareRun(extra = "") {
    const game = window.__muffinGame;
    if (!game?.currentWorld) return;
    const text =
      extra ||
      `Muffin's Maze Adventure — I reached ${game.currentWorld.world} (World ${game.state.levelIndex + 1})!`;
    if (navigator.share) {
      navigator.share({ title: "Muffin's Maze Adventure", text, url: location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${text} ${location.href}`);
      game.pushToast("Share Link", "Run summary copied to clipboard.");
    }
  }

  function shareLevelClear() {
    const game = window.__muffinGame;
    if (!game?.currentWorld) return;
    const time = document.getElementById("modalTime")?.textContent || "";
    const score = document.getElementById("modalScore")?.textContent || "";
    const rank = document.getElementById("modalRank")?.textContent || "";
    shareRun(
      `Muffin's Maze Adventure — I cleared ${game.currentWorld.world} in ${time} (Score ${score}, Rank ${rank})!`
    );
  }

  function startDailyRun() {
    const index = dailyWorldIndex();
    window.__muffinGame?.setupWorld(index);
    enterPlayFocus();
    window.__muffinGame?.pushToast?.("Daily Dream", `Today's maze: ${window.worlds[index].world}`);
    haptic([20, 40, 20]);
  }

  function toggleFullscreen() {
    const target = document.getElementById("viewportShell");
    if (!target) return;
    if (!document.fullscreenElement) {
      target.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  tutorialNextBtn?.addEventListener("click", () => {
    if (tutorialIndex >= tutorialSteps.length - 1) finishTutorial();
    else {
      tutorialIndex += 1;
      renderTutorialStep();
    }
  });
  tutorialSkipBtn?.addEventListener("click", finishTutorial);

  closeWorldPickerBtn?.addEventListener("click", closeWorldPicker);
  openWorldPickerBtn?.addEventListener("click", openWorldPicker);
  openWorldPickerHeroBtn?.addEventListener("click", openWorldPicker);
  closeSettingsBtn?.addEventListener("click", closeSettings);
  openSettingsBtn?.addEventListener("click", openSettings);

  lookSensitivityEl?.addEventListener("input", () => {
    settings.lookSensitivity = Number(lookSensitivityEl.value);
    saveSettings(settings);
    if (lookSensitivityValueEl) lookSensitivityValueEl.textContent = `${settings.lookSensitivity.toFixed(1)}×`;
  });

  exportSaveBtn?.addEventListener("click", exportSave);
  importSaveBtn?.addEventListener("click", importSave);
  importSaveInput?.addEventListener("change", async () => {
    const file = importSaveInput.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      JSON.parse(text);
      localStorage.setItem("muffin-dream-maze-3d", text);
      location.reload();
    } catch (_error) {
      window.__muffinGame?.pushToast?.("Import Failed", "That file is not a valid save.");
    }
  });

  shareRunBtn?.addEventListener("click", () => shareRun());
  modalShareBtn?.addEventListener("click", shareLevelClear);
  dailyRunBtn?.addEventListener("click", startDailyRun);
  fullscreenBtn?.addEventListener("click", toggleFullscreen);
  playFocusBtn?.addEventListener("click", () => {
    enterPlayFocus();
    if (settings.tutorialSeen) maybeStartDreamMusic();
    else showTutorial();
  });
  installAppBtn?.addEventListener("click", () => window.GamePlus?.promptInstall?.());

  gbComposeBtn?.addEventListener("click", async () => {
    const recipeId = gbRecipeSelectEl?.value || "music-garden";
    try {
      gbComposeBtn.disabled = true;
      const result = await window.GarageBandAPI.pipeline(recipeId);
      const opened = result.garageBand?.opened || result.composed?.midiPath;
      window.__muffinGame?.pushToast?.(
        "GarageBand",
        opened ? "MIDI opened — assign instruments and mix." : "MIDI composed in audio/staging."
      );
    } catch (error) {
      window.__muffinGame?.pushToast?.("Compose Failed", error.message || "Start garageband-api/server.py");
    } finally {
      gbComposeBtn.disabled = false;
    }
  });

  gbExportBtn?.addEventListener("click", async () => {
    const recipeId = gbRecipeSelectEl?.value || "music-garden";
    try {
      gbExportBtn.disabled = true;
      const result = await window.GarageBandAPI.exportTrack(recipeId);
      const path = result.exported || result.install?.installed || result.expectedFile;
      window.__muffinGame?.pushToast?.(
        "Exported",
        result.ok === false ? result.hint || result.error : `Saved to ${path || "audio/"}`
      );
    } catch (error) {
      window.__muffinGame?.pushToast?.(
        "Export Failed",
        error.message || "Grant Accessibility for Terminal → GarageBand."
      );
    } finally {
      gbExportBtn.disabled = false;
    }
  });

  worldPickerEl?.addEventListener("click", (event) => {
    if (event.target === worldPickerEl) closeWorldPicker();
  });
  settingsModalEl?.addEventListener("click", (event) => {
    if (event.target === settingsModalEl) closeSettings();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) releaseWakeLock();
    else if (document.body.classList.contains("play-focus")) requestWakeLock();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  let deferredInstallPrompt = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    window.__muffinGame?.pushToast?.("Install App", "Add Dream Maze to your home screen for fullscreen play.");
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    window.__muffinGame?.pushToast?.("Installed", "Muffin's Maze is on your home screen.");
  });

  window.GamePlus.promptInstall = async () => {
    if (!deferredInstallPrompt) {
      window.__muffinGame?.pushToast?.("Install", "Use Share → Add to Home Screen in Safari.");
      return false;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return true;
  };

  window.GamePlus = {
    haptic,
    getLookMultiplier,
    showTutorial,
    enterPlayFocus,
    exitPlayFocus,
    openWorldPicker,
    renderWorldGrid,
    dailyWorldIndex,
    onStarCollected: () => haptic(10),
    onGateReady: () => haptic([12, 30, 12]),
    onPuddleHit: () => haptic(28),
  };

  window.addEventListener("load", () => {
    if (settings.musicPreferred && window.DreamAudio) {
      window.DreamAudio.start();
      const musicBtn = document.getElementById("musicBtn");
      if (musicBtn) musicBtn.textContent = "Pause Music";
    }
    if (document.body.dataset.page === "worlds") {
      renderWorldGrid();
    }
    if (document.body.dataset.page === "play") {
      setTimeout(showTutorial, 500);
    }
  });
})();
