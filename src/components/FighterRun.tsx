import { useCallback, useEffect, useRef, useState } from "react";
import { AnimName, FRAME, GROUND_ROW, animMs, anims, prefersReducedMotion } from "../sprites";
import "./styles/FighterRun.css";

type Mode = "ready" | "playing" | "paused" | "over";

// Stage layout (CSS px)
// Ground line above the bottom of the stage; touch screens leave room under it for the Jump/Roll buttons
const GROUND_PAD = 30;
const TOUCH_GROUND_PAD = 60;
const FIGHTER_X = 40; // left edge of his 128px frame

// His body inside the frame, for collisions (x from the frame's left; heights up from his feet)
const BODY_LEFT = 46;
const BODY_RIGHT = 84;
const STAND_HEIGHT = 100;
const ROLL_HEIGHT = 44;

// Moves
const JUMP_MS = animMs("jump");
const JUMP_HEIGHT = 92;
const ROLL_MS = animMs("roll");

// Pace (px per second)
const IDLE_SPEED = 110; // running in place before the game starts
const START_SPEED = 320;
const MAX_SPEED = 700;
const ACCELERATION = 8; // per second of play

// Obstacles: blocks sit on the ground (jump them), beams hang from above (roll under them)
const BLOCK_WIDTH = 30;
const BLOCK_HEIGHT = 34;
const BEAM_WIDTH = 92;
const BEAM_BOTTOM = 58;
const BEAM_THICKNESS = 22;

const BEST_KEY = "fighterRunBest";

interface Obstacle {
  kind: "block" | "beam";
  x: number;
}

interface Game {
  mode: Mode;
  speed: number;
  distance: number;
  obstacles: Obstacle[];
  nextObstacleIn: number;
  jumpStart: number | null; // game-clock ms
  rollStart: number | null;
  rollHeld: boolean;
  hitAt: number | null;
  clock: number; // ms of game time (stops while paused)
  best: number;
}

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveBest = (score: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // Storage unavailable (private mode): the best score just isn't remembered
  }
};

const newGame = (mode: Mode, best: number): Game => ({
  mode,
  speed: mode === "ready" ? IDLE_SPEED : START_SPEED,
  distance: 0,
  obstacles: [],
  nextObstacleIn: 420,
  jumpStart: null,
  rollStart: null,
  rollHeld: false,
  hitAt: null,
  clock: 0,
  best,
});

const score = (g: Game) => Math.floor(g.distance / 40);

/** Which frame of an animation is showing `elapsed` ms after it started. */
function frameAt(anim: AnimName, elapsed: number, loop: boolean) {
  const { durations } = anims[anim];
  const total = animMs(anim);
  let t = loop ? elapsed % total : Math.min(elapsed, total - 1);
  for (let i = 0; i < durations.length; i++) {
    if (t < durations[i]) return i;
    t -= durations[i];
  }
  return durations.length - 1;
}

/** Height of his feet above the ground mid-jump: a simple arc. */
const jumpLift = (g: Game) => {
  if (g.jumpStart === null) return 0;
  const p = (g.clock - g.jumpStart) / JUMP_MS;
  return p >= 1 ? 0 : 4 * JUMP_HEIGHT * p * (1 - p);
};

/** The fighter's current animation and how long it has been playing. */
function pose(g: Game): { anim: AnimName; elapsed: number; loop: boolean } {
  if (g.hitAt !== null) return { anim: "knockdown", elapsed: g.clock - g.hitAt, loop: false };
  if (g.jumpStart !== null) return { anim: "jump", elapsed: g.clock - g.jumpStart, loop: false };
  if (g.rollStart !== null) return { anim: "roll", elapsed: g.clock - g.rollStart, loop: true };
  return { anim: "run", elapsed: g.clock, loop: true };
}

function collides(g: Game) {
  const left = FIGHTER_X + BODY_LEFT;
  const right = FIGHTER_X + BODY_RIGHT;
  const bottom = jumpLift(g);
  const top = bottom + (g.rollStart !== null ? ROLL_HEIGHT : STAND_HEIGHT);
  return g.obstacles.some((o) => {
    const width = o.kind === "block" ? BLOCK_WIDTH : BEAM_WIDTH;
    if (o.x > right || o.x + width < left) return false;
    // Blocks fill the ground up to their height; beams fill everything from their underside up
    return o.kind === "block" ? bottom < BLOCK_HEIGHT : top > BEAM_BOTTOM;
  });
}

function update(g: Game, dt: number) {
  g.clock += dt;
  if (g.mode === "over") return;

  const step = (g.speed * dt) / 1000;
  g.distance += step;

  // Moves end on their own; a held roll keeps rolling
  if (g.jumpStart !== null && g.clock - g.jumpStart >= JUMP_MS) g.jumpStart = null;
  if (g.rollStart !== null && g.clock - g.rollStart >= ROLL_MS) {
    g.rollStart = g.rollHeld ? g.clock : null;
  }

  if (g.mode !== "playing") return;

  g.speed = Math.min(MAX_SPEED, g.speed + (ACCELERATION * dt) / 1000);
  for (const o of g.obstacles) o.x -= step;
  g.obstacles = g.obstacles.filter((o) => o.x > -BEAM_WIDTH);

  g.nextObstacleIn -= step;
  if (g.nextObstacleIn <= 0) {
    const kind = g.obstacles.length === 0 && g.distance < 800 ? "block" : Math.random() < 0.5 ? "block" : "beam";
    g.obstacles.push({ kind, x: 2000 });
    // Gaps scale with speed so there's always time to react
    g.nextObstacleIn = g.speed * (0.75 + Math.random() * 0.9) + 220;
  }

  if (collides(g)) {
    g.mode = "over";
    g.hitAt = g.clock;
    g.jumpStart = null;
    g.rollStart = null;
    if (score(g) > g.best) {
      g.best = score(g);
      saveBest(g.best);
    }
  }
}

// Pixel-art palette, drawn from the site's greys plus the demons' colours as accents
const STONE = "#3f3f46";
const STONE_LIGHT = "#71717a";
const STONE_DARK = "#27272a";
const SHUF_ORANGE = "#cf6300";
const YERC_RED = "#ac3232";
const RIM = "rgba(228, 228, 231, 0.32)";

function draw(
  ctx: CanvasRenderingContext2D,
  g: Game,
  sprites: Record<string, HTMLImageElement>,
  w: number,
  h: number,
  groundPad: number
) {
  const ground = h - groundPad;
  ctx.clearRect(0, 0, w, h);

  // Ground: a dashed pixel line that scrolls with his speed
  const offset = Math.floor(g.distance) % 12;
  ctx.fillStyle = STONE_LIGHT;
  for (let x = -offset; x < w; x += 12) ctx.fillRect(x, ground, 6, 2);
  // A few loose pebbles below the line, for a sense of speed
  ctx.fillStyle = STONE;
  for (let x = -(Math.floor(g.distance * 0.6) % 90); x < w; x += 90) ctx.fillRect(x + 20, ground + 10, 4, 2);

  for (const o of g.obstacles) {
    const x = Math.round(o.x);
    if (o.kind === "block") {
      const top = ground - BLOCK_HEIGHT;
      ctx.fillStyle = STONE;
      ctx.fillRect(x, top, BLOCK_WIDTH, BLOCK_HEIGHT);
      ctx.fillStyle = STONE_DARK;
      ctx.fillRect(x + 4, top + 6, BLOCK_WIDTH - 8, BLOCK_HEIGHT - 10);
      ctx.fillStyle = SHUF_ORANGE;
      ctx.fillRect(x, top, BLOCK_WIDTH, 3);
    } else {
      const underside = ground - BEAM_BOTTOM;
      const top = underside - BEAM_THICKNESS;
      // Posts holding the beam up from off-stage
      ctx.fillStyle = STONE_DARK;
      ctx.fillRect(x + 10, 0, 4, top);
      ctx.fillRect(x + BEAM_WIDTH - 14, 0, 4, top);
      ctx.fillStyle = STONE;
      ctx.fillRect(x, top, BEAM_WIDTH, BEAM_THICKNESS);
      ctx.fillStyle = STONE_LIGHT;
      ctx.fillRect(x, top, BEAM_WIDTH, 2);
      ctx.fillStyle = YERC_RED;
      ctx.fillRect(x, underside - 3, BEAM_WIDTH, 3);
    }
  }

  // The fighter, with a 1px light rim so his dark suit reads against the stage
  const { anim, elapsed, loop } = pose(g);
  const sheet = sprites[anim];
  if (sheet?.complete) {
    const frame = frameAt(anim, elapsed, loop);
    const y = Math.round(ground - GROUND_ROW - jumpLift(g));
    ctx.filter = `drop-shadow(1px 0 0 ${RIM}) drop-shadow(-1px 0 0 ${RIM}) drop-shadow(0 1px 0 ${RIM}) drop-shadow(0 -1px 0 ${RIM})`;
    ctx.drawImage(sheet, frame * FRAME, 0, FRAME, FRAME, FIGHTER_X, y, FRAME, FRAME);
    ctx.filter = "none";
  }

  // Score
  if (g.mode !== "ready") {
    const pad = (n: number) => String(n).padStart(5, "0");
    ctx.font = '14px "silkscreen", monospace';
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#e4e4e7";
    ctx.fillText(`HI ${pad(Math.max(g.best, score(g)))}   ${pad(score(g))}`, w - 16, 14);
  }
}

/** An endless runner: he runs, blocks and beams come at him, you jump and roll. Opt-in and pausable. */
const FighterRun = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(newGame("ready", readBest()));
  const [mode, setMode] = useState<Mode>("ready");

  const setGameMode = useCallback((m: Mode) => {
    game.current.mode = m;
    setMode(m);
  }, []);

  const start = useCallback(() => {
    game.current = newGame("playing", game.current.best);
    setMode("playing");
    stageRef.current?.focus({ preventScroll: true });
  }, []);

  const jump = useCallback(() => {
    const g = game.current;
    if (g.mode !== "playing" || g.jumpStart !== null) return;
    g.rollStart = null;
    g.jumpStart = g.clock;
  }, []);

  const roll = useCallback((held: boolean) => {
    const g = game.current;
    g.rollHeld = held;
    if (!held || g.mode !== "playing" || g.jumpStart !== null || g.rollStart !== null) return;
    g.rollStart = g.clock;
  }, []);

  const togglePause = useCallback(() => {
    const m = game.current.mode;
    if (m === "playing") setGameMode("paused");
    else if (m === "paused") setGameMode("playing");
  }, [setGameMode]);

  // Load sprite sheets
  const sprites = useRef<Record<string, HTMLImageElement>>({});
  useEffect(() => {
    for (const name of ["run", "jump", "roll", "knockdown"] as const) {
      const img = new Image();
      img.src = anims[name].sheet;
      sprites.current[name] = img;
    }
  }, []);

  // Game loop: sized to the stage, runs only while it's on screen
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !stage || !ctx) return;

    let w = 0;
    let h = 0;
    let groundPad = GROUND_PAD;
    const resize = () => {
      groundPad = window.matchMedia("(pointer: coarse)").matches ? TOUCH_GROUND_PAD : GROUND_PAD;
      const dpr = window.devicePixelRatio || 1;
      w = stage.clientWidth;
      h = stage.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    const still = prefersReducedMotion();
    let onScreen = false;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last); // clamp so a hiccup can't teleport obstacles
      last = now;
      const g = game.current;
      if (!onScreen) return;
      // With reduced motion, nothing moves until the visitor chooses to play
      const wasOver = g.mode === "over";
      if (g.mode !== "paused" && !(still && g.mode === "ready")) update(g, dt);
      // A collision happens inside the loop; tell React once so the Retry screen shows
      if (!wasOver && g.mode === "over") setMode("over");
      draw(ctx, g, sprites.current, w, h, groundPad);
    };
    raf = requestAnimationFrame(frame);

    // Leaving the stage pauses the game
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (!onScreen && game.current.mode === "playing") setGameMode("paused");
    });
    visibility.observe(stage);
    const pauseIfPlaying = () => {
      if (game.current.mode === "playing") setGameMode("paused");
    };
    const onVisibility = () => document.hidden && pauseIfPlaying();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pauseIfPlaying);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", pauseIfPlaying);
    };
  }, [setGameMode]);

  // Keyboard: only captured while a game is on, so the page scrolls normally otherwise
  useEffect(() => {
    if (mode !== "playing" && mode !== "paused") return;
    const down = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "p" || k === "P" || k === "Escape") {
        togglePause();
      } else if (mode === "playing" && (k === "ArrowUp" || k === " " || k === "w" || k === "W")) {
        jump();
      } else if (mode === "playing" && (k === "ArrowDown" || k === "s" || k === "S" || k === "Shift")) {
        roll(true);
      } else {
        return;
      }
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S" || e.key === "Shift") roll(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [mode, jump, roll, togglePause]);

  return (
    <div
      className="fighterRun"
      ref={stageRef}
      tabIndex={-1}
      // Clicking or tapping anywhere on the stage pauses; its own buttons (pause, Jump, Roll) keep their jobs
      onPointerDown={(e) => {
        if (mode === "playing" && !(e.target as Element).closest("button")) togglePause();
      }}
    >
      <canvas ref={canvasRef} role="img" aria-label="Fighter Run, a pixel-art endless runner" />

      {mode === "ready" && (
        <div className="runOverlay">
          <button type="button" className="stageButton" onClick={start}>
            ▶ Parkour!
          </button>
          <p className="runHint">
            <span className="keys">↑ / space to jump · ↓ / shift to roll · P to pause</span>
            <span className="touch">Jump the blocks, roll under the beams</span>
          </p>
        </div>
      )}

      {mode === "paused" && (
        <div className="runOverlay">
          <button type="button" className="stageButton" onClick={togglePause}>
            ▶ Continue
          </button>
        </div>
      )}

      {mode === "over" && (
        <div className="runOverlay">
          <p className="runTitle">Wipeout!</p>
          <button type="button" className="stageButton" onClick={start}>
            ↻ Run it back
          </button>
        </div>
      )}

      {mode === "playing" && (
        <>
          <button type="button" className="stageButton small runPause" onClick={togglePause} aria-label="Pause">
            ❚❚
          </button>
          <p className="runControls">
            <span className="keys">↑ / space jump · ↓ / shift roll · click or P to pause</span>
            <span className="touch">Tap Jump or Roll · tap the stage to pause</span>
          </p>
          {/* Touch controls */}
          <div className="runPad">
            <button type="button" className="stageButton" onPointerDown={jump} aria-label="Jump">
              ↑ Jump
            </button>
            <button
              type="button"
              className="stageButton"
              onPointerDown={() => roll(true)}
              onPointerUp={() => roll(false)}
              onPointerLeave={() => roll(false)}
              onPointerCancel={() => roll(false)}
              aria-label="Roll"
            >
              ↓ Roll
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FighterRun;
