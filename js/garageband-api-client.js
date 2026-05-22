/**
 * Client for the local GarageBand Compose API (http://127.0.0.1:8767).
 */
(() => {
  const API_BASE = "http://127.0.0.1:8767";

  async function api(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `API ${response.status}`);
    }
    return data;
  }

  async function health() {
    return api("/api/health");
  }

  async function listRecipes() {
    const data = await api("/api/recipes");
    return { recipes: data.tracks || [] };
  }

  async function compose(recipeId, { openGarageBand = true, bpm, bars } = {}) {
    return api("/api/compose", {
      method: "POST",
      body: JSON.stringify({
        track: recipeId,
        openInGarageBand: openGarageBand,
        bpm,
        bars,
      }),
    });
  }

  async function pipeline(recipeId, options = {}) {
    return api("/api/pipeline/compose-open", {
      method: "POST",
      body: JSON.stringify({ track: recipeId, ...options }),
    });
  }

  async function exportTrack(recipeId, { installToGame = true } = {}) {
    return api("/api/garageband/export", {
      method: "POST",
      body: JSON.stringify({
        track: recipeId,
        installToGame,
      }),
    });
  }

  window.GarageBandAPI = {
    baseUrl: API_BASE,
    health,
    listRecipes,
    compose,
    pipeline,
    exportTrack,
  };
})();
