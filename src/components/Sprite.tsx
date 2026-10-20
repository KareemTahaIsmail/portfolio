import { CSSProperties, useEffect, useState } from "react";
import { AnimName, FRAME, anims, prefersReducedMotion } from "../sprites";

interface Props {
  anim: AnimName;
  /** Repeat forever, or stop on the last frame */
  loop?: boolean;
  /** Mirror horizontally (the art faces right) */
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Plays one animation from a sprite sheet frame by frame, using the frame
 * timings from Aseprite. Give it a new `key` to restart it from frame one.
 */
const Sprite = ({ anim, loop = true, flip, className, style }: Props) => {
  const { sheet, durations } = anims[anim];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!loop && frame === durations.length - 1) return;
    const timer = window.setTimeout(
      () => setFrame((f) => (f + 1) % durations.length),
      durations[frame]
    );
    return () => window.clearTimeout(timer);
  }, [frame, durations, loop]);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: FRAME,
        height: FRAME,
        backgroundImage: `url(${sheet})`,
        backgroundSize: `${durations.length * FRAME}px ${FRAME}px`,
        backgroundPosition: `${-(frame % durations.length) * FRAME}px 0`,
        imageRendering: "pixelated",
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    />
  );
};

export default Sprite;
