/**
 * No kurienes klients atnāca uz mājaslapu (pirmais apmeklējums, glabājas pārlūkā 60 dienas).
 * Izmanto rezervācijas formā, lai varētu redzēt: Google, sociālie tīkli vai cita mājaslapa.
 */
const KEY = "hc_source";
const MAX_AGE_MS = 60 * 24 * 60 * 60 * 1000;

export interface StoredSource {
  /** Piem. "Google", "Instagram", "kostimi.lv", "Tieši (ierakstīja adresi)". */
  label: string;
  at: number;
}

const KNOWN: [RegExp, string][] = [
  [/(^|\.)google\./, "Google"],
  [/(^|\.)bing\./, "Bing"],
  [/(^|\.)(facebook|fb)\.com$|(^|\.)fb\.me$|messenger\.com$/, "Facebook"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)tiktok\.com$/, "TikTok"],
  [/(^|\.)youtube\.com$/, "YouTube"],
  [/(^|\.)(ss|ss\.com)\.lv$|(^|\.)ss\.com$/, "ss.lv"],
];

export function classifyHost(host: string): string {
  const clean = host.replace(/^www\./, "").toLowerCase();
  for (const [pattern, label] of KNOWN) if (pattern.test(clean)) return label;
  return clean;
}

const UTM_LABELS: Record<string, string> = {
  google: "Google",
  facebook: "Facebook",
  fb: "Facebook",
  instagram: "Instagram",
  ig: "Instagram",
  tiktok: "TikTok",
};

/** Pārlūkā: saglabā pirmo avotu (ja vēl nav vai ir novecojis). */
export function rememberSource(): void {
  try {
    const existing = readSource();
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const utm = (params.get("utm_source") ?? "").trim().toLowerCase();
    let label = "";
    if (utm) label = UTM_LABELS[utm] ?? utm.slice(0, 60);
    else if (params.get("gclid")) label = "Google (reklāma)";
    else if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && !host.endsWith("happycarnevale.lv")) label = classifyHost(host);
    }
    if (!label) label = "Tieši (ierakstīja adresi / grāmatzīme)";

    window.localStorage.setItem(KEY, JSON.stringify({ label, at: Date.now() } satisfies StoredSource));
  } catch {
    // Privātais režīms vai bloķēta krātuve – avots vienkārši netiek saglabāts.
  }
}

export function readSource(): StoredSource | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as StoredSource;
    if (typeof value?.label !== "string" || Date.now() - value.at > MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
}

/** Atbildes uz "Kā uzzināji par mums?" rezervācijas formā. */
export const HEARD_FROM_OPTIONS = [
  "Google meklēšana",
  "Google kartes",
  "Instagram",
  "Facebook",
  "TikTok",
  "Ieteica draugi / paziņas",
  "No citas kostīmu nomas",
  "Jau esmu bijis klients",
  "Cits",
] as const;
