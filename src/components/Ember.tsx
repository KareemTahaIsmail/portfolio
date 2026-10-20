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

/** What the music is doing this frame, split by the part of the mix that drives each effect. */
interface Music {
  ambience: number; // 0-1, steady: the base flame that stays up
  kick: number; // 0-1, decaying hit: the whole fire surges
  snare: number; // 0-1, this frame's hit: a burst of sparks
  high: number; // 0-1: a trickle of sparks
  wind: number; // sideways drift
  notes: Note[]; // bass notes that started this frame
}

/** A bass note, placed across the fire by its pitch (0 = lowest, left; 1 = highest, right). */
interface Note {
  x: number;
  power: number;
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
  plumes: Note[]; // bass notes still burning, fading each frame
  flash: number; // this frame's kick, for a quick flash toward the hotter colours
  image: ImageData;
}

const mound = (across: number) => 1 - 0.7 * (Math.abs(across - 0.5) * 2) ** 2;

/**
 * One frame of the classic Doom-style fire: heat rises a row, cools a little and drifts sideways.
 * The ambience keeps a steady base burning, kicks make the whole fire surge, each bass note lights a
 * plume where its pitch sits along the fire, and snares and highs throw sparks.
 */
function stepFire(fire: Fire, music: Music) {
  const { w, h, heat, sparks, plumes } = fire;
  const { ambience, kick, snare, high, wind } = music;

  for (const note of music.notes) plumes.push({ ...note });
  for (const p of plumes) p.power *= 0.78;
  fire.plumes = plumes.filter((p) => p.power > 0.05);

  // The base row: a steady burn from the ambience plus the kick's surge, hottest in the middle like a
  // campfire, with each bass-note plume adding extra heat at its spot
  const base = MAX_HEAT * (0.38 + 0.3 * ambience + 0.35 * kick);
  const plumeAt = (across: number) => {
    let sum = 0;
    for (const p of fire.plumes) sum += p.power * Math.exp(-(((across - p.x) / 0.05) ** 2));
    return Math.min(1, sum);
  };
  for (let x = 0; x < w; x++) {
    const across = x / (w - 1);
    const value = base * mound(across) + MAX_HEAT * 0.9 * plumeAt(across);
    heat[(h - 1) * w + x] = Math.min(255, Math.max(0, Math.round(value - Math.random() * 4)));
  }

  // Flames only climb a row at a time, so hits also push heat straight into the fire: a kick swells the
  // lower part all at once, and each bass note shoots up a column where its pitch sits
  const reach = Math.floor(h * 0.5);
  for (let r = 1; r < reach; r++) {
    const fade = 1 - r / reach;
    const row = (h - 1 - r) * w;
    for (let x = 0; x < w; x++) {
      const across = x / (w - 1);
      const push = MAX_HEAT * (0.5 * kick * mound(across) + 0.55 * plumeAt(across)) * fade;
      if (push > 1) heat[row + x] = Math.min(255, Math.max(heat[row + x], Math.round(push)));
    }
  }
  fire.flash = kick;

  // Average cooling per row: the ambience alone gives a medium flame; kicks let it lick the top.
  // Heat climbs two rows a frame so the fire answers the music quickly.
  const cooling = (3.7 - 1.3 * ambience - 1.7 * kick) * (TUNED_ROWS / h);
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < h - 1; y++) {
      for (let x = 0; x < w; x++) {
        const below = heat[(y + 1) * w + x];
        const drift = Math.round(Math.random() * 2 - 1 + wind);
        const dst = Math.min(w - 1, Math.max(0, x + drift));
        heat[y * w + dst] = Math.max(0, below - Math.round(Math.random() * 2 * cooling));
      }
    }
  }

  // Sparks: a trickle from the highs, a burst on every snare. They float up and burn out.
  const lifeScale = h / TUNED_ROWS;
  const spawn = () =>
    sparks.push({
      x: (Math.random() * w) | 0,
      y: h - 6 - ((Math.random() * h * 0.45) | 0),
      life: ((10 + Math.random() * 14) * lifeScale) | 0,
    });
  for (let n = 0; n < Math.ceil(w / 80); n++) if (Math.random() < high) spawn();
  if (snare > 0.25) for (let n = Math.round((snare * w) / 8); n > 0; n--) spawn();

  for (const s of sparks) {
    s.y -= 1;
    s.x += Math.round(Math.random() * 2 - 1 + wind * 0.5);
    s.life -= 1;
  }
  for (let i = sparks.length - 1; i >= 0; i--) {
    if (sparks[i].life <= 0 || sparks[i].y < 0) sparks.splice(i, 1);
  }
}

function drawFire(ctx: CanvasRenderingContext2D, { w, h, heat, sparks, image, flash }: Fire) {
  const data = image.data;
  const boost = 1 + 0.35 * flash; // kicks flash the whole fire toward its hotter colours
  for (let i = 0; i < w * h; i++) {
    const value = heat[i];
    const o = i * 4;
    if (value === 0) {
      data[o + 3] = 0;
      continue;
    }
    const [r, g, b] = PALETTE[Math.min(PALETTE.length - 1, ((value * boost * PALETTE.length) / (MAX_HEAT + 1)) | 0)];
    data[o] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = 255;
  }
  for (const s of sparks) {
    if (s.x < 0 || s.x >= w || s.y < 0) continue;
    const o = (s.y * w + s.x) * 4;
    const [r, g, b] = PALETTE[s.life > 8 ? PALETTE.length - 1 : PALETTE.length - 3];
    data[o] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
}

// Each part of the mix gets its own filter, so it can be heard (and measured) on its own (Hz)
const BANDS = {
  kick: [30, 110],
  bass: [110, 320],
  ambience: [320, 1500],
  snare: [1500, 5000],
  high: [5000, 14000],
} as const;
type Band = keyof typeof BANDS;

// Bass-note pitch is read in this range (Hz). The notes the track actually plays are spread across the
// fire, lowest left to highest right, over at least an octave so neighbouring notes land apart.
const PITCH_LOW = 35;
const PITCH_HIGH = 260;
const MIN_SPREAD = 12; // semitones

/**
 * Wires the track into one filter + analyser per part of the mix, plus a fine analyser for bass pitch.
 * The analysers only listen (they feed a muted output so the browser keeps them running).
 */
function makeEars(ctx: AudioContext, input: AudioNode) {
  const mute = ctx.createGain();
  mute.gain.value = 0;
  mute.connect(ctx.destination);

  const ears = {} as Record<Band, AnalyserNode>;
  for (const band of Object.keys(BANDS) as Band[]) {
    const [lo, hi] = BANDS[band];
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = lo;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = hi;
    const ear = ctx.createAnalyser();
    ear.fftSize = 1024;
    input.connect(highpass).connect(lowpass).connect(ear).connect(mute);
    ears[band] = ear;
  }

  const fine = ctx.createAnalyser();
  fine.fftSize = 8192;
  fine.smoothingTimeConstant = 0.5;
  input.connect(fine).connect(mute);
  return { ears, fine };
}

/**
 * Listens to the track and reports what each part of the mix is doing. Each part is measured by its own
 * loudness (RMS) after its filter; a hit is a jump above that part's recent average, scaled against its
 * recent biggest jump, so quiet hits still register and nothing gets drowned out by the loudest moment.
 */
function makeListener({ ears, fine }: ReturnType<typeof makeEars>) {
  const samples = new Float32Array(1024);
  const fineBins = new Uint8Array(fine.frequencyBinCount);
  const fineHz = fine.context.sampleRate / fine.fftSize;

  const state = {} as Record<Band, { average: number; loudest: number; biggestJump: number }>;
  for (const band of Object.keys(BANDS) as Band[]) state[band] = { average: 0, loudest: 0.01, biggestJump: 0.005 };
  let kick = 0;
  let high = 0;
  let ambience = 0;
  let lastPitch = 0;
  let sinceNote = 99;
  let frame = 0;
  // The range of notes heard so far (in semitones above PITCH_LOW); it slowly relaxes so it can follow the song
  let lowest = Infinity;
  let highest = -Infinity;
  const place = (f: number) => {
    const note = 12 * Math.log2(f / PITCH_LOW);
    lowest = Math.min(note, lowest + 0.02);
    highest = Math.max(note, highest - 0.02);
    const mid = (lowest + highest) / 2;
    const spread = Math.max(MIN_SPREAD, highest - lowest);
    return 0.12 + 0.76 * Math.min(1, Math.max(0, (note - (mid - spread / 2)) / spread));
  };

  const measure = (band: Band) => {
    ears[band].getFloatTimeDomainData(samples);
    let sum = 0;
    for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
    const rms = Math.sqrt(sum / samples.length);
    const st = state[band];
    const jump = Math.max(0, rms - st.average);
    st.average = st.average * 0.8 + rms * 0.2;
    st.loudest = Math.max(rms, st.loudest * 0.995);
    st.biggestJump = Math.max(jump, st.biggestJump * 0.97, 0.002);
    const onset = Math.min(1, Math.max(0, (jump / st.biggestJump - 0.15) / 0.85));
    return { level: rms / st.loudest, onset };
  };

  const pitch = () => {
    fine.getByteFrequencyData(fineBins);
    let best = Math.round(PITCH_LOW / fineHz);
    for (let i = best; i <= Math.round(PITCH_HIGH / fineHz); i++) if (fineBins[i] > fineBins[best]) best = i;
    return best * fineHz;
  };

  return (): Music => {
    frame++;
    const amb = measure("ambience");
    const k = measure("kick");
    const hi = measure("high");
    const sn = measure("snare");
    const bass = measure("bass");
    // The first few frames jump up from silence; let the averages settle before reacting
    const warm = frame > 6;

    ambience = ambience * 0.9 + amb.level * 0.1;
    kick = Math.max(warm ? k.onset : 0, kick * 0.6);
    high = Math.max(warm ? hi.onset : 0, high * 0.7);

    // A bass note starts on a hit in the bass band, or when its pitch moves by a semitone or more
    const notes: Note[] = [];
    sinceNote++;
    if (warm && bass.level > 0.2 && sinceNote > 2) {
      const f = pitch();
      const moved = lastPitch > 0 && Math.abs(12 * Math.log2(f / lastPitch)) >= 1;
      if (bass.onset > 0.35 || (moved && sinceNote > 4)) {
        notes.push({ x: place(f), power: 0.35 + 0.45 * Math.max(bass.onset, 0.3) });
        lastPitch = f;
        sinceNote = 0;
      }
    }

    return {
      ambience,
      kick,
      snare: warm ? sn.onset : 0,
      high,
      wind: Math.sin(frame / 27) * 0.5 * ambience,
      notes,
    };
  };
}

/** A pixel fire that dances to one of my tracks: the drums, bass and ambience each drive a different part of it. */
const Ember = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playingRef = useRef(false);
  const listen = useRef<(() => Music) | null>(null);
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
      fire = { w, h, heat: new Uint8Array(w * h), sparks: [], plumes: [], flash: 0, image: ctx.createImageData(w, h) };
    };
    build();
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);

    // Before the track plays: a low, gently breathing smoulder
    const idle = (t: number): Music => ({
      ambience: 0.15 + 0.1 * Math.sin(t / 700),
      kick: 0,
      snare: 0,
      high: 0.03,
      wind: Math.sin(t / 900) * 0.4,
      notes: [],
    });
    const music = (t: number) => (listen.current && playingRef.current ? listen.current() : idle(t));

    if (prefersReducedMotion()) {
      // No animation: let the fire build up once and show it still
      const f = fire as Fire | null;
      if (f) {
        for (let i = 0; i < 80; i++) stepFire(f, idle(0));
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
      stepFire(fire, music(t));
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

  useEffect(() => () => void player.current?.ctx.close(), []);

  // Gapless looping: the track is decoded once into memory and looped by Web Audio itself, so a short
  // loop has no hitch at the seam (an <audio loop> element can leave a tiny gap in some browsers)
  const player = useRef<{ ctx: AudioContext; input: GainNode; buffer: AudioBuffer } | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const position = useRef({ offset: 0, startedAt: 0 });
  const starting = useRef(false); // ignore extra presses while the first one is still loading the track

  const pause = () => {
    const p = player.current;
    if (!p || !source.current) return;
    position.current.offset = (p.ctx.currentTime - position.current.startedAt) % p.buffer.duration;
    source.current.stop();
    source.current.disconnect();
    source.current = null;
    playingRef.current = false;
    setPlaying(false);
  };

  const play = async () => {
    if (starting.current) return;
    starting.current = true;
    try {
      await start();
    } finally {
      starting.current = false;
    }
  };

  const start = async () => {
    // Browsers only allow audio after a click, so everything is set up on the first press
    if (!player.current) {
      const ctx = new AudioContext();
      // The track plays through `input` to the speakers; the analysis taps it on the side
      const input = ctx.createGain();
      input.connect(ctx.destination);
      const buffer = await ctx.decodeAudioData(await (await fetch(Track)).arrayBuffer());
      player.current = { ctx, input, buffer };
      listen.current = makeListener(makeEars(ctx, input));
    }
    const { ctx, input, buffer } = player.current;
    await ctx.resume();
    const node = ctx.createBufferSource();
    node.buffer = buffer;
    node.loop = true;
    node.connect(input);
    node.start(0, position.current.offset);
    position.current.startedAt = ctx.currentTime - position.current.offset;
    source.current = node;
    playingRef.current = true;
    setPlaying(true);
  };

  const toggle = () => (playingRef.current ? pause() : void play());

  return (
    <div
      className={playing ? "ember playing" : "ember"}
      // While the track plays, pressing anywhere on the stage pauses it (the button keeps its own job)
      onPointerDown={(e) => {
        if (playing && !(e.target as Element).closest("button")) pause();
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
        <p className="nowPlaying">♪ Sample track I put together just for this</p>
      )}
    </div>
  );
};

export default Ember;
