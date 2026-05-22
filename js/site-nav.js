/**
 * Shared site navigation for multi-page Dream Maze.
 */
(() => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = document.body.dataset.page || "home";
  const links = [
    { href: "./index.html", label: "Home", key: "home" },
    { href: "./play.html", label: "Play", key: "play" },
    { href: "./console.html", label: "Console", key: "console" },
    { href: "./worlds.html", label: "Worlds", key: "worlds" },
    { href: "./story.html", label: "Story", key: "story" },
    { href: "./store.html", label: "Store", key: "store" },
    { href: "./settings.html", label: "Settings", key: "settings" },
  ];

  const nav = document.createElement("nav");
  nav.className = "site-nav glass";
  nav.setAttribute("aria-label", "Dream Maze sections");
  nav.innerHTML = `
    <a class="site-nav-brand" href="./index.html">🌙 Muffin's Maze</a>
    <div class="site-nav-links">
      ${links
        .map(
          (item) =>
            `<a href="${item.href}" class="site-nav-link${item.key === page ? " is-active" : ""}">${item.label}</a>`
        )
        .join("")}
    </div>
  `;

  const shell = document.querySelector(".experience-shell");
  if (shell) shell.prepend(nav);
  else document.body.insertBefore(nav, document.body.firstChild);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
