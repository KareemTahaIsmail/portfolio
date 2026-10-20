// Sprite sheets exported from the FRIST game's Aseprite files (Character layer only):
//   aseprite -b --layer Character <file>.aseprite --sheet <name>.png --sheet-type horizontal --data <name>.json
// Each sheet is a horizontal strip of 128x128 frames; durations (ms) come from the .json data.

import idleSheet from "./assets/images/sprites/idle.png";
import guardSheet from "./assets/images/sprites/guard.png";
import runSheet from "./assets/images/sprites/run.png";
import runStopSheet from "./assets/images/sprites/runStop.png";
import slideSheet from "./assets/images/sprites/slide.png";
import rollSheet from "./assets/images/sprites/roll.png";
import backflipSheet from "./assets/images/sprites/backflip.png";
import sideKickSheet from "./assets/images/sprites/sideKick.png";
import axeKickSheet from "./assets/images/sprites/axeKick.png";
import matrixDodgeSheet from "./assets/images/sprites/matrixDodge.png";
import thefSheet from "./assets/images/sprites/thef.png";

export interface SpriteAnim {
  sheet: string;
  durations: number[];
}

export const FRAME = 128;

/** Row of a frame where the feet touch the ground (Thef stands a few rows lower). */
export const GROUND_ROW = 109;
export const THEF_GROUND_ROW = 115;

export const anims = {
  idle: { sheet: idleSheet, durations: [450, 450, 150, 500, 150] },
  guard: { sheet: guardSheet, durations: [120, 120, 120, 120, 120, 120, 120, 120] },
  run: { sheet: runSheet, durations: [100, 100, 100, 100, 100, 100] },
  runStop: { sheet: runStopSheet, durations: [100, 100] },
  slide: { sheet: slideSheet, durations: [100, 100, 100, 100] },
  roll: { sheet: rollSheet, durations: [100, 100, 100, 100, 100, 100] },
  backflip: { sheet: backflipSheet, durations: [120, 120, 120, 120, 120, 120, 120, 120, 120] },
  sideKick: { sheet: sideKickSheet, durations: [80, 80, 80, 80, 80, 80, 80, 80, 80] },
  axeKick: { sheet: axeKickSheet, durations: [120, 120, 120, 120, 120, 120] },
  matrixDodge: { sheet: matrixDodgeSheet, durations: [100, 100, 100, 100] },
  thef: { sheet: thefSheet, durations: [100, 100, 100, 100, 100, 100, 100, 100] },
} satisfies Record<string, SpriteAnim>;

export type AnimName = keyof typeof anims;

/** Total length of one play-through of an animation, in ms. */
export const animMs = (anim: AnimName) =>
  anims[anim].durations.reduce((total, ms) => total + ms, 0);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
