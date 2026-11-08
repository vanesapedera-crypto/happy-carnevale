"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Apakšsadaļu pogas kategorijas lapas augšā (piem., Princeses, Supervaroņi…).
 * Paliek redzamas, ritinot lapu, un iekrāso sadaļu, kura pašlaik ir ekrānā.
 */
export default function SectionNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-16 z-30 bg-[#F8F9FC]/90 py-4 backdrop-blur lg:top-24 lg:py-5"
    >
      <div className="mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-4 [scrollbar-width:none] lg:justify-center lg:px-8">
        {items.map(({ id, label: text }) => {
          const on = id === active;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={on ? "true" : undefined}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-[15px] font-bold transition duration-200 ${
                on
                  ? "bg-gradient-to-r from-[#6C3BFF] to-[#FF4BA5] text-white shadow-[0_10px_24px_rgba(108,59,255,0.25)]"
                  : "bg-white text-[#4B4860] shadow-[0_6px_18px_rgba(23,23,23,0.06)] hover:-translate-y-0.5 hover:text-[#6C3BFF]"
              }`}
            >
              {text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
