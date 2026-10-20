import { useEffect, useRef, useState } from "react";
import { MovesScene, RunScene } from "./DividerScenes";
import { prefersReducedMotion } from "../sprites";
import "./styles/SectionDivider.css";

interface Props {
  /** A little sprite scene that plays on the line each time it scrolls into view */
  scene?: "run" | "moves";
}

/** A pixel line between sections that draws itself in when scrolled into view. */
const SectionDivider = ({ scene }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  // Width of the stage for the current play-through; null while out of view
  const [stage, setStage] = useState<{ id: number; width: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          setStage({ id: Date.now(), width: el.clientWidth });
        } else {
          setStage(null);
        }
      },
      { threshold: 0.9 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showScene = scene && stage && !prefersReducedMotion();
  const className = ["divider", scene && "hasScene", drawn && "visible"]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <span className="line" />
      {showScene &&
        (scene === "run" ? (
          <RunScene key={stage.id} width={stage.width} />
        ) : (
          <MovesScene key={stage.id} />
        ))}
    </div>
  );
};

export default SectionDivider;
