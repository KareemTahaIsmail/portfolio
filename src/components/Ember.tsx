import { useEffect, useRef, useState } from "react";
import Track from "../assets/audio/ember-track.mp3";
import { prefersReducedMotion } from "../sprites";
import "./styles/Ember.css";

// The fire is a grid of heat values, one cell per on-screen "pixel", sized to fill the stage.
// The flame behaviour below was tuned on a 32-row grid; taller grids scale it to match.
const CELL = 6; // CSS px per fire pixel
const TUNED_ROWS = 32;
const FPS = 30;

// Colours from the pixel-art fire, coolest to hottest. Heat 0 is empty (transparent).
const PALETTE: [number, number, number][] = [
  [90, 0, 2],
  [168, 0, 3],
  [206, 84, 27],
  [255, 99, 27],
  [255, 173, 31],
  [255, 226, 40],
  [255, 254, 170],
];
const MAX_HEAT = PALETTE.length * 6;

interface Bands {
  bass: number;
  mid: number;
  high: number;
}

interface Spark {
  x: number;
  y: number;
  life: number;
}

interface Fire {
  w: number;
  h: number;
  heat: Uint8Array;
  sparks: Spark[];
  image: ImageData;
}

/**
 * One frame of the classic Doom-style fire: heat rises a row, cools a little and drifts sideways.
 * Bass sets how hot the base burns and how slowly it cools (flame height), mids push it like wind,
 * and highs throw sparks.
 */
function stepFire({ w, h, heat, sparks }: Fire, { bass, mid, high }: Bands, t: number) {
  // The base row: hotter with more bass, with a little flicker. It's hottest in the middle and
  // cooler toward the edges, so the fire burns in a mound like a campfire rather than a wall.
  const base = MAX_HEAT * (0.5 + 0.5 * bass);
  for (let x = 0; x < w; x++) {
    const edge = Math.abs(x - (w - 1) / 2) / (w / 2);
    const shaped = base * (1 - 0.7 * edge * edge);
    heat[(h - 1) * w + x] = Math.max(0, Math.round(shaped - Math.random() * 4));
  }

  // Average cooling per row: quiet = short flames, loud hits lick the top
  const cooling = (3.4 - 2.4 * bass) * (TUNED_ROWS / h);
  const wind = Math.sin(t / 900) * mid * 1.6;

  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w; x++) {
      const below = heat[(y + 1) * w + x];
      const drift = Math.round(Math.random() * 2 - 1 + wind);
      const dst = Math.min(w - 1, Math.max(0, x + drift));
      heat[y * w + dst] = Math.max(0, below - Math.round(Math.random() * 2 * cooling));
    }
  }

  // Sparks: spawned by the highs (more on wider fires), they float up and burn out
  const lifeScale = h / TUNED_ROWS;
  for (let n = 0; n < Math.ceil(w / 80); n++) {
    if (Math.random() < high * 1.4) {
      sparks.push({
        x: (Math.random() * w) | 0,
        y: h - 6 - ((Math.random() * 8 * lifeScale) | 0),
        life: ((10 + Math.random() * 14) * lifeScale) | 0,
      });
    }
  }
  for (const s of sparks) {
    s.y -= 1;
    s.x += Math.round(Math.random() * 2 - 1 + wind * 0.5);
    s.life -= 1;
  }
  for (let i = sparks.length - 1; i >= 0; i--) {
    if (sparks[i].life <= 0 || sparks[i].y < 0) sparks.splice(i, 1);
  }
}

function drawFire(ctx: CanvasRenderingContext2D, { w, h, heat, sparks, image }: Fire) {
  const data = image.data;
  for (let i = 0; i < w * h; i++) {
    const value = heat[i];
    const o = i * 4;
    if (value === 0) {
      data[o + 3] = 0;
      continue;
    }
    const [r, g, b] = PALETTE[Math.min(PALETTE.length - 1, ((value * PALETTE.length) / (MAX_HEAT + 1)) | 0)];
    data[o] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = 255;
  }
  for (const s of sparks) {
    if (s.x < 0 || s.x >= w) continue;
    const o = (s.y * w + s.x) * 4;
    const [r, g, b] = PALETTE[s.life > 8 ? PALETTE.length - 1 : PALETTE.length - 3];
    data[o] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
}

/**
 * Splits the analyser's spectrum into bass / mid / high. Each band mostly follows its *punch* (how far it
 * jumps above its own recent average) rather than its raw level, so a sustained bass line keeps a steady
 * burn while every kick still makes the flames surge.
 */
function makeBandReader(analyser: AnalyserNode) {
  const bins = new Uint8Array(analyser.frequencyBinCount);
  const hz = analyser.context.sampleRate / analyser.fftSize;
  const range = (lo: number, hi: number) => [Math.max(1, Math.round(lo / hz)), Math.round(hi / hz)];
  const ranges = { bass: range(30, 220), mid: range(220, 2000), high: range(2000, 9000) };
  const peak = { bass: 0.2, mid: 0.2, high: 0.2 };
  const average = { bass: 0, mid: 0, high: 0 };
  const punchPeak = { bass: 0.02, mid: 0.02, high: 0.02 };
  const level = { bass: 0, mid: 0, high: 0 };

  return (): Bands => {
    analyser.getByteFrequencyData(bins);
    for (const band of ["bass", "mid", "high"] as const) {
      const [lo, hi] = ranges[band];
      let sum = 0;
      for (let i = lo; i <= hi; i++) sum += bins[i];
      const raw = sum / ((hi - lo + 1) * 255);

      // How loud, against a slowly falling peak
      peak[band] = Math.max(raw, peak[band] * 0.996, 0.05);
      const sustain = raw / peak[band];

      // How sudden: the jump above the recent average, against its own falling peak
      average[band] = average[band] * 0.94 + raw * 0.06;
      const punch = Math.max(0, raw - average[band]);
      punchPeak[band] = Math.max(punch, punchPeak[band] * 0.995, 0.01);

      const v = Math.min(1, 0.4 * sustain + 1.15 * (punch / punchPeak[band]));
      // Fast attack, quick release, so hits punch and the fire drops back between them
      level[band] = v > level[band] ? v : level[band] * 0.72 + v * 0.28;
    }
    return { ...level };
  };
}

/** A pixel fire that dances to one of my tracks: press play and the bass stokes the flames. */
const Ember = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const readBands = useRef<(() => Bands) | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);

  // The fire loop: sized to the stage, runs only while it's on screen
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let fire: Fire | null = null;
    const build = () => {
      const w = Math.max(20, Math.round(canvas.clientWidth / CELL));
      const h = Math.max(16, Math.round(canvas.clientHeight / CELL));
      if (fire && fire.w === w && fire.h === h) return;
      canvas.width = w;
      canvas.height = h;
      fire = { w, h, heat: new Uint8Array(w * h), sparks: [], image: ctx.createImageData(w, h) };
    };
    build();
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);

    const idle = (t: number): Bands => ({ bass: 0.18 + 0.08 * Math.sin(t / 700), mid: 0.3, high: 0.04 });
    const bands = (t: number) => (readBands.current && !audioRef.current?.paused ? readBands.current() : idle(t));

    if (prefersReducedMotion()) {
      // No animation: let the fire build up once and show it still
      const f = fire as Fire | null;
      if (f) {
        for (let i = 0; i < 80; i++) stepFire(f, idle(0), 0);
        f.sparks.length = 0;
        drawFire(ctx, f);
      }
      return () => resizeObserver.disconnect();
    }

    let raf = 0;
    let last = 0;
    let onScreen = false;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || !fire || t - last < 1000 / FPS) return;
      last = t;
      stepFire(fire, bands(t), t);
      drawFire(ctx, fire);
    };
    raf = requestAnimationFrame(frame);

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => () => void audioCtx.current?.close(), []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    // Browsers only allow audio after a click, so the analyser is wired up on the first press
    if (!audioCtx.current) {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.55;
      ctx.createMediaElementSource(audio).connect(analyser);
      analyser.connect(ctx.destination);
      audioCtx.current = ctx;
      readBands.current = makeBandReader(analyser);
    }
    await audioCtx.current.resume();
    await audio.play();
  };

  return (
    <div
      className={playing ? "ember playing" : "ember"}
      // While the track plays, pressing anywhere on the stage pauses it (the button keeps its own job)
      onPointerDown={(e) => {
        if (playing && !(e.target as Element).closest("button")) audioRef.current?.pause();
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A pixel-art fire that reacts to music"
      />
      <button
        type="button"
        className={playing ? "stageButton small emberToggle" : "stageButton emberToggle"}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause the music" : "Play the music"}
      >
        {playing ? "❚❚ Douse it" : "▶ Fire it up"}
      </button>
      {playing && (
        <p className="nowPlaying">♪ This track's a beat I threw together in 10 minutes. My actual game music is way better, promise.</p>
      )}
      <audio
        ref={audioRef}
        src={Track}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
};

export default Ember;
