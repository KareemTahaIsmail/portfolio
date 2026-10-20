import { useEffect, useMemo, useState } from "react";
import Sprite from "./Sprite";
import { AnimName, FRAME, GROUND_ROW, THEF_GROUND_ROW, animMs } from "../sprites";

/** One beat of a scene: play `anim`, optionally travelling to x = `to` (px) while it plays. */
interface Step {
  anim: AnimName;
  to?: number;
  ms?: number;
  /** Stay on this step (looping) once reached */
  hold?: boolean;
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
    if (step >= script.length || script[step]?.hold) return;
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
  x: number;
  /** Time to travel to `x`; 0 to stand still */
  travelMs?: number;
  flip?: boolean;
  groundRow?: number;
  restartKey: string | number;
  className?: string;
}

/** A sprite standing on the divider line at x, its feet on the line. */
const Actor = ({ anim, x, travelMs = 0, flip, groundRow = GROUND_ROW, restartKey, className }: ActorProps) => (
  <div
    className={className ? `actor ${className}` : "actor"}
    style={{
      left: x,
      transition: travelMs ? `left ${travelMs}ms linear` : "none",
      transform: `translate(-50%, ${FRAME - groundRow}px)`,
    }}
  >
    <Sprite key={restartKey} anim={anim} flip={flip} className="pixelRim" />
  </div>
);

interface SceneProps {
  width: number;
}

/** Home → Experience: the fighter runs in, rolls through the gem and slides off stage. */
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

const KICK_STEP = 3;
const KICK_LANDS_MS = 400; // the kick's fully extended frames

/** Experience → Projects: Thef waits on the line; the fighter runs up and kicks it out of the scene. */
export const EncounterScene = ({ width }: SceneProps) => {
  const thefX = Math.min(width * 0.72, width - 70);
  const script = useMemo<Step[]>(
    () => [
      run(OFFSTAGE, thefX - 92),
      { anim: "runStop" },
      { anim: "guard" },
      { anim: "sideKick" },
      { anim: "guard" },
      { anim: "idle", hold: true },
    ],
    [thefX]
  );
  const step = useScript(script);
  const [thef, setThef] = useState<"waiting" | "hit" | "gone">("waiting");

  useEffect(() => {
    if (step !== KICK_STEP) return;
    const timer = window.setTimeout(() => setThef("hit"), KICK_LANDS_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (thef !== "hit") return;
    const timer = window.setTimeout(() => setThef("gone"), 700);
    return () => window.clearTimeout(timer);
  }, [thef]);

  const current = script[Math.max(step, 0)];
  return (
    <>
      {thef !== "gone" && (
        <Actor
          anim="thef"
          x={thefX}
          flip
          groundRow={THEF_GROUND_ROW}
          restartKey="thef"
          className={thef === "hit" ? "hit" : undefined}
        />
      )}
      <Actor
        anim={step < 0 ? "run" : current.anim}
        x={positionAt(script, step, OFFSTAGE)}
        travelMs={step < 0 ? 0 : current.to !== undefined ? current.ms : 0}
        restartKey={step}
      />
    </>
  );
};
