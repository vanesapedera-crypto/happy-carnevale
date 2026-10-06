/** Ieraksta vieta sarakstā: mazākais sortOrder ir pirmais. */
export interface OrderEntry {
  id: string;
  sortOrder: number;
}

const STEP = 10;
/** Pārnumurējot atstāj lielas atstarpes, lai nākamajām pārvietošanām pietiek ar vienu ierakstu. */
const RENUMBER_STEP = 1000;
/** Postgres integer robežās, ar rezervi. */
const MAX_SORT_ORDER = 2_000_000_000;

/**
 * Pārvieto `dragId` pirms vai pēc `targetId`. Atgriež jaunu sarakstu;
 * ja nekas nemainās vai kāds no id nav sarakstā, atgriež to pašu `ids`.
 */
export function moveId(
  ids: readonly string[],
  dragId: string,
  targetId: string,
  after: boolean
): readonly string[] {
  if (dragId === targetId || !ids.includes(dragId)) return ids;

  const rest = ids.filter((id) => id !== dragId);
  const targetIndex = rest.indexOf(targetId);
  if (targetIndex === -1) return ids;

  rest.splice(targetIndex + (after ? 1 : 0), 0, dragId);
  return rest.every((id, index) => id === ids[index]) ? ids : rest;
}

/** Garākā stingri augošā apakšvirkne: true tām vietām, kas tajā ietilpst. */
function longestIncreasing(values: readonly number[]): boolean[] {
  const tails: number[] = []; // tails[len - 1] = pēdējā elementa indekss
  const previous: number[] = new Array(values.length).fill(-1);

  values.forEach((value, index) => {
    let low = 0;
    let high = tails.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      if (values[tails[middle]] < value) low = middle + 1;
      else high = middle;
    }
    if (low > 0) previous[index] = tails[low - 1];
    tails[low] = index;
  });

  const keep: boolean[] = new Array(values.length).fill(false);
  for (let index = tails.length > 0 ? tails[tails.length - 1] : -1; index !== -1; index = previous[index]) {
    keep[index] = true;
  }
  return keep;
}

/**
 * Aprēķina, kuriem ierakstiem jāmaina sortOrder, lai secība kļūtu `orderedIds`.
 *
 * Maina pēc iespējas mazāk ierakstu: tie, kas jau ir pareizā savstarpējā secībā,
 * paliek neskarti, bet pārvietotie saņem skaitli starp kaimiņiem. Ja starp
 * kaimiņiem vairs nav brīvu skaitļu, viss saraksts tiek pārnumurēts (1000, 2000, ...).
 *
 * `orderedIds` jāsatur tieši tie paši id, kas ir `current`, katrs vienu reizi.
 */
export function planReorder(
  current: readonly OrderEntry[],
  orderedIds: readonly string[]
): OrderEntry[] {
  const byId = new Map(current.map((entry) => [entry.id, entry.sortOrder]));
  if (byId.size !== current.length || orderedIds.length !== current.length) {
    throw new Error("planReorder: saraksti nesakrīt");
  }
  const values = orderedIds.map((id) => {
    const value = byId.get(id);
    if (value === undefined) throw new Error("planReorder: nezināms id");
    return value;
  });
  if (new Set(orderedIds).size !== orderedIds.length) {
    throw new Error("planReorder: id atkārtojas");
  }

  const count = values.length;
  const keep = longestIncreasing(values);
  let next: number[] | null = values.slice();

  for (let start = 0; start < count && next; ) {
    if (keep[start]) {
      start += 1;
      continue;
    }
    let end = start;
    while (end < count && !keep[end]) end += 1;

    // Posms [start, end) jāievieto starp neskartajiem kaimiņiem lower un upper.
    const size = end - start;
    const lower = start > 0 ? next[start - 1] : null;
    const upper = end < count ? values[end] : null;

    for (let offset = 0; offset < size; offset += 1) {
      if (lower === null && upper !== null) {
        next[start + offset] = upper - STEP * (size - offset);
      } else if (lower !== null && upper === null) {
        next[start + offset] = lower + STEP * (offset + 1);
      } else if (lower !== null && upper !== null && upper - lower - 1 >= size) {
        next[start + offset] = lower + Math.floor(((upper - lower) * (offset + 1)) / (size + 1));
      } else {
        next = null; // nav vietas starp kaimiņiem
        break;
      }
    }
    start = end;
  }

  const usable =
    next !== null &&
    next.every((value) => Number.isInteger(value) && Math.abs(value) <= MAX_SORT_ORDER);
  const target = usable && next ? next : values.map((_, index) => (index + 1) * RENUMBER_STEP);

  const updates: OrderEntry[] = [];
  orderedIds.forEach((id, index) => {
    if (target[index] !== values[index]) updates.push({ id, sortOrder: target[index] });
  });
  return updates;
}
