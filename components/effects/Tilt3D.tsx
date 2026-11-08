"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Kartīte, kas sasveras uz peles pusi (3D), un pāri tai slīd gaismas atspīdums.
 * Telefonā pieskaroties kartīte viegli "iespiežas". Ja izvēlēts "mazāk kustību" – nekustas.
 */
export default function Tilt3D({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.setProperty("--rx", `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      card.classList.add("is-tilting");
    });
  }

  function handleLeave() {
    cancelAnimationFrame(frame.current);
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.classList.remove("is-tilting");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt3d ${className}`}
    >
      {children}
      <span aria-hidden="true" className="tilt3d-shine" />
    </div>
  );
}
