"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Peldoši 3D ziepju burbuļi sākumlapai.
 * - Burbuļi lēnām ceļas augšup un šūpojas; varavīksnes plēve griežas, tāpēc tie mirgo kā īsti.
 * - Datorā tie seko pelei dažādos dziļumos (tuvākie kustas vairāk) – rodas telpas sajūta.
 * - Uzklikšķinot burbulis pārplīst un pēc brīža parādās no jauna.
 * Bez papildu pakotnēm (tikai CSS); ja lietotājs izvēlējies "mazāk kustību", burbuļi stāv uz vietas.
 */

interface Bubble {
  left: number; // %
  size: number; // px
  depth: number; // 0.2 (tālu) – 1 (tuvu)
  duration: number; // s, celšanās laiks
  delay: number; // s
  sway: number; // s
}

const DESKTOP: Bubble[] = [
  { left: 66, size: 190, depth: 1, duration: 26, delay: -4, sway: 7 },
  { left: 90, size: 120, depth: 0.7, duration: 22, delay: -14, sway: 6 },
  { left: 78, size: 70, depth: 0.45, duration: 30, delay: -2, sway: 5 },
  { left: 94, size: 46, depth: 0.3, duration: 34, delay: -20, sway: 4.5 },
  { left: 8, size: 56, depth: 0.35, duration: 28, delay: -11, sway: 5.5 },
  { left: 52, size: 150, depth: 0.85, duration: 24, delay: -19, sway: 8 },
  { left: 30, size: 34, depth: 0.25, duration: 36, delay: -27, sway: 4 },
  { left: 20, size: 90, depth: 0.55, duration: 31, delay: -24, sway: 6.5 },
];

const MOBILE: Bubble[] = [
  { left: 8, size: 70, depth: 0.8, duration: 16, delay: -3, sway: 5 },
  { left: 78, size: 54, depth: 0.6, duration: 19, delay: -9, sway: 4.5 },
  { left: 60, size: 30, depth: 0.35, duration: 22, delay: -15, sway: 4 },
  { left: 24, size: 38, depth: 0.45, duration: 20, delay: -12, sway: 5.5 },
  { left: 88, size: 86, depth: 1, duration: 17, delay: -1, sway: 6 },
];

export default function Bubbles3D({ variant }: { variant: "desktop" | "mobile" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState<Record<number, boolean>>({});
  const bubbles = variant === "desktop" ? DESKTOP : MOBILE;

  // Peles paralakse (tikai ierīcēm ar peli).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        root.style.setProperty("--mx", x.toFixed(3));
        root.style.setProperty("--my", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  function pop(index: number) {
    setPopped((state) => ({ ...state, [index]: true }));
    window.setTimeout(() => setPopped((state) => ({ ...state, [index]: false })), 2500);
  }

  return (
    <div ref={rootRef} aria-hidden="true" className="bubbles3d pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="bubbles3d-rise"
          style={
            {
              "--left": `${bubble.left}%`,
              "--size": `${bubble.size}px`,
              "--depth": bubble.depth,
              "--rise": `${bubble.duration}s`,
              "--delay": `${bubble.delay}s`,
              "--sway": `${bubble.sway}s`,
              zIndex: Math.round(bubble.depth * 10),
            } as CSSProperties
          }
        >
          <div className="bubbles3d-sway">
            <div className="bubbles3d-parallax">
              <button
                type="button"
                tabIndex={-1}
                onClick={() => pop(index)}
                className={`bubbles3d-bubble pointer-events-auto ${popped[index] ? "is-popped" : ""}`}
              >
                <span className="bubbles3d-film" />
                <span className="bubbles3d-shine" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
