import { ReactNode, useEffect, useMemo, useState } from "react";
import Sprite from "./Sprite";
import { AnimName, FRAME, GROUND_ROW, animMs } from "../sprites";

/** One beat of a scene: play `anim`, optionally travelling to x = `to` (px) while it plays. */
interface Step {
  anim: AnimName;
  to?: number;
  ms?: number;
}

const RUN_SPEED = 0.26; // px per ms
const OFFSTAGE = -70;

const run = (from: number, to: number): Step => ({
  anim: "run",
  to,
  ms: Math.abs(to - from) / RUN_SPEED,
});

/** Walks through the script and returns the current step (-1 = in place, about to start). */
function useScript(script: Step[]) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (step >= script.length) return;
    // A short beat at -1 lets the actor paint at its start position, so the first move animates
    const ms = step === -1 ? 50 : script[step].ms ?? animMs(script[step].anim);
    const timer = window.setTimeout(() => setStep(step + 1), ms);
    return () => window.clearTimeout(timer);
  }, [step, script]);

  return step;
}

/** Where the actor stands at a given step: the last `to` reached so far. */
const positionAt = (script: Step[], step: number, start: number) =>
  script.slice(0, step + 1).reduce((x, s) => s.to ?? x, start);

interface ActorProps {
  anim: AnimName;
  /** px from the left, or a CSS length such as "50%" */
  x: number | string;
  /** Time to travel to `x`; 0 to stand still */
  travelMs?: number;
  restartKey: string | number;
  children?: ReactNode;
}

/** A sprite standing on the divider line at x, its feet on the line. */
const Actor = ({ anim, x, travelMs = 0, restartKey, children }: ActorProps) => (
  <div
    className="actor"
    style={{
      left: x,
      transition: travelMs ? `left ${travelMs}ms linear` : "none",
      transform: `translate(-50%, ${FRAME - GROUND_ROW}px)`,
    }}
  >
    <Sprite key={`sprite-${restartKey}`} anim={anim} className="pixelRim" />
    {children}
  </div>
);

interface SceneProps {
  width: number;
}

/** Home → Experience: the fighter runs in, rolls through the middle and slides off stage. */
export const RunScene = ({ width }: SceneProps) => {
  const mid = width / 2;
  const script = useMemo<Step[]>(
    () => [
      run(OFFSTAGE, mid - 110),
      { anim: "roll", to: mid + 40, ms: animMs("roll") },
      run(mid + 40, width - 60),
      { anim: "slide", to: width + 90, ms: animMs("slide") },
    ],
    [mid, width]
  );
  const step = useScript(script);
  if (step >= script.length) return null;

  const current = script[Math.max(step, 0)];
  return (
    <Actor
      anim={step < 0 ? "run" : current.anim}
      x={positionAt(script, step, OFFSTAGE)}
      travelMs={step < 0 ? 0 : current.ms}
      restartKey={step}
    />
  );
};

const MOVES: { anim: AnimName; name: string }[] = [
  { anim: "sideKick", name: "Side kick!" },
  { anim: "axeKick", name: "Axe kick!" },
  { anim: "backflip", name: "Backflip!" },
  { anim: "roll", name: "Roll!" },
  { anim: "matrixDodge", name: "Matrix dodge!" },
];

/** Experience → Projects: the fighter stands mid-line and loops through his move list, a stance between each. */
export const MovesScene = () => {
  // Even beats are moves, odd beats are the fighting stance between them
  const [beat, setBeat] = useState(0);
  const move = MOVES[Math.floor(beat / 2) % MOVES.length];
  const performing = beat % 2 === 0;
  const anim: AnimName = performing ? move.anim : "guard";

  useEffect(() => {
    const timer = window.setTimeout(() => setBeat((b) => b + 1), animMs(anim));
    return () => window.clearTimeout(timer);
  }, [beat, anim]);

  return (
    <Actor anim={anim} x="50%" restartKey={beat}>
      {performing && (
        <span className="moveName" key={`name-${beat}`}>
          {move.name}
        </span>
      )}
    </Actor>
  );
};
