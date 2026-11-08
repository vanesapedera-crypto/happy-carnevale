"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

const KEY = "hc-wishlist";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** Sirsniņa kartītes stūrī – atceras izvēlētos kostīmus šajā pārlūkā. */
export default function WishButton({
  id,
  addLabel,
  removeLabel,
  className = "",
}: {
  id: string;
  addLabel: string;
  removeLabel: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(read().includes(id));
  }, [id]);

  function toggle() {
    const list = read();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* privātais režīms – vienkārši neatceras */
    }
    setOn(next.includes(id));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? removeLabel : addLabel}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(23,23,23,0.10)] transition duration-200 hover:scale-110 hover:text-[#FF4BA5] hover:shadow-[0_10px_22px_rgba(255,75,165,0.22)] ${
        on ? "text-[#FF4BA5]" : "text-[#171717]"
      } ${className}`}
    >
      <FiHeart className={`h-5 w-5 ${on ? "fill-current" : ""}`} aria-hidden="true" />
    </button>
  );
}
