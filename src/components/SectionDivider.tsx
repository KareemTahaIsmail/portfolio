import { useEffect, useRef, useState } from "react";
import "./styles/SectionDivider.css";

/** A pixel line between sections that draws itself in when scrolled into view. */
const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? "divider visible" : "divider"}
      aria-hidden="true"
    >
      <span className="line left" />
      <span className="line right" />
      <span className="spark" />
      <span className="gem" />
    </div>
  );
};

export default SectionDivider;
