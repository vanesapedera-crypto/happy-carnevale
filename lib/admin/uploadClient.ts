import { prepareImage } from "./prepareImage";
import type { ActionResult, SectionItem } from "./types";

/**
 * Pārlūka pusē: samazina attēlu un nosūta to uz `url` kopā ar `fields`.
 * Atgriež null, ja izdevās, citādi kļūdas tekstu, ko rādīt lietotājam.
 */
export async function postImage(
  url: string,
  fields: Record<string, string>,
  original: File
): Promise<string | null> {
  let file: File;
  try {
    file = await prepareImage(original);
  } catch {
    return "Šo failu nevar nolasīt kā attēlu. Izmanto JPG, PNG vai WebP.";
  }

  const body = new FormData();
  for (const [name, value] of Object.entries(fields)) body.append(name, value);
  body.append("file", file, file.name);

  let response: Response;
  try {
    response = await fetch(url, { method: "POST", body });
  } catch {
    return "Neizdevās augšupielādēt. Pārbaudi interneta savienojumu.";
  }

  try {
    const result = (await response.json()) as ActionResult<SectionItem>;
    return result.ok ? null : result.error;
  } catch {
    return `Servera kļūda (HTTP ${response.status}).`;
  }
}
