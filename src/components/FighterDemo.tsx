import { useCallback, useEffect, useRef, useState } from "react";
import Sprite from "./Sprite";
import { AnimName, animMs } from "../sprites";

const MOVES: { anim: AnimName; name: string }[] = [
  { anim: "sideKick", name: "Side kick!" },
  { anim: "axeKick", name: "Axe kick!" },
  { anim: "backflip", name: "Backflip!" },
  { anim: "roll", name: "Roll!" },
  { anim: "matrixDodge", name: "Matrix dodge!" },
];

interface Props {
  /** The card is hovered or focused: throw a move, then hold a fighting stance */
  active: boolean;
}

/** The platform fighter's hero, showing off his move list one hover or tap at a time. */
const FighterDemo = ({ active }: Props) => {
  const [movesThrown, setMovesThrown] = useState(0);
  const [performing, setPerforming] = useState(false);
  const lastThrow = useRef(0);

  // On touch screens a tap both "hovers" and clicks; count it once
  const throwMove = useCallback(() => {
    const now = Date.now();
    if (now - lastThrow.current < 300) return;
    lastThrow.current = now;
    setMovesThrown((n) => n + 1);
  }, []);

  useEffect(() => {
    if (active) throwMove();
  }, [active, throwMove]);

  const move = MOVES[(movesThrown - 1) % MOVES.length];

  useEffect(() => {
    if (movesThrown === 0) return;
    setPerforming(true);
    const timer = window.setTimeout(() => setPerforming(false), animMs(move.anim));
    return () => window.clearTimeout(timer);
  }, [movesThrown, move]);

  const anim: AnimName = performing ? move.anim : active ? "guard" : "idle";

  return (
    <button
      type="button"
      className="fighterDemo"
      onClick={throwMove}
      aria-label="Make the fighter do a move"
    >
      <Sprite key={`${anim}-${movesThrown}`} anim={anim} loop={!performing} className="fighter pixelRim" />
      {performing && (
        <span className="moveName" key={movesThrown}>
          {move.name}
        </span>
      )}
    </button>
  );
};

export default FighterDemo;
