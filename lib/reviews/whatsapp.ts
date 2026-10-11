/** Klienta un servera kopīgās funkcijas atsauksmju lūgšanai caur WhatsApp. */

/**
 * Tālruņa numurs WhatsApp saitei: tikai cipari ar valsts kodu.
 * "26 126 313" -> "37126126313", "+371 26126313" -> "37126126313".
 * Atgriež null, ja numurs neizskatās derīgs.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  // Latvijas mobilais numurs bez valsts koda.
  if (digits.length === 8 && digits.startsWith("2")) digits = `371${digits}`;
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

/** Par ko klients saka paldies: kostīma noma, svētki (pasākums) vai veikala pasūtījums. */
export type ReviewKind = "rezervacija" | "pasakums" | "veikals";

export const REVIEW_KIND_LABELS: Record<ReviewKind, string> = {
  rezervacija: "Kostīma noma",
  pasakums: "Svētki / pasākums",
  veikals: "Veikala pasūtījums",
};

/** Pateicības teikums atbilstoši tam, ko klients izmantoja. */
export function thankYouLine(kind: ReviewKind | null, service = ""): string {
  const what = service.trim();
  switch (kind) {
    case "rezervacija":
      return what ? `Paldies par kostīma „${what}” nomu!` : "Paldies par kostīma nomu!";
    case "pasakums":
      return what ? `Paldies, ka svinējāt kopā ar mums (${what})!` : "Paldies, ka svinējāt kopā ar mums!";
    case "veikals":
      return "Paldies par pasūtījumu!";
    default:
      return "Paldies, ka izvēlējāties Happy Carnevale!";
  }
}

/** Noklusētā ziņa. Vārds, pateicība un saite tiek ielikti automātiski. */
export function defaultReviewMessage(
  name: string,
  reviewUrl: string,
  kind: ReviewKind | null = null,
  service = ""
): string {
  const greeting = name.trim() ? `Sveiki, ${name.trim()}!` : "Sveiki!";
  return (
    `${greeting} ${thankYouLine(kind, service)} 🎭\n\n` +
    `Mēs būtu ļoti pateicīgi, ja atrastu minūti un uzrakstītu atsauksmi Google:\n` +
    `${reviewUrl}\n\nPaldies!`
  );
}

/** wa.me saite, kas atver WhatsApp ar gatavu ziņu. */
export function whatsappUrl(phone: string, message: string): string | null {
  const number = normalizePhone(phone);
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Vai saite izskatās pēc derīgas atsauksmju saites. */
export function isValidReviewUrl(value: string): boolean {
  if (value.length > 500) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.includes(".");
  } catch {
    return false;
  }
}
