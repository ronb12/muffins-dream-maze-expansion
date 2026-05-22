/**
 * Hidden DOM stubs so app.js can load on hub pages without a full play layout.
 */
(() => {
  if (document.body.dataset.page === "play") return;

  const ids = [
    "view", "minimap", "worldLabel", "levelLabel", "coinsLabel", "badgesLabel",
    "movesLabel", "timerLabel", "scoreLabel", "rushLabel", "rushMeta", "rushFill",
    "missionTitle", "message", "worldChip", "objectiveChip", "depthChip", "bestChip",
    "doorChargeLabel", "doorChargeFill", "questStars", "questDoor", "questClear",
    "keyLabel", "chestLabel", "relicLabel", "gemLabel", "satchelLabel", "shieldLabel",
    "introBanner", "introTitle", "introSubtitle", "toastFeed", "musicBtn",
    "openStoryBtn", "openStoreBtn", "levelModal", "modalTitle", "modalSummary",
    "modalTime", "modalMoves", "modalBonus", "modalScore", "modalRank",
    "viewportShell", "lookZone", "worldStage", "dreamConsole",
    "storeModal", "closeStoreBtn", "openStorePanelBtn", "storeGrid",
    "storeWalletLabel", "storeCoinsLabel", "storePreview",
    "storyModeLabel", "storyProgressLabel", "storyChapterLabel", "storySummary",
    "storyBeatList", "openStoryPanelBtn", "storyModal", "storyModalEyebrow",
    "storyModalTitle", "storyModalBody", "storyModalGoal", "storyModalProgress",
    "closeStoryBtn", "storyModalContinueBtn", "hintBtn", "resetBtn", "continueBtn",
    "worldGrid", "guideModeLabel",
  ];

  const host = document.createElement("div");
  host.id = "app-stubs";
  host.hidden = true;
  host.setAttribute("aria-hidden", "true");
  ids.forEach((id) => {
    if (!document.getElementById(id)) {
      const node = document.createElement("div");
      node.id = id;
      host.appendChild(node);
    }
  });
  if (host.childElementCount) document.body.appendChild(host);
})();
