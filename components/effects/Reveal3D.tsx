"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Elements, kas, ritinot lejup, "izlido" ekrānā ar 3D pagriezienu.
 * index nosaka nelielu aizturi, lai saraksta elementi parādās viens pēc otra.
 */
export default function Reveal3D({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal3d ${className}`}
      style={{ transitionDelay: `${Math.min(index, 6) * 90}ms` }}
    >
      {children}
    </div>
  );
}
