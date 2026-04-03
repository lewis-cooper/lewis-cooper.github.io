const demoLines = document.getElementById("demo-lines");
const demoStatus = document.getElementById("demo-status");
const demoCommand = document.getElementById("demo-command");
const demoWindow = document.getElementById("demo-window");
const demoThemeToggle = document.getElementById("demo-theme-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentDemoTheme = "dark";

const demoStates = [
  {
    title: "Launch Week",
    command: "open launch-week",
    status: "Opened todo list 'Launch Week'.",
    items: ["1. Publish website", "2. Upload latest DMG", "3. Write first-launch steps"],
    highlight: null,
  },
  {
    title: "Launch Week",
    command: "add Check widget install",
    status: "Added: Check widget install.",
    items: ["1. Publish website", "2. Upload latest DMG", "3. Write first-launch steps", "4. Check widget install"],
    highlight: null,
  },
  {
    title: "Launch Week",
    command: "move 4 2",
    status: "Moved item 4 to position 2.",
    items: ["1. Publish website", "2. Check widget install", "3. Upload latest DMG", "4. Write first-launch steps"],
    highlight: null,
  },
  {
    title: "Launch Week",
    command: "hl 2",
    status: "Highlighted item 2.",
    items: ["1. Publish website", "2. Check widget install", "3. Upload latest DMG", "4. Write first-launch steps"],
    highlight: 2,
  },
];

function dividerFor(title) {
  return "=".repeat(Math.max(16, title.length));
}

function renderDemoList(state) {
  if (!demoLines) {
    return;
  }

  const lines = [
    { text: state.title, kind: "is-title" },
    { text: dividerFor(state.title), kind: "is-divider" },
    ...state.items.map((item, index) => ({
      text: item,
      kind: state.highlight === index + 1 ? "is-highlighted" : "",
    })),
  ];

  demoLines.innerHTML = lines
    .map((line) => `<li class="todo-line ${line.kind}">${line.text}</li>`)
    .join("");
}

function setDemoState(state) {
  renderDemoList(state);

  if (demoStatus) {
    demoStatus.textContent = state.status;
  }
}

function applyDemoTheme(theme) {
  currentDemoTheme = theme === "light" ? "light" : "dark";

  if (demoWindow) {
    demoWindow.dataset.theme = currentDemoTheme;
  }

  if (demoThemeToggle) {
    const isLightTheme = currentDemoTheme === "light";
    demoThemeToggle.textContent = isLightTheme ? "Light theme" : "Dark theme";
    demoThemeToggle.setAttribute("aria-pressed", String(isLightTheme));
  }
}

function typeCommand(command, onComplete) {
  if (!demoCommand) {
    onComplete();
    return;
  }

  let index = 0;
  demoCommand.textContent = "";

  const tick = () => {
    index += 1;
    demoCommand.textContent = command.slice(0, index);

    if (index < command.length) {
      window.setTimeout(tick, 45);
      return;
    }

    window.setTimeout(onComplete, 240);
  };

  window.setTimeout(tick, 120);
}

function startDemoLoop() {
  if (!demoLines || !demoStatus || !demoCommand || demoStates.length === 0) {
    return;
  }

  applyDemoTheme(currentDemoTheme);

  if (prefersReducedMotion) {
    const finalState = demoStates[demoStates.length - 1];
    setDemoState(finalState);
    demoCommand.textContent = finalState.command;
    return;
  }

  let stateIndex = 0;

  const playState = () => {
    const state = demoStates[stateIndex];

    typeCommand(state.command, () => {
      setDemoState(state);

      window.setTimeout(() => {
        stateIndex = (stateIndex + 1) % demoStates.length;
        playState();
      }, 1700);
    });
  };

  setDemoState(demoStates[0]);
  demoCommand.textContent = "";
  window.setTimeout(playState, 500);
}

if (demoThemeToggle) {
  demoThemeToggle.addEventListener("click", () => {
    applyDemoTheme(currentDemoTheme === "dark" ? "light" : "dark");
  });
}

startDemoLoop();
