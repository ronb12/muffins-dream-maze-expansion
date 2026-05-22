const worldThemes = [
  {
    sky: ["#1e1b4b", "#4c1d95"],
    floor: ["#3b0764", "#6d28d9"],
    fog: "#f5d0fe",
    wall: "#8b5cf6",
    accent: "#67e8f9",
  },
  {
    sky: ["#172554", "#0f766e"],
    floor: ["#7c2d12", "#f97316"],
    fog: "#fdba74",
    wall: "#fb7185",
    accent: "#fef08a",
  },
  {
    sky: ["#0f172a", "#14532d"],
    floor: ["#1f2937", "#166534"],
    fog: "#86efac",
    wall: "#22c55e",
    accent: "#67e8f9",
  },
  {
    sky: ["#312e81", "#0f766e"],
    floor: ["#164e63", "#0891b2"],
    fog: "#bae6fd",
    wall: "#38bdf8",
    accent: "#e0f2fe",
  },
  {
    sky: ["#4c1d95", "#9d174d"],
    floor: ["#831843", "#db2777"],
    fog: "#fbcfe8",
    wall: "#f472b6",
    accent: "#fdf2f8",
  },
  {
    sky: ["#111827", "#78350f"],
    floor: ["#451a03", "#d97706"],
    fog: "#fde68a",
    wall: "#fbbf24",
    accent: "#fffbeb",
  },
];

const titleHeads = ["Moon", "Candy", "Star", "Dream", "Velvet", "Aurora", "Lantern", "Comet", "Puzzle", "Glow"];
const titleTails = ["Garden", "Nebula", "Forest", "Circuit", "Harbor", "Vault", "Grove", "Run", "Spiral", "Drift"];
const subtitleHeads = ["Plaza", "Maze", "Beacon", "Night", "Portal", "Shadow", "Ribbon", "Dream", "Meteor", "Crystal"];
const subtitleTails = ["Drift", "Circuit", "Valley", "Sprint", "Arcade", "Crossing", "Vault", "Loop", "Pass", "Rush"];
const objectives = [
  "Collect badge stars, charge the gate, and escape.",
  "Chain moon pads, hold your rush meter, and clear the maze.",
  "Avoid shadow puddles and keep the gate charge climbing.",
  "Sweep the side routes, clean up the pickups, and escape clean.",
];

const storyChapters = [
  {
    id: "first-lantern",
    title: "Chapter 1: The First Lantern",
    summary: "Muffin enters the dream maze to relight the first moon lantern and prove she can navigate the sleeping world.",
    goal: "Wake the first lantern trail.",
    intro: "The sky district is dim. Every badge star Muffin gathers pushes a little more light back into the maze.",
    outro: "The first lantern wakes, and a hidden route opens deeper into the dream.",
  },
  {
    id: "garden-whispers",
    title: "Chapter 2: Garden Whispers",
    summary: "Moon Garden paths begin speaking in clues. Muffin follows the whispers toward the drifting plaza gates.",
    goal: "Follow the garden signals.",
    intro: "The maze starts to feel alive, with lantern vines and quiet dream voices steering Muffin onward.",
    outro: "The garden whispers form a map, pointing Muffin toward the deeper dream vaults.",
  },
  {
    id: "plaza-drift",
    title: "Chapter 3: Plaza Drift",
    summary: "The central plaza is unstable, sliding between routes. Muffin must keep momentum while the world shifts around her.",
    goal: "Cross the drifting plaza lanes.",
    intro: "The floor glows, the routes drift, and Muffin has to trust her pace more than the maze.",
    outro: "With the plaza stabilized, a comet rail lights up to the next district.",
  },
  {
    id: "comet-vault",
    title: "Chapter 4: Comet Vault",
    summary: "Ancient comet vaults hold dream energy. Muffin needs enough charge to reopen the locked skyline passages.",
    goal: "Crack open the comet vaults.",
    intro: "Gold gates, fast turns, and narrow halls test whether Muffin can stay sharp under pressure.",
    outro: "The vault seals break, and the skyline passage hums back to life.",
  },
  {
    id: "shadow-hush",
    title: "Chapter 5: Shadow Hush",
    summary: "Shadow puddles spread across whole sectors now. Muffin has to keep her rush up before the hush swallows the path.",
    goal: "Push through the hush zone.",
    intro: "The dream gets heavier here, and every bad line through the maze costs precious rush.",
    outro: "Muffin breaks through the hush and finds a quiet beacon floating ahead.",
  },
  {
    id: "beacon-rise",
    title: "Chapter 6: Beacon Rise",
    summary: "Dream beacons begin answering Muffin. She climbs through vertical-feeling routes to restore their full signal.",
    goal: "Raise the beacon network.",
    intro: "The mazes pulse brighter now, and every star cluster feels like part of a larger machine.",
    outro: "The beacon network rises, linking distant dream districts together again.",
  },
  {
    id: "ribbon-run",
    title: "Chapter 7: Ribbon Run",
    summary: "Ribbon roads streak across the maze. Muffin must move fast enough to stay ahead of collapsing shortcuts.",
    goal: "Ride the ribbon roads cleanly.",
    intro: "This chapter rewards speed. Clean movement and fast recoveries matter more than ever.",
    outro: "The last ribbon snaps into place and reveals the palace approach.",
  },
  {
    id: "crystal-night",
    title: "Chapter 8: Crystal Night",
    summary: "The dream palace edge is full of crystal halls and mirrored routes. Muffin has to keep her focus through the glow.",
    goal: "Reach the crystal approach.",
    intro: "Every hall reflects a different possibility, but only one route pushes the story forward.",
    outro: "The crystal halls align and open the final moon door.",
  },
  {
    id: "palace-gates",
    title: "Chapter 9: Palace Gates",
    summary: "At the palace gates, the dream fights back with longer routes and tougher pacing. Muffin is almost there.",
    goal: "Unlock the palace gates.",
    intro: "The maze is brighter, bigger, and more demanding. Muffin has to prove she can finish the climb.",
    outro: "The palace gates split open and the dream core begins to glow.",
  },
  {
    id: "dream-core",
    title: "Chapter 10: The Dream Core",
    summary: "The final worlds reveal the heart of the maze. Muffin must restore the last light and complete the adventure.",
    goal: "Wake the dream core.",
    intro: "Everything points here now. The whole maze is waiting for Muffin to finish what she started.",
    outro: "The dream core wakes, the skies brighten, and Muffin's maze adventure becomes legend.",
  },
];

const storeItems = [
  {
    id: "rush-core",
    title: "Rush Core",
    cost: 18,
    blurb: "Boost Muffin's max rush meter and keep sprint alive longer.",
    effect: "Max rush 120, slower sprint drain",
  },
  {
    id: "spark-magnet",
    title: "Spark Magnet",
    cost: 22,
    blurb: "Pull in stars and sparks from a safer distance.",
    effect: "Larger pickup radius",
  },
  {
    id: "gate-cache",
    title: "Gate Cache",
    cost: 26,
    blurb: "Earn extra dream coins every time a maze is cleared.",
    effect: "+2 clear bonus coins",
  },
  {
    id: "moon-compass",
    title: "Moon Compass",
    cost: 16,
    blurb: "Dream hints stay visible longer and feel more useful mid-run.",
    effect: "Longer hint beam",
  },
];

function createSeededRng(seed) {
  let state = BigInt(seed || 1);
  return {
    nextInt(max) {
      if (!max || max <= 0) return 0;
      state = (state * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n);
      return Number(state % BigInt(max));
    },
    shuffle(list) {
      const items = [...list];
      for (let index = 0; index < items.length - 1; index += 1) {
        const swapIndex = index + this.nextInt(items.length - index);
        [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      }
      return items;
    },
  };
}

function insideGrid(grid, x, y) {
  return y > 0 && y < grid.length - 1 && x > 0 && x < grid[0].length - 1;
}

function generateMazeMap(seed, beaconTarget, levelIndex = 0) {
  const size = 15;
  const logicalSize = (size - 1) / 2;
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => "#"));
  const visited = Array.from({ length: logicalSize }, () => Array.from({ length: logicalSize }, () => false));
  const rng = createSeededRng(seed);

  function carveCell(cx, cy) {
    visited[cy][cx] = true;
    grid[cy * 2 + 1][cx * 2 + 1] = ".";
    const directions = rng.shuffle([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);

    directions.forEach(([dx, dy]) => {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= logicalSize || ny >= logicalSize || visited[ny][nx]) {
        return;
      }
      grid[cy * 2 + 1 + dy][cx * 2 + 1 + dx] = ".";
      carveCell(nx, ny);
    });
  }

  carveCell(0, 0);

  for (let i = 0; i < 10 + (seed % 8); i += 1) {
    const cx = rng.nextInt(logicalSize);
    const cy = rng.nextInt(logicalSize);
    const directions = rng.shuffle([
      [1, 0],
      [0, 1],
    ]);

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < logicalSize && ny < logicalSize) {
        grid[cy * 2 + 1 + dy][cx * 2 + 1 + dx] = ".";
        break;
      }
    }
  }

  const start = { x: 1, y: 1 };
  const exit = { x: size - 2, y: size - 2 };
  grid[start.y][start.x] = "S";
  grid[exit.y][exit.x] = "E";

  function secretRoomCells(doorX, doorY, dx, dy) {
    const sideOptions = [1, -1];

    for (const side of rng.shuffle(sideOptions)) {
      let cells = [];
      if (dx !== 0) {
        cells = [
          { x: doorX + dx, y: doorY },
          { x: doorX + dx * 2, y: doorY },
          { x: doorX + dx, y: doorY + side },
        ];
        if (insideGrid(grid, doorX + dx * 2, doorY + side)) {
          cells.push({ x: doorX + dx * 2, y: doorY + side });
        }
      } else {
        cells = [
          { x: doorX, y: doorY + dy },
          { x: doorX, y: doorY + dy * 2 },
          { x: doorX + side, y: doorY + dy },
        ];
        if (insideGrid(grid, doorX + side, doorY + dy * 2)) {
          cells.push({ x: doorX + side, y: doorY + dy * 2 });
        }
      }

      if (
        cells.length >= 3 &&
        cells.every((cell) => insideGrid(grid, cell.x, cell.y) && grid[cell.y][cell.x] === "#")
      ) {
        return cells;
      }
    }

    return null;
  }

  function carveSecretRooms(targetCount) {
    let carved = 0;
    const candidates = [];

    for (let y = 1; y < size - 1; y += 1) {
      for (let x = 1; x < size - 1; x += 1) {
        if (grid[y][x] !== ".") continue;
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].forEach(([dx, dy]) => {
          const doorX = x + dx;
          const doorY = y + dy;
          if (!insideGrid(grid, doorX, doorY) || grid[doorY][doorX] !== "#") return;
          const roomCells = secretRoomCells(doorX, doorY, dx, dy);
          if (!roomCells) return;
          const distanceFromStart = Math.abs(x - start.x) + Math.abs(y - start.y);
          if (distanceFromStart < 5) return;
          candidates.push({ doorX, doorY, roomCells });
        });
      }
    }

    rng.shuffle(candidates).forEach((candidate) => {
      if (carved >= targetCount) return;
      if (grid[candidate.doorY][candidate.doorX] !== "#") return;
      candidate.roomCells.forEach((cell) => {
        grid[cell.y][cell.x] = ".";
      });
      grid[candidate.doorY][candidate.doorX] = "D";
      const roomCells = rng.shuffle(candidate.roomCells);
      const chestCell = roomCells[0];
      const relicCell = roomCells[1];
      const gemCell = roomCells[2];
      grid[chestCell.y][chestCell.x] = "C";
      grid[relicCell.y][relicCell.x] = "R";
      grid[gemCell.y][gemCell.x] = "G";
      if (roomCells[3] && (seed + carved) % 2 === 0) {
        const satchelCell = roomCells[3];
        grid[satchelCell.y][satchelCell.x] = "B";
      }
      carved += 1;
    });

    return carved;
  }

  function carveFallbackSecretRoom() {
    for (let y = size - 3; y >= 2; y -= 1) {
      for (let x = size - 3; x >= 2; x -= 1) {
        if (grid[y][x] !== ".") continue;
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const doorX = x + dx;
          const doorY = y + dy;
          const roomAX = doorX + dx;
          const roomAY = doorY + dy;
          const roomBX = roomAX + (dx === 0 ? 1 : 0);
          const roomBY = roomAY + (dy === 0 ? 1 : 0);
          const roomCX = roomAX + (dx === 0 ? -1 : 0);
          const roomCY = roomAY + (dy === 0 ? -1 : 0);

          if (
            insideGrid(grid, doorX, doorY) &&
            insideGrid(grid, roomAX, roomAY) &&
            grid[doorY][doorX] === "#" &&
            grid[roomAY][roomAX] === "#"
          ) {
            grid[doorY][doorX] = "D";
            grid[roomAY][roomAX] = "C";
            if (insideGrid(grid, roomBX, roomBY) && grid[roomBY][roomBX] === "#") {
              grid[roomBY][roomBX] = "R";
            }
            if (insideGrid(grid, roomCX, roomCY) && grid[roomCY][roomCX] === "#") {
              grid[roomCY][roomCX] = "G";
            }
            return 1;
          }
        }
      }
    }
    return 0;
  }

  const secretRoomCount =
    levelIndex >= 7 ? carveSecretRooms(1 + (seed % 2)) || carveFallbackSecretRoom() : 0;

  let openTiles = [];
  for (let y = 1; y < size - 1; y += 1) {
    for (let x = 1; x < size - 1; x += 1) {
      if (grid[y][x] === ".") {
        openTiles.push({ x, y });
      }
    }
  }
  openTiles = rng.shuffle(openTiles);
  const used = new Set([`${start.x},${start.y}`, `${exit.x},${exit.y}`]);

  function place(marker, count, minDistance) {
    let placed = 0;
    openTiles.forEach((tile) => {
      if (placed >= count) return;
      const key = `${tile.x},${tile.y}`;
      const startDistance = Math.abs(tile.x - start.x) + Math.abs(tile.y - start.y);
      const exitDistance = Math.abs(tile.x - exit.x) + Math.abs(tile.y - exit.y);
      if (used.has(key) || startDistance < minDistance || exitDistance < 2) return;
      grid[tile.y][tile.x] = marker;
      used.add(key);
      placed += 1;
    });
  }

  const starCount = levelIndex < 5 ? 3 + (seed % 2) : 3 + (seed % 3);
  place("*", starCount, 4);
  place("o", levelIndex < 3 ? 1 : 2 + (Math.floor(seed / 3) % 3), 3);
  if (levelIndex >= 4) place("P", 1 + (Math.floor(seed / 5) % 2), 5);
  if (levelIndex >= 14) place("X", 2 + (Math.floor(seed / 7) % 2), 4);
  if (levelIndex >= 7) place("K", Math.max(2, secretRoomCount + 1), 5);
  if (levelIndex >= 10) place("G", 1 + (Math.floor(seed / 11) % 2), 5);
  if (levelIndex >= 12) place("B", 1, 6);
  place("*", beaconTarget, 6);

  return grid.map((row) => row.join(""));
}

const worlds = Array.from({ length: 100 }, (_, index) => {
  const number = index + 1;
  const theme = worldThemes[index % worldThemes.length];
  const world = `${titleHeads[index % titleHeads.length]} ${titleTails[Math.floor(index / titleHeads.length) % titleTails.length]}`;
  const subtitle = `${subtitleHeads[(index * 3) % subtitleHeads.length]} ${subtitleTails[(index * 5) % subtitleTails.length]}`;
  const beaconTarget = 2 + Math.min(2, Math.floor(index / 34));

  return {
    ...theme,
    world,
    subtitle,
    title: `${world}: ${subtitle}`,
    objective: objectives[index % objectives.length],
    beaconTarget,
    map: generateMazeMap(number * 7919, beaconTarget, index),
  };
});

window.worlds = worlds;

const storageKey = "muffin-dream-maze-3d";
const defaultState = {
  levelIndex: 0,
  coins: 0,
  completed: [],
  bestTimes: {},
  ownedStoreItemIDs: [],
  storySeenChapterIDs: [],
  relicPages: 0,
  openedChests: 0,
};

const viewCanvas = document.getElementById("view");
const viewCtx = viewCanvas?.getContext?.("2d") ?? null;
const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas?.getContext?.("2d") ?? null;
const isPlayPage = document.body.dataset.page === "play" && Boolean(viewCanvas && viewCtx);

const worldLabelEl = document.getElementById("worldLabel");
const levelLabelEl = document.getElementById("levelLabel");
const coinsLabelEl = document.getElementById("coinsLabel");
const badgesLabelEl = document.getElementById("badgesLabel");
const movesLabelEl = document.getElementById("movesLabel");
const timerLabelEl = document.getElementById("timerLabel");
const scoreLabelEl = document.getElementById("scoreLabel");
const rushLabelEl = document.getElementById("rushLabel");
const rushMetaEl = document.getElementById("rushMeta");
const rushFillEl = document.getElementById("rushFill");
const missionTitleEl = document.getElementById("missionTitle");
const messageEl = document.getElementById("message");
const worldChipEl = document.getElementById("worldChip");
const objectiveChipEl = document.getElementById("objectiveChip");
const depthChipEl = document.getElementById("depthChip");
const bestChipEl = document.getElementById("bestChip");
const doorChargeLabelEl = document.getElementById("doorChargeLabel");
const doorChargeFillEl = document.getElementById("doorChargeFill");
const questStarsEl = document.getElementById("questStars");
const questDoorEl = document.getElementById("questDoor");
const questClearEl = document.getElementById("questClear");
const keyLabelEl = document.getElementById("keyLabel");
const chestLabelEl = document.getElementById("chestLabel");
const relicLabelEl = document.getElementById("relicLabel");
const gemLabelEl = document.getElementById("gemLabel");
const satchelLabelEl = document.getElementById("satchelLabel");
const shieldLabelEl = document.getElementById("shieldLabel");
const introBannerEl = document.getElementById("introBanner");
const introTitleEl = document.getElementById("introTitle");
const introSubtitleEl = document.getElementById("introSubtitle");
const toastFeedEl = document.getElementById("toastFeed");
const musicBtnEl = document.getElementById("musicBtn");
const openStoryBtnEl = document.getElementById("openStoryBtn");
const openStoreBtnEl = document.getElementById("openStoreBtn");
const modalEl = document.getElementById("levelModal");
const modalTitleEl = document.getElementById("modalTitle");
const modalSummaryEl = document.getElementById("modalSummary");
const modalTimeEl = document.getElementById("modalTime");
const modalMovesEl = document.getElementById("modalMoves");
const modalBonusEl = document.getElementById("modalBonus");
const modalScoreEl = document.getElementById("modalScore");
const modalRankEl = document.getElementById("modalRank");
const viewportShellEl = document.getElementById("viewportShell");
const lookZoneEl = document.getElementById("lookZone");
const worldStageEl = document.getElementById("worldStage");
const dreamConsoleEl = document.getElementById("dreamConsole");
const jumpToGameBtnEl = document.getElementById("jumpToGameBtn");
const toggleConsoleBtnEl = document.getElementById("toggleConsoleBtn");
const mobileHintBtnEl = document.getElementById("mobileHintBtn");
const dragTipEl = document.getElementById("dragTip");
const guideModeLabelEl = document.getElementById("guideModeLabel");
const MOBILE_BREAKPOINT = 760;
const TOUCH_LAYOUT_QUERY = "(max-width: 1040px) and (pointer: coarse)";
const mobileLayoutQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
const touchLayoutQuery = window.matchMedia(TOUCH_LAYOUT_QUERY);
const storeModalEl = document.getElementById("storeModal");
const closeStoreBtnEl = document.getElementById("closeStoreBtn");
const openStorePanelBtnEl = document.getElementById("openStorePanelBtn");
const storeGridEl = document.getElementById("storeGrid");
const storeWalletLabelEl = document.getElementById("storeWalletLabel");
const storeCoinsLabelEl = document.getElementById("storeCoinsLabel");
const storePreviewEl = document.getElementById("storePreview");
const storyModeLabelEl = document.getElementById("storyModeLabel");
const storyProgressLabelEl = document.getElementById("storyProgressLabel");
const storyChapterLabelEl = document.getElementById("storyChapterLabel");
const storySummaryEl = document.getElementById("storySummary");
const storyBeatListEl = document.getElementById("storyBeatList");
const openStoryPanelBtnEl = document.getElementById("openStoryPanelBtn");
const storyModalEl = document.getElementById("storyModal");
const storyModalEyebrowEl = document.getElementById("storyModalEyebrow");
const storyModalTitleEl = document.getElementById("storyModalTitle");
const storyModalBodyEl = document.getElementById("storyModalBody");
const storyModalGoalEl = document.getElementById("storyModalGoal");
const storyModalProgressEl = document.getElementById("storyModalProgress");
const closeStoryBtnEl = document.getElementById("closeStoryBtn");
const storyModalContinueBtnEl = document.getElementById("storyModalContinueBtn");

let state = loadState();
let currentWorld = null;
let mapGrid = [];
let exitPoint = { x: 1, y: 1 };
let stars = [];
let sparks = [];
let pads = [];
let puddles = [];
let moonKeys = [];
let treasureChests = [];
let secretDoors = [];
let relicPages = [];
let dreamGems = [];
let supplySatchels = [];
let player = { x: 1.5, y: 1.5, angle: 0 };
let keys = {};
let hintUntil = 0;
let moveCount = 0;
let runCoins = 0;
let levelStartedAt = 0;
let animationId = null;
let musicEnabled = false;
let audioContext = null;
let musicTimer = null;
let gamePaused = false;
let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let wallDepthBuffer = [];
let pointerLook = { active: false, x: 0, y: 0 };
let viewBob = 0;
let rush = 100;
let introUntil = 0;
let toastTimers = [];
let burstUntil = 0;
let puddleCooldownUntil = 0;
let runInventory = { keys: 0, chests: 0, relics: 0, gems: 0, satchels: 0, shield: 0 };
let gateReadyNotified = false;

const FOV = Math.PI / 3;
const DEPTH = 14;
const MOVE_SPEED = 2.25;
const TURN_SPEED = 2.2;

function ownedStoreItem(id) {
  return state.ownedStoreItemIDs.includes(id);
}

function storeEffects() {
  return {
    maxRush: ownedStoreItem("rush-core") ? 120 : 100,
    sprintDrain: ownedStoreItem("rush-core") ? 22 : 28,
    rushRecharge: ownedStoreItem("rush-core") ? 19 : 16,
    pickupRadius: ownedStoreItem("spark-magnet") ? 0.56 : 0.42,
    sparkRadius: ownedStoreItem("spark-magnet") ? 0.5 : 0.38,
    clearBonusCoins: ownedStoreItem("gate-cache") ? 2 : 0,
    hintDuration: ownedStoreItem("moon-compass") ? 4200 : 2600,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    const next = saved ? { ...defaultState, ...saved } : { ...defaultState };
    if (!Array.isArray(next.storySeenChapterIDs)) next.storySeenChapterIDs = [];
    return next;
  } catch (_error) {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function chapterIndexForLevel(levelIndex = state.levelIndex) {
  return Math.min(storyChapters.length - 1, Math.floor(levelIndex / 10));
}

function currentChapter() {
  return storyChapters[chapterIndexForLevel()];
}

function chapterProgress(chapterIndex) {
  const start = chapterIndex * 10;
  const end = Math.min(worlds.length, start + 10);
  const cleared = state.completed.filter((level) => level >= start && level < end).length;
  return { cleared, total: end - start };
}

function chapterIsStartingWorld(levelIndex = state.levelIndex) {
  return levelIndex % 10 === 0;
}

function chapterIsFinalWorld(levelIndex = state.levelIndex) {
  return levelIndex % 10 === 9;
}

function renderStoryPanel() {
  const chapterIndex = chapterIndexForLevel();
  const chapter = storyChapters[chapterIndex];
  const progress = chapterProgress(chapterIndex);
  const nextWorld = Math.min(worlds.length, (chapterIndex + 1) * 10);
  const chapterCleared = progress.cleared >= progress.total;
  const beatItems = [
    `Goal: ${chapter.goal}`,
    `${progress.cleared}/${progress.total} worlds restored in this chapter`,
    chapterCleared ? "Chapter lantern fully restored" : `Reach world ${nextWorld} to finish this chapter`,
  ];

  storyModeLabelEl.textContent = chapter.title;
  storyProgressLabelEl.textContent = `Chapter ${chapterIndex + 1} of ${storyChapters.length}`;
  storyChapterLabelEl.textContent = chapter.title;
  storySummaryEl.textContent = chapter.summary;
  storyBeatListEl.innerHTML = beatItems
    .map((item, index) => `<div class="story-beat ${chapterCleared && index === 2 ? "done" : ""}">${item}</div>`)
    .join("");
}

function markChapterSeen(chapterIndex) {
  const id = storyChapters[chapterIndex]?.id;
  if (!id || state.storySeenChapterIDs.includes(id)) return false;
  state.storySeenChapterIDs.push(id);
  saveState();
  return true;
}

function openStoryModal(chapterIndex = chapterIndexForLevel(), mode = "journal") {
  const chapter = storyChapters[chapterIndex];
  const progress = chapterProgress(chapterIndex);
  closeStore();
  const body =
    mode === "intro"
      ? chapter.intro
      : mode === "outro"
        ? chapter.outro
        : chapter.summary;
  const eyebrow =
    mode === "intro"
      ? "Story Intro"
      : mode === "outro"
        ? "Chapter Cleared"
        : "Story Journal";

  storyModalEyebrowEl.textContent = eyebrow;
  storyModalTitleEl.textContent = chapter.title;
  storyModalBodyEl.textContent = body;
  storyModalGoalEl.textContent = chapter.goal;
  storyModalProgressEl.textContent = `${progress.cleared} / ${progress.total} worlds cleared`;
  storyModalEl.classList.remove("hidden");
  storyModalEl.setAttribute("aria-hidden", "false");
}

function closeStoryModal() {
  storyModalEl.classList.add("hidden");
  storyModalEl.setAttribute("aria-hidden", "true");
}

function spawnAngleFor(x, y) {
  if (mapGrid[y]?.[x + 1] && mapGrid[y][x + 1] !== "#") return 0;
  if (mapGrid[y + 1]?.[x] && mapGrid[y + 1][x] !== "#") return Math.PI / 2;
  if (mapGrid[y]?.[x - 1] && mapGrid[y][x - 1] !== "#") return Math.PI;
  return -Math.PI / 2;
}

function setupWorld(index = state.levelIndex) {
  state.levelIndex = ((index % worlds.length) + worlds.length) % worlds.length;
  currentWorld = worlds[state.levelIndex];
  mapGrid = currentWorld.map.map((row) => row.split(""));
  stars = [];
  sparks = [];
  pads = [];
  puddles = [];
  moonKeys = [];
  treasureChests = [];
  secretDoors = [];
  relicPages = [];
  dreamGems = [];
  supplySatchels = [];
  moveCount = 0;
  runCoins = 0;
  rush = storeEffects().maxRush;
  runInventory = { keys: 0, chests: 0, relics: 0, gems: 0, satchels: 0, shield: 0 };
  burstUntil = 0;
  gateReadyNotified = false;
  levelStartedAt = performance.now();
  hintUntil = 0;
  introUntil = performance.now() + 2200;

  for (let y = 0; y < mapGrid.length; y += 1) {
    for (let x = 0; x < mapGrid[y].length; x += 1) {
      const cell = mapGrid[y][x];
      if (cell === "S") {
        player = { x: x + 0.5, y: y + 0.5, angle: spawnAngleFor(x, y) };
        mapGrid[y][x] = ".";
      } else if (cell === "E") {
        exitPoint = { x: x + 0.5, y: y + 0.5 };
      } else if (cell === "*") {
        stars.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      } else if (cell === "o") {
        sparks.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      } else if (cell === "P") {
        pads.push({ x: x + 0.5, y: y + 0.5, activeUntil: 0 });
        mapGrid[y][x] = ".";
      } else if (cell === "X") {
        puddles.push({ x: x + 0.5, y: y + 0.5 });
        mapGrid[y][x] = ".";
      } else if (cell === "K") {
        moonKeys.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      } else if (cell === "C") {
        treasureChests.push({ x: x + 0.5, y: y + 0.5, opened: false });
        mapGrid[y][x] = ".";
      } else if (cell === "D") {
        secretDoors.push({ x: x + 0.5, y: y + 0.5, gridX: x, gridY: y, unlocked: false });
      } else if (cell === "R") {
        relicPages.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      } else if (cell === "G") {
        dreamGems.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      } else if (cell === "B") {
        supplySatchels.push({ x: x + 0.5, y: y + 0.5, collected: false });
        mapGrid[y][x] = ".";
      }
    }
  }

  worldLabelEl.textContent = currentWorld.world;
  levelLabelEl.textContent = String(state.levelIndex + 1);
  missionTitleEl.textContent = currentWorld.title;
  worldChipEl.textContent = currentWorld.world;
  depthChipEl.textContent = `Depth ${DEPTH}m`;
  bestChipEl.textContent = bestLabel();
  introTitleEl.textContent = currentWorld.world;
  introSubtitleEl.textContent = currentWorld.objective;
  introBannerEl.classList.remove("hidden");
  clearToasts();
  const chapter = currentChapter();
  messageEl.textContent = `${chapter.goal} ${currentWorld.objective}`;
  pushToast("World Loaded", `${currentWorld.world} is open. Hunt all badge stars.`);
  renderStoryPanel();
  updateHud();
  closeModal();
  closeStoryModal();

  const chapterIndex = chapterIndexForLevel();
  if (chapterIsStartingWorld() && markChapterSeen(chapterIndex)) {
    pushToast("Story Mode", `${chapter.title} has begun.`);
    window.setTimeout(() => openStoryModal(chapterIndex, "intro"), 450);
  }

  window.DreamAudio?.resetGateCharge?.();
  window.DreamAudio?.setWorldTheme?.(state.levelIndex);
}

function updateHud() {
  const effects = storeEffects();
  const collected = stars.filter((star) => star.collected).length;
  const total = stars.length;
  const doorCharge = total ? Math.round((collected / total) * 100) : 100;
  const lockedDoors = secretDoors.filter((door) => !door.unlocked).length;
  const unopenedChests = treasureChests.filter((chest) => !chest.opened).length;
  coinsLabelEl.textContent = String(state.coins);
  storeWalletLabelEl.textContent = `${state.coins} coins`;
  storeCoinsLabelEl.textContent = `${state.coins} coins`;
  badgesLabelEl.textContent = `${collected}/${total}`;
  movesLabelEl.textContent = String(moveCount);
  scoreLabelEl.textContent = String(scoreRun());
  rushLabelEl.textContent = `${Math.round(rush)}/${effects.maxRush}`;
  rushMetaEl.textContent = rush > 50 ? "Ready" : rush > 18 ? "Cooling" : "Empty";
  keyLabelEl.textContent = String(runInventory.keys);
  chestLabelEl.textContent = `${runInventory.chests}/${treasureChests.length}`;
  relicLabelEl.textContent = `${runInventory.relics}`;
  gemLabelEl.textContent = `${runInventory.gems}`;
  satchelLabelEl.textContent = `${runInventory.satchels}`;
  shieldLabelEl.textContent = `${runInventory.shield}`;
  rushFillEl.style.transform = `scaleX(${Math.max(0, Math.min(1, rush / effects.maxRush))})`;
  doorChargeLabelEl.textContent = `${doorCharge}%`;
  doorChargeFillEl.style.transform = `scaleX(${doorCharge / 100})`;
  const gateReady = total > 0 && collected === total;
  viewportShellEl?.classList.toggle("gate-ready", gateReady);
  window.DreamAudio?.onGateCharge?.(doorCharge);
  if (gateReady && !gateReadyNotified) {
    gateReadyNotified = true;
    window.GamePlus?.onGateReady?.();
  }
  if (!gateReady) {
    gateReadyNotified = false;
  }
  objectiveChipEl.textContent =
    runInventory.keys === 0 && (lockedDoors > 0 || unopenedChests > 0)
      ? "Find a moon key"
      : total === collected
        ? "Door is ready"
        : `Find ${total - collected} more stars`;
  bestChipEl.textContent = bestLabel();
  questStarsEl.textContent = total === collected ? "All badge stars collected." : `Collect all badge stars (${collected}/${total}).`;
  questDoorEl.textContent =
    lockedDoors > 0
      ? `Unlock ${lockedDoors} secret door${lockedDoors === 1 ? "" : "s"} and search the side rooms.`
      : total === collected
        ? "Gate fully charged."
        : `Charge the gate (${doorCharge}%).`;
  questClearEl.textContent =
    unopenedChests > 0
      ? `Open ${unopenedChests} treasure chest${unopenedChests === 1 ? "" : "s"} and bank the loot.`
      : scoreRun() >= 600
        ? "Escape with a strong score."
        : "Build score with speed and clean routing.";
  questStarsEl.classList.toggle("done", total === collected);
  questDoorEl.classList.toggle("done", lockedDoors === 0);
  questClearEl.classList.toggle("done", unopenedChests === 0 && scoreRun() >= 600);
  renderStorePreview();
  renderStore();
}

function bestLabel() {
  const best = state.bestTimes[currentWorld?.title];
  return best ? `Best ${formatTime(best)}` : "Best --:--";
}

function scoreRun() {
  const collected = stars.filter((star) => star.collected).length;
  const sparkCount = sparks.filter((spark) => spark.collected).length;
  const lootBonus = runInventory.chests * 220 + runInventory.relics * 160 + runInventory.gems * 110 + runInventory.satchels * 80;
  const timePenalty = Math.floor(worldTime() / 1000) * 3;
  const movementPenalty = Math.floor(moveCount / 8);
  return Math.max(
    0,
    collected * 180 + sparkCount * 75 + runCoins * 40 + lootBonus + Math.round(rush * 2) - timePenalty - movementPenalty
  );
}

function rankForScore(score) {
  if (score >= 1200) return "S";
  if (score >= 900) return "A";
  if (score >= 650) return "B";
  if (score >= 420) return "C";
  return "D";
}

function clearToasts() {
  toastTimers.forEach((timer) => clearTimeout(timer));
  toastTimers = [];
  toastFeedEl.innerHTML = "";
}

function pushToast(title, body) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
  toastFeedEl.appendChild(toast);
  const timer = setTimeout(() => {
    toast.remove();
  }, 2800);
  toastTimers.push(timer);
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function worldTime() {
  return performance.now() - levelStartedAt;
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(freq, duration, volume = 0.05) {
  if (!musicEnabled) return;
  ensureAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.frequency.value = freq;
  osc.type = "sine";
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  osc.stop(audioContext.currentTime + duration);
}

function playSfx(name) {
  if (!window.DreamAudio?.playSfx) {
    playToneFallback(name);
    return;
  }
  window.DreamAudio.playSfx(name);
}

const toneFallback = {
  star: [660, 0.18],
  pickup: [740, 0.14],
  puddle: [260, 0.2],
  gate: [440, 0.12],
  gateReady: [523, 0.35],
  nearStar: [520, 0.1],
};

function playToneFallback(name) {
  const spec = toneFallback[name];
  if (!spec) return;
  ensureAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.frequency.value = spec[0];
  osc.type = "sine";
  gain.gain.value = 0.06;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + spec[1]);
  osc.stop(audioContext.currentTime + spec[1]);
}

window.playToneFallback = playToneFallback;

function startAtmosphere() {
  musicEnabled = true;
  window.DreamAudio?.start?.();
  musicBtnEl.textContent = "Pause Music";
  messageEl.textContent = "Original dream music is flowing through the maze.";
  try {
    localStorage.setItem(
      "muffin-dream-settings",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("muffin-dream-settings") || "{}"),
        musicPreferred: true,
      })
    );
  } catch (_error) {
    /* ignore */
  }
}

function stopAtmosphere() {
  musicEnabled = false;
  clearInterval(musicTimer);
  musicTimer = null;
  window.DreamAudio?.stop?.();
  musicBtnEl.textContent = "Start Music";
}

function toggleAtmosphere() {
  if (musicEnabled) stopAtmosphere();
  else startAtmosphere();
}

function isWall(x, y) {
  const gridX = Math.floor(x);
  const gridY = Math.floor(y);
  const cell = mapGrid[gridY]?.[gridX];
  return cell === "#" || cell === "D";
}

function movePlayer(nextX, nextY) {
  const oldX = player.x;
  const oldY = player.y;

  if (!isWall(nextX, oldY)) player.x = nextX;
  if (!isWall(player.x, nextY)) player.y = nextY;

  if (Math.hypot(player.x - oldX, player.y - oldY) > 0.03) {
    moveCount += 1;
  }
}

function updatePlayer(dt) {
  const effects = storeEffects();
  let moved = false;
  const sprinting = keys.sprint && rush > 1;
  const boosted = performance.now() < burstUntil;
  const stride = MOVE_SPEED * (sprinting ? 1.7 : 1) * (boosted ? 1.28 : 1) * dt;
  const rotate = TURN_SPEED * dt;

  if (keys.left) player.angle -= rotate;
  if (keys.right) player.angle += rotate;

  let dx = 0;
  let dy = 0;

  if (keys.forward) {
    dx += Math.cos(player.angle) * stride;
    dy += Math.sin(player.angle) * stride;
    moved = true;
  }
  if (keys.backward) {
    dx -= Math.cos(player.angle) * stride;
    dy -= Math.sin(player.angle) * stride;
    moved = true;
  }
  if (keys.strafeLeft) {
    dx += Math.cos(player.angle - Math.PI / 2) * stride * 0.85;
    dy += Math.sin(player.angle - Math.PI / 2) * stride * 0.85;
    moved = true;
  }
  if (keys.strafeRight) {
    dx += Math.cos(player.angle + Math.PI / 2) * stride * 0.85;
    dy += Math.sin(player.angle + Math.PI / 2) * stride * 0.85;
    moved = true;
  }

  if (moved) {
    movePlayer(player.x + dx, player.y + dy);
  }

  if (sprinting && moved) rush = Math.max(0, rush - dt * effects.sprintDrain);
  else rush = Math.min(effects.maxRush, rush + dt * effects.rushRecharge);

  viewBob = moved ? Math.min(1, viewBob + dt * 5) : Math.max(0, viewBob - dt * 3);
}

function castRay(angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let distance = 0;

  while (distance < DEPTH) {
    distance += 0.02;
    const testX = player.x + cos * distance;
    const testY = player.y + sin * distance;
    if (isWall(testX, testY)) {
      return { distance, hitX: testX, hitY: testY };
    }
  }

  return { distance: DEPTH, hitX: player.x, hitY: player.y };
}

function drawBackground() {
  if (performance.now() > introUntil) {
    introBannerEl.classList.add("hidden");
  }

  const bobOffset = Math.sin(performance.now() / 140) * 8 * viewBob;
  const horizon = viewCanvas.height * 0.42 + bobOffset;
  const sky = viewCtx.createLinearGradient(0, 0, 0, viewCanvas.height * 0.58);
  sky.addColorStop(0, currentWorld.sky[0]);
  sky.addColorStop(1, currentWorld.sky[1]);
  viewCtx.fillStyle = sky;
  viewCtx.fillRect(0, 0, viewCanvas.width, horizon);

  const floor = viewCtx.createLinearGradient(0, horizon, 0, viewCanvas.height);
  floor.addColorStop(0, currentWorld.floor[0]);
  floor.addColorStop(1, currentWorld.floor[1]);
  viewCtx.fillStyle = floor;
  viewCtx.fillRect(0, horizon, viewCanvas.width, viewCanvas.height - horizon);

  viewCtx.strokeStyle = "rgba(255,255,255,0.05)";
  viewCtx.lineWidth = 1;
  for (let i = 1; i <= 8; i += 1) {
    const y = horizon + ((viewCanvas.height - horizon) * i) / 8;
    viewCtx.beginPath();
    viewCtx.moveTo(0, y);
    viewCtx.lineTo(viewCanvas.width, y);
    viewCtx.stroke();
  }

  for (let i = 0; i < 45; i += 1) {
    const x = ((i * 197) + performance.now() * 0.02) % viewCanvas.width;
    const y = ((i * 113) % 230) + 10 + bobOffset * 0.2;
    const radius = ((i % 3) + 1) * 0.9;
    viewCtx.fillStyle = "rgba(255,255,255,0.85)";
    viewCtx.beginPath();
    viewCtx.arc(x, y, radius, 0, Math.PI * 2);
    viewCtx.fill();
  }
}

function drawWalls() {
  const columns = reducedMotion
    ? viewCanvas.width
    : Math.max(160, Math.floor(viewCanvas.width / 2));
  const step = viewCanvas.width / columns;
  wallDepthBuffer = new Array(viewCanvas.width);

  for (let i = 0; i < columns; i += 1) {
    const x = Math.min(viewCanvas.width - 1, Math.floor(i * step));
    const rayAngle = player.angle - FOV / 2 + (x / viewCanvas.width) * FOV;
    const ray = castRay(rayAngle);
    const corrected = ray.distance * Math.cos(rayAngle - player.angle);
    const wallHeight = Math.min(viewCanvas.height, (viewCanvas.height * 0.82) / corrected);
    const shade = Math.max(0.22, 1 - corrected / DEPTH);
    const color = tintColor(currentWorld.wall, shade);
    const startY = (viewCanvas.height - wallHeight) / 2;
    const barWidth = Math.ceil(step) + 1;

    for (let fillX = x; fillX < x + barWidth && fillX < viewCanvas.width; fillX += 1) {
      wallDepthBuffer[fillX] = corrected;
    }

    viewCtx.fillStyle = color;
    viewCtx.fillRect(x, startY, barWidth, wallHeight);

    const mist = Math.min(0.58, corrected / DEPTH);
    viewCtx.fillStyle = `rgba(245, 208, 254, ${mist * 0.28})`;
    viewCtx.fillRect(x, startY, barWidth, wallHeight);
  }
}

function drawSprites() {
  const sprites = [];

  stars.forEach((star) => {
    if (!star.collected) {
      sprites.push({
        x: star.x,
        y: star.y,
        color: currentWorld.accent,
        glow: "#fff7ae",
        size: 0.3,
        label: "⭐",
      });
    }
  });

  sparks.forEach((spark) => {
    if (!spark.collected) {
      sprites.push({
        x: spark.x,
        y: spark.y,
        color: "#60a5fa",
        glow: "#bfdbfe",
        size: 0.22,
        label: "✦",
      });
    }
  });

  pads.forEach((pad) => {
    sprites.push({
      x: pad.x,
      y: pad.y,
      color: performance.now() < pad.activeUntil ? "#34d399" : "#22d3ee",
      glow: performance.now() < pad.activeUntil ? "#bbf7d0" : "#67e8f9",
      size: 0.26,
      label: "⬢",
    });
  });

  puddles.forEach((puddle) => {
    sprites.push({
      x: puddle.x,
      y: puddle.y,
      color: "#111827",
      glow: "#7c3aed",
      size: 0.24,
      label: "◉",
    });
  });

  moonKeys.forEach((moonKey) => {
    if (!moonKey.collected) {
      sprites.push({
        x: moonKey.x,
        y: moonKey.y,
        color: "#fbbf24",
        glow: "#fde68a",
        size: 0.28,
        label: "🗝",
      });
    }
  });

  treasureChests.forEach((chest) => {
    if (!chest.opened) {
      sprites.push({
        x: chest.x,
        y: chest.y,
        color: "#92400e",
        glow: "#f59e0b",
        size: 0.34,
        label: "📦",
      });
    }
  });

  secretDoors.forEach((door) => {
    sprites.push({
      x: door.x,
      y: door.y,
      color: door.unlocked ? "#34d399" : "#7c3aed",
      glow: door.unlocked ? "#a7f3d0" : "#c4b5fd",
      size: 0.38,
      label: door.unlocked ? "🜂" : "🚪",
    });
  });

  relicPages.forEach((relic) => {
    if (!relic.collected) {
      sprites.push({
        x: relic.x,
        y: relic.y,
        color: "#f8fafc",
        glow: "#e9d5ff",
        size: 0.27,
        label: "📜",
      });
    }
  });

  dreamGems.forEach((gem) => {
    if (!gem.collected) {
      sprites.push({
        x: gem.x,
        y: gem.y,
        color: "#22d3ee",
        glow: "#bae6fd",
        size: 0.26,
        label: "💎",
      });
    }
  });

  supplySatchels.forEach((satchel) => {
    if (!satchel.collected) {
      sprites.push({
        x: satchel.x,
        y: satchel.y,
        color: "#ec4899",
        glow: "#fbcfe8",
        size: 0.28,
        label: "🎒",
      });
    }
  });

  const gateReady = stars.every((star) => star.collected);
  const gatePulse = gateReady ? 0.08 * Math.sin(performance.now() / 180) : 0;
  sprites.push({
    x: exitPoint.x,
    y: exitPoint.y,
    color: gateReady ? "#34d399" : "#f59e0b",
    glow: gateReady ? "#bbf7d0" : "#fde68a",
    size: 0.42 + gatePulse,
    label: gateReady ? "🚪" : "🔒",
  });

  sprites
    .map((sprite) => ({
      ...sprite,
      dx: sprite.x - player.x,
      dy: sprite.y - player.y,
      dist: Math.hypot(sprite.x - player.x, sprite.y - player.y),
    }))
    .sort((a, b) => b.dist - a.dist)
    .forEach((sprite) => {
      const angleToSprite = Math.atan2(sprite.dy, sprite.dx) - player.angle;
      const normalized = Math.atan2(Math.sin(angleToSprite), Math.cos(angleToSprite));

      if (Math.abs(normalized) > FOV * 0.7) return;
      if (sprite.dist < 0.2 || sprite.dist > DEPTH) return;

      const screenX = (normalized / FOV + 0.5) * viewCanvas.width;
      const scale = Math.min(260, 310 / sprite.dist);
      const screenY = viewCanvas.height * 0.52;
      const halfWidth = scale * sprite.size;
      const left = Math.max(0, Math.floor(screenX - halfWidth));
      const right = Math.min(viewCanvas.width - 1, Math.ceil(screenX + halfWidth));
      let blocked = 0;

      for (let column = left; column <= right; column += 1) {
        if (wallDepthBuffer[column] < sprite.dist) {
          blocked += 1;
        }
      }

      if (blocked > (right - left + 1) * 0.6) return;

      viewCtx.save();
      viewCtx.globalAlpha = Math.max(0.2, 1 - sprite.dist / DEPTH);
      viewCtx.shadowBlur = 26;
      viewCtx.shadowColor = sprite.glow;
      viewCtx.fillStyle = sprite.color;
      viewCtx.beginPath();
      viewCtx.arc(screenX, screenY, scale * sprite.size, 0, Math.PI * 2);
      viewCtx.fill();
      viewCtx.shadowBlur = 0;
      viewCtx.font = `${Math.max(20, scale * 0.58)}px sans-serif`;
      viewCtx.textAlign = "center";
      viewCtx.fillStyle = "#ffffff";
      viewCtx.fillText(sprite.label, screenX, screenY + scale * 0.18);
      viewCtx.restore();
    });
}

function drawHintBeam() {
  if (performance.now() > hintUntil) return;
  const target = getHintTarget();
  if (!target) return;

  const targetAngle = Math.atan2(target.y - player.y, target.x - player.x);
  const diff = Math.atan2(Math.sin(targetAngle - player.angle), Math.cos(targetAngle - player.angle));
  const x = (diff / FOV + 0.5) * viewCanvas.width;

  viewCtx.save();
  const beam = viewCtx.createLinearGradient(x, 0, x, viewCanvas.height);
  beam.addColorStop(0, "rgba(255,255,255,0)");
  beam.addColorStop(0.45, "rgba(103,232,249,0.25)");
  beam.addColorStop(1, "rgba(103,232,249,0)");
  viewCtx.fillStyle = beam;
  viewCtx.fillRect(x - 28, 0, 56, viewCanvas.height);
  viewCtx.restore();
}

function drawMinimap() {
  const size = minimapCanvas.width / mapGrid[0].length;
  minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

  mapGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      minimapCtx.fillStyle = cell === "#" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.05)";
      minimapCtx.fillRect(x * size, y * size, size - 1, size - 1);
    });
  });

  stars.forEach((star) => {
    if (!star.collected) {
      minimapCtx.fillStyle = "#fde68a";
      minimapCtx.beginPath();
      minimapCtx.arc(star.x * size, star.y * size, size * 0.14, 0, Math.PI * 2);
      minimapCtx.fill();
    }
  });

  sparks.forEach((spark) => {
    if (!spark.collected) {
      minimapCtx.fillStyle = "#60a5fa";
      minimapCtx.beginPath();
      minimapCtx.arc(spark.x * size, spark.y * size, size * 0.11, 0, Math.PI * 2);
      minimapCtx.fill();
    }
  });

  pads.forEach((pad) => {
    minimapCtx.fillStyle = performance.now() < pad.activeUntil ? "#34d399" : "#22d3ee";
    minimapCtx.fillRect((pad.x - 0.12) * size, (pad.y - 0.12) * size, size * 0.24, size * 0.24);
  });

  puddles.forEach((puddle) => {
    minimapCtx.fillStyle = "#7c3aed";
    minimapCtx.beginPath();
    minimapCtx.arc(puddle.x * size, puddle.y * size, size * 0.1, 0, Math.PI * 2);
    minimapCtx.fill();
  });

  moonKeys.forEach((moonKey) => {
    if (!moonKey.collected) {
      minimapCtx.fillStyle = "#fbbf24";
      minimapCtx.fillRect((moonKey.x - 0.14) * size, (moonKey.y - 0.14) * size, size * 0.28, size * 0.28);
    }
  });

  treasureChests.forEach((chest) => {
    if (!chest.opened) {
      minimapCtx.fillStyle = "#f59e0b";
      minimapCtx.fillRect((chest.x - 0.16) * size, (chest.y - 0.16) * size, size * 0.32, size * 0.32);
    }
  });

  secretDoors.forEach((door) => {
    minimapCtx.fillStyle = door.unlocked ? "#34d399" : "#8b5cf6";
    minimapCtx.fillRect((door.x - 0.12) * size, (door.y - 0.12) * size, size * 0.24, size * 0.24);
  });

  relicPages.forEach((relic) => {
    if (!relic.collected) {
      minimapCtx.fillStyle = "#ffffff";
      minimapCtx.beginPath();
      minimapCtx.arc(relic.x * size, relic.y * size, size * 0.09, 0, Math.PI * 2);
      minimapCtx.fill();
    }
  });

  dreamGems.forEach((gem) => {
    if (!gem.collected) {
      minimapCtx.fillStyle = "#22d3ee";
      minimapCtx.beginPath();
      minimapCtx.arc(gem.x * size, gem.y * size, size * 0.1, 0, Math.PI * 2);
      minimapCtx.fill();
    }
  });

  supplySatchels.forEach((satchel) => {
    if (!satchel.collected) {
      minimapCtx.fillStyle = "#ec4899";
      minimapCtx.fillRect((satchel.x - 0.14) * size, (satchel.y - 0.14) * size, size * 0.28, size * 0.28);
    }
  });

  minimapCtx.fillStyle = "#34d399";
  minimapCtx.fillRect((exitPoint.x - 0.18) * size, (exitPoint.y - 0.18) * size, size * 0.36, size * 0.36);

  minimapCtx.strokeStyle = "#67e8f9";
  minimapCtx.lineWidth = 2;
  minimapCtx.beginPath();
  minimapCtx.moveTo(player.x * size, player.y * size);
  minimapCtx.lineTo(
    (player.x + Math.cos(player.angle) * 0.7) * size,
    (player.y + Math.sin(player.angle) * 0.7) * size
  );
  minimapCtx.stroke();

  minimapCtx.fillStyle = "#ffffff";
  minimapCtx.beginPath();
  minimapCtx.arc(player.x * size, player.y * size, size * 0.18, 0, Math.PI * 2);
  minimapCtx.fill();
}

function tintColor(hex, amount) {
  const raw = hex.replace("#", "");
  const r = Math.min(255, Math.floor(parseInt(raw.slice(0, 2), 16) * amount));
  const g = Math.min(255, Math.floor(parseInt(raw.slice(2, 4), 16) * amount));
  const b = Math.min(255, Math.floor(parseInt(raw.slice(4, 6), 16) * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function collectStars() {
  const effects = storeEffects();
  stars.forEach((star) => {
    if (!star.collected && Math.hypot(star.x - player.x, star.y - player.y) < effects.pickupRadius) {
      star.collected = true;
      runCoins += 1;
      state.coins += 1;
      saveState();
      updateHud();
      messageEl.textContent = "Badge star collected. The gate charge is climbing.";
      pushToast("Badge Star", `+1 dream coin. Gate charge is now ${Math.round((stars.filter((item) => item.collected).length / stars.length) * 100)}%.`);
      playSfx("star");
      window.GamePlus?.onStarCollected?.();
    }
  });
}

function collectSparks() {
  const effects = storeEffects();
  sparks.forEach((spark) => {
    if (!spark.collected && Math.hypot(spark.x - player.x, spark.y - player.y) < effects.sparkRadius) {
      spark.collected = true;
      runCoins += 1;
      state.coins += 1;
      rush = Math.min(effects.maxRush, rush + 18);
      updateHud();
      messageEl.textContent = "A dream spark boosted Muffin's pace.";
      pushToast("Dream Spark", "Rush restored and score boosted.");
      playSfx("pickup");
    }
  });
}

function collectMoonKeys() {
  moonKeys.forEach((moonKey) => {
    if (!moonKey.collected && Math.hypot(moonKey.x - player.x, moonKey.y - player.y) < 0.42) {
      moonKey.collected = true;
      runInventory.keys += 1;
      runCoins += 1;
      state.coins += 1;
      saveState();
      updateHud();
      messageEl.textContent = "Muffin found a moon key. Secret locks can open now.";
      pushToast("Moon Key", `+1 key. ${runInventory.keys} key${runInventory.keys === 1 ? "" : "s"} ready.`);
      playSfx("pickup");
    }
  });
}

function openSecretDoors() {
  secretDoors.forEach((door) => {
    if (!door.unlocked && runInventory.keys > 0 && Math.hypot(door.x - player.x, door.y - player.y) < 0.55) {
      door.unlocked = true;
      mapGrid[door.gridY][door.gridX] = ".";
      messageEl.textContent = "A secret moon door slides open into a hidden room.";
      pushToast("Secret Door", "A hidden treasure room is now open.");
      playSfx("pickup");
    }
  });
}

function openTreasureChests() {
  treasureChests.forEach((chest) => {
    if (!chest.opened && Math.hypot(chest.x - player.x, chest.y - player.y) < 0.5) {
      if (runInventory.keys < 1) {
        messageEl.textContent = "This treasure chest is locked. Muffin needs a moon key.";
        return;
      }

      chest.opened = true;
      runInventory.keys -= 1;
      runInventory.chests += 1;
      runCoins += 3;
      state.coins += 3;
      state.openedChests += 1;
      saveState();
      updateHud();
      messageEl.textContent = "Treasure chest opened. Coins and secret loot spill out.";
      pushToast("Treasure Chest", "+3 dream coins and a secret stash reward.");
      playSfx("pickup");
    }
  });
}

function collectRelics() {
  relicPages.forEach((relic) => {
    if (!relic.collected && Math.hypot(relic.x - player.x, relic.y - player.y) < 0.4) {
      relic.collected = true;
      runInventory.relics += 1;
      runCoins += 2;
      state.coins += 2;
      state.relicPages += 1;
      saveState();
      updateHud();
      messageEl.textContent = "Muffin recovered a relic page from the hidden room.";
      pushToast("Relic Page", "Story relic added to Muffin's collection.");
      playSfx("pickup");
    }
  });
}

function collectDreamGems() {
  dreamGems.forEach((gem) => {
    if (!gem.collected && Math.hypot(gem.x - player.x, gem.y - player.y) < 0.4) {
      gem.collected = true;
      runInventory.gems += 1;
      runCoins += 2;
      state.coins += 2;
      rush = Math.min(storeEffects().maxRush, rush + 10);
      saveState();
      updateHud();
      messageEl.textContent = "A dream gem glows brighter in Muffin's loot bag.";
      pushToast("Dream Gem", "+2 coins and a small rush refill.");
      playSfx("pickup");
    }
  });
}

function collectSupplySatchels() {
  supplySatchels.forEach((satchel) => {
    if (!satchel.collected && Math.hypot(satchel.x - player.x, satchel.y - player.y) < 0.42) {
      satchel.collected = true;
      runInventory.satchels += 1;
      runInventory.shield += 1;
      rush = Math.min(storeEffects().maxRush, rush + 24);
      updateHud();
      messageEl.textContent = "Supply satchel grabbed. Muffin gained a shield and extra rush.";
      pushToast("Supply Satchel", "Shield up. The next shadow hit can be blocked.");
      playSfx("pickup");
    }
  });
}

function handlePads() {
  const effects = storeEffects();
  pads.forEach((pad) => {
    if (Math.hypot(pad.x - player.x, pad.y - player.y) < 0.45 && performance.now() > pad.activeUntil) {
      burstUntil = performance.now() + 2200;
      rush = Math.min(effects.maxRush, rush + 30);
      pad.activeUntil = performance.now() + 2800;
      messageEl.textContent = "Moon pad triggered. Muffin bursts forward.";
      pushToast("Moon Pad", "Speed burst active for a short run.");
      playSfx("pickup");
    }
  });
}

function handlePuddles() {
  if (performance.now() < puddleCooldownUntil) return;

  for (const puddle of puddles) {
    if (Math.hypot(puddle.x - player.x, puddle.y - player.y) < 0.42) {
      if (runInventory.shield > 0) {
        runInventory.shield -= 1;
        puddleCooldownUntil = performance.now() + 900;
        updateHud();
        messageEl.textContent = "Muffin's shield blocked the shadow puddle.";
        pushToast("Shield Saved You", "The stash shield absorbed the shadow hit.");
        playSfx("pickup");
        break;
      }
      rush = Math.max(0, rush - 24);
      puddleCooldownUntil = performance.now() + 1300;
      messageEl.textContent = "A shadow puddle slows Muffin down.";
      pushToast("Shadow Puddle", "Rush drained. Rebuild your pace.");
      playSfx("puddle");
      window.GamePlus?.onPuddleHit?.();
      break;
    }
  }
}

function tryExit() {
  const allCollected = stars.every((star) => star.collected);
  const nearExit = Math.hypot(exitPoint.x - player.x, exitPoint.y - player.y) < 0.55;
  if (!nearExit) return;

  if (!allCollected) {
    messageEl.textContent = "The gate is locked. More badge stars are still hidden in the maze.";
    pushToast("Gate Locked", "Collect every badge star before escaping.");
    return;
  }

  completeLevel();
}

function getHintTarget() {
  return (
    moonKeys.find((moonKey) => !moonKey.collected) ||
    stars.find((star) => !star.collected) ||
    treasureChests.find((chest) => !chest.opened) ||
    relicPages.find((relic) => !relic.collected) ||
    dreamGems.find((gem) => !gem.collected) ||
    exitPoint
  );
}

function triggerHint() {
  hintUntil = performance.now() + storeEffects().hintDuration;
  const target = getHintTarget();
  const label = moonKeys.some((moonKey) => !moonKey.collected)
    ? "nearest moon key"
    : stars.some((star) => !star.collected)
      ? "nearest badge star"
      : treasureChests.some((chest) => !chest.opened)
        ? "treasure chest"
        : "dream door";
  if (target) {
    messageEl.textContent = `A moonbeam points toward the ${label}.`;
    pushToast("Dream Hint", `The beam is guiding you toward the ${label}.`);
    playSfx("nearStar");
  }
}

function completeLevel() {
  const elapsed = worldTime();
  const allCollected = stars.every((star) => star.collected);
  const bonus = (allCollected ? 3 : 0) + storeEffects().clearBonusCoins + runInventory.chests;
  const score = scoreRun() + bonus * 100;
  const rank = rankForScore(score);
  const chapterIndex = chapterIndexForLevel();
  const chapter = currentChapter();
  state.coins += bonus;
  const best = state.bestTimes[currentWorld.title];
  if (!best || elapsed < best) {
    state.bestTimes[currentWorld.title] = elapsed;
  }
  if (!state.completed.includes(state.levelIndex)) {
    state.completed.push(state.levelIndex);
  }
  saveState();
  window.DreamAudio?.playVictory?.();

  modalTitleEl.textContent = `${currentWorld.world} cleared`;
  modalSummaryEl.textContent = allCollected
    ? "Muffin gathered every badge star and opened the next dream door."
    : "Muffin escaped the maze, but a few stars are still floating behind.";
  if (runInventory.chests || runInventory.relics || runInventory.gems) {
    modalSummaryEl.textContent += ` Secret haul: ${runInventory.chests} chest${runInventory.chests === 1 ? "" : "s"}, ${runInventory.relics} relic${runInventory.relics === 1 ? "" : "s"}, ${runInventory.gems} gem${runInventory.gems === 1 ? "" : "s"}.`;
  }
  if (chapterIsFinalWorld()) {
    modalSummaryEl.textContent += ` ${chapter.outro}`;
  }
  modalTimeEl.textContent = formatTime(elapsed);
  modalMovesEl.textContent = String(moveCount);
  modalBonusEl.textContent = `+${bonus}`;
  modalScoreEl.textContent = String(score);
  modalRankEl.textContent = rank;
  modalEl.classList.remove("hidden");
  modalEl.setAttribute("aria-hidden", "false");
  messageEl.textContent = "Dream complete. Step into the next world when you're ready.";
  pushToast("World Cleared", `${currentWorld.world} complete. Rank ${rank}.`);
  if (chapterIsFinalWorld()) {
    pushToast("Chapter Cleared", `${chapter.title} is complete.`);
  }
  playSfx("gateReady");
  renderStoryPanel();
}

function closeModal() {
  modalEl.classList.add("hidden");
  modalEl.setAttribute("aria-hidden", "true");
}

function openStore() {
  renderStore();
  closeStoryModal();
  storeModalEl.classList.remove("hidden");
  storeModalEl.setAttribute("aria-hidden", "false");
}

function closeStore() {
  storeModalEl.classList.add("hidden");
  storeModalEl.setAttribute("aria-hidden", "true");
}

function buyStoreItem(itemID) {
  const item = storeItems.find((entry) => entry.id === itemID);
  if (!item || ownedStoreItem(itemID) || state.coins < item.cost) return;
  state.coins -= item.cost;
  state.ownedStoreItemIDs.push(itemID);
  saveState();
  pushToast("Store Unlock", `${item.title} is now active for every maze.`);
  messageEl.textContent = `${item.title} unlocked. Muffin's dream run just got stronger.`;
  renderStore();
  updateHud();
}

function renderStorePreview() {
  const unlocked = storeItems.filter((item) => ownedStoreItem(item.id));
  const previewItems = unlocked.length ? unlocked : storeItems.slice(0, 2);
  storePreviewEl.innerHTML = previewItems
    .map((item) => {
      const status = ownedStoreItem(item.id) ? "Owned" : `${item.cost} coins`;
      return `<div class="store-preview-card"><strong>${item.title}</strong><span>${status}</span></div>`;
    })
    .join("");
}

function renderStore() {
  storeGridEl.innerHTML = storeItems
    .map((item) => {
      const owned = ownedStoreItem(item.id);
      const canAfford = state.coins >= item.cost;
      const buttonLabel = owned ? "Owned" : canAfford ? `Buy ${item.cost}` : `Need ${item.cost}`;
      const buttonClass = owned ? "ghost" : canAfford ? "primary" : "ghost";
      return `
        <article class="store-item ${owned ? "owned" : ""}">
          <div class="store-item-copy">
            <p class="store-item-name">${item.title}</p>
            <p class="store-item-blurb">${item.blurb}</p>
            <span class="store-item-effect">${item.effect}</span>
          </div>
          <button class="${buttonClass}" data-store-buy="${item.id}" ${owned ? "disabled" : ""}>${buttonLabel}</button>
        </article>
      `;
    })
    .join("");

  storeGridEl.querySelectorAll("[data-store-buy]").forEach((button) => {
    button.addEventListener("click", () => buyStoreItem(button.dataset.storeBuy));
  });
}

function goNext() {
  state.levelIndex = (state.levelIndex + 1) % worlds.length;
  saveState();
  setupWorld(state.levelIndex);
}

function resetJourney() {
  state = { ...defaultState };
  saveState();
  setupWorld(0);
  messageEl.textContent = "Muffin warped back to the first world.";
  renderStoryPanel();
}

function isMobileLayout() {
  return mobileLayoutQuery.matches || touchLayoutQuery.matches;
}

function syncMobileChrome() {
  const mobile = isMobileLayout();
  document.body.classList.toggle("mobile-play", mobile && document.body.dataset.focusPlay === "true");
  if (guideModeLabelEl) {
    guideModeLabelEl.textContent = mobile ? "Touch Controls" : "Touch + Keys";
  }
  if (dragTipEl) {
    dragTipEl.textContent = mobile
      ? "Drag the left side of the maze to look around"
      : "Click or drag the scene to steer Muffin's view";
  }
}

function resizeCanvas() {
  if (!viewCanvas) return;
  const rect = viewCanvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, isMobileLayout() ? 1.5 : 2);
  const cssWidth = Math.max(280, Math.floor(rect.width));
  const cssHeight = Math.max(220, Math.floor(rect.height || cssWidth * 0.8));
  const width = Math.floor(cssWidth * ratio);
  const height = Math.floor(cssHeight * ratio);
  if (viewCanvas.width !== width || viewCanvas.height !== height) {
    viewCanvas.width = width;
    viewCanvas.height = height;
  }
}

function gameLoop(previousTime) {
  const now = performance.now();
  const dt = Math.min(0.033, (now - previousTime) / 1000);
  resizeCanvas();
  if (!pointerLook.active) {
    viewBob *= 0.92;
  }

  if (gamePaused) {
    animationId = requestAnimationFrame(() => gameLoop(now));
    return;
  }

  const nearestStar = stars.find(
    (star) => !star.collected && Math.hypot(star.x - player.x, star.y - player.y) < 2.4
  );
  window.DreamAudio?.tickNearStar?.(Boolean(nearestStar));

  updatePlayer(dt);
  collectStars();
  collectSparks();
  collectMoonKeys();
  openSecretDoors();
  openTreasureChests();
  collectRelics();
  collectDreamGems();
  collectSupplySatchels();
  handlePads();
  handlePuddles();
  tryExit();
  drawBackground();
  drawWalls();
  drawSprites();
  drawHintBeam();
  drawMinimap();
  updateHud();
  timerLabelEl.textContent = formatTime(worldTime());
  animationId = requestAnimationFrame(() => gameLoop(now));
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "w" || key === "arrowup") keys.forward = true;
  if (key === "s" || key === "arrowdown") keys.backward = true;
  if (key === "a" || key === "arrowleft") keys.left = true;
  if (key === "d" || key === "arrowright") keys.right = true;
  if (key === "q") keys.strafeLeft = true;
  if (key === "e") keys.strafeRight = true;
  if (key === "shift") keys.sprint = true;
  if (key === "h") triggerHint();
  if (key === "r") resetJourney();
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "w" || key === "arrowup") keys.forward = false;
  if (key === "s" || key === "arrowdown") keys.backward = false;
  if (key === "a" || key === "arrowleft") keys.left = false;
  if (key === "d" || key === "arrowright") keys.right = false;
  if (key === "q") keys.strafeLeft = false;
  if (key === "e") keys.strafeRight = false;
  if (key === "shift") keys.sprint = false;
});

function setControlState(control, active) {
  if (control === "forward") keys.forward = active;
  if (control === "backward") keys.backward = active;
  if (control === "left") keys.left = active;
  if (control === "right") keys.right = active;
  if (control === "strafe-left") keys.strafeLeft = active;
  if (control === "strafe-right") keys.strafeRight = active;
  if (control === "sprint") keys.sprint = active;
}

document.querySelectorAll("[data-control]").forEach((button) => {
  const control = button.dataset.control;
  const start = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setControlState(control, true);
  };
  const stop = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setControlState(control, false);
  };
  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", stop);
  button.addEventListener("pointerleave", stop);
  button.addEventListener("pointercancel", stop);
  button.addEventListener("touchstart", start, { passive: false });
  button.addEventListener("touchend", stop, { passive: false });
  button.addEventListener("touchcancel", stop, { passive: false });
});

function bindLookSurface(surface) {
  if (!surface) return;
  surface.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-control]")) return;
    pointerLook.active = true;
    pointerLook.x = event.clientX;
    pointerLook.y = event.clientY;
    surface.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  surface.addEventListener("pointermove", (event) => {
    if (!pointerLook.active) return;
    const deltaX = event.clientX - pointerLook.x;
    const deltaY = event.clientY - pointerLook.y;
    pointerLook.x = event.clientX;
    pointerLook.y = event.clientY;
    const lookScale = window.GamePlus?.getLookMultiplier?.() || 1;
    const sensitivity = (isMobileLayout() ? 0.0072 : 0.0055) * lookScale;
    player.angle += deltaX * sensitivity;
    if (isMobileLayout()) {
      viewBob = Math.max(-0.35, Math.min(0.35, viewBob - deltaY * 0.0018));
    }
    event.preventDefault();
  });

  const releaseLook = (event) => {
    pointerLook.active = false;
    if (event?.pointerId !== undefined) {
      surface.releasePointerCapture?.(event.pointerId);
    }
  };

  surface.addEventListener("pointerup", releaseLook);
  surface.addEventListener("pointerleave", releaseLook);
  surface.addEventListener("pointercancel", releaseLook);
}

bindLookSurface(lookZoneEl);
bindLookSurface(viewCanvas);
if (!isMobileLayout()) {
  bindLookSurface(viewportShellEl);
}

function jumpToGame() {
  if (window.GamePlus?.enterPlayFocus) {
    window.GamePlus.enterPlayFocus();
    window.GamePlus.showTutorial?.();
    return;
  }
  document.body.dataset.focusPlay = "true";
  syncMobileChrome();
  worldStageEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleDreamConsole() {
  if (!dreamConsoleEl || !toggleConsoleBtnEl) return;
  const expanded = dreamConsoleEl.classList.toggle("console-expanded");
  dreamConsoleEl.classList.toggle("console-collapsed", !expanded);
  toggleConsoleBtnEl.textContent = expanded ? "Hide Console" : "Console";
  toggleConsoleBtnEl.setAttribute("aria-expanded", String(expanded));
  if (expanded) {
    dreamConsoleEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

jumpToGameBtnEl?.addEventListener("click", jumpToGame);
toggleConsoleBtnEl?.addEventListener("click", toggleDreamConsole);
mobileHintBtnEl?.addEventListener("click", triggerHint);
function handleLayoutModeChange() {
  syncMobileChrome();
  resizeCanvas();
}

mobileLayoutQuery.addEventListener("change", handleLayoutModeChange);
touchLayoutQuery.addEventListener("change", handleLayoutModeChange);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", () => {
  window.setTimeout(resizeCanvas, 120);
});
syncMobileChrome();
viewportShellEl?.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("visibilitychange", () => {
  gamePaused = document.hidden;
});

window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
  reducedMotion = event.matches;
});

window.__muffinGame = {
  get state() {
    return state;
  },
  get currentWorld() {
    return currentWorld;
  },
  setupWorld,
  saveState,
  pushToast,
  formatTime,
  playToneFallback,
  startMusic: startAtmosphere,
  stopMusic: stopAtmosphere,
};

function bindClick(node, handler) {
  if (node) node.addEventListener("click", handler);
}

bindClick(musicBtnEl, toggleAtmosphere);
bindClick(openStoryBtnEl, () => openStoryModal(chapterIndexForLevel(), "journal"));
bindClick(openStoryPanelBtnEl, () => openStoryModal(chapterIndexForLevel(), "journal"));
bindClick(openStoreBtnEl, openStore);
bindClick(openStorePanelBtnEl, openStore);
bindClick(closeStoreBtnEl, closeStore);
bindClick(closeStoryBtnEl, closeStoryModal);
bindClick(storyModalContinueBtnEl, closeStoryModal);
bindClick(document.getElementById("hintBtn"), triggerHint);
bindClick(document.getElementById("resetBtn"), resetJourney);
bindClick(document.getElementById("continueBtn"), goNext);

storeModalEl?.addEventListener("click", (event) => {
  if (event.target === storeModalEl) closeStore();
});

storyModalEl?.addEventListener("click", (event) => {
  if (event.target === storyModalEl) closeStoryModal();
});

function bootMuffinGame() {
  setupWorld(state.levelIndex);
  if (isPlayPage) {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame((time) => gameLoop(time));
    return;
  }
  updateHud();
  renderStoryPanel();
  if (minimapCtx) drawMinimap();
  if (document.body.dataset.page === "store") {
    openStore();
  }
  if (document.body.dataset.page === "worlds" && window.GamePlus?.renderWorldGrid) {
    window.GamePlus.renderWorldGrid();
  }
}

bootMuffinGame();
