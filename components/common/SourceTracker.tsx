"use client";

import { useEffect } from "react";
import { rememberSource } from "@/lib/trafficSource";

/** Neredzams: pirmajā apmeklējumā atceras, no kurienes klients atnāca (Google, Instagram, cita lapa...). */
export default function SourceTracker() {
  useEffect(() => {
    rememberSource();
  }, []);
  return null;
}
