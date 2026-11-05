/**
 * Pārlūka pusē: sagatavo bildi Instagram – JPEG uz balta fona,
 * malu attiecība starp 4:5 (stāvs) un 1.91:1 (guļus), platums līdz 1440 px.
 * Ja bilde ir šaurāka/garāka, tai pievieno baltas malas (nekas netiek nogriezts).
 */
const MAX_WIDTH = 1440;
const MIN_RATIO = 4 / 5;
const MAX_RATIO = 1.91;

export async function prepareInstagramImage(imageUrl: string): Promise<File> {
  const response = await fetch(imageUrl, { mode: "cors", cache: "no-store" });
  if (!response.ok) throw new Error("fetch");
  const bitmap = await createImageBitmap(await response.blob());

  try {
    const ratio = bitmap.width / bitmap.height;
    const canvasRatio = Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));

    // Audekls, kurā bilde ietilpst pilnībā.
    let width: number;
    let height: number;
    if (ratio < canvasRatio) {
      height = bitmap.height;
      width = height * canvasRatio;
    } else {
      width = bitmap.width;
      height = width / canvasRatio;
    }
    const scale = Math.min(1, MAX_WIDTH / width);
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    const drawWidth = Math.round(bitmap.width * scale);
    const drawHeight = Math.round(bitmap.height * scale);
    context.drawImage(
      bitmap,
      Math.round((width - drawWidth) / 2),
      Math.round((height - drawHeight) / 2),
      drawWidth,
      drawHeight
    );

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
    );
    if (!blob) throw new Error("encode");
    return new File([blob], "instagram.jpg", { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

/** Sākotnējais apraksts, ko var labot. */
export function defaultCaption(title: string, price: string, pagePath: string): string {
  return [
    title ? `✨ ${title}` : "✨ Happy Carnevale",
    ...(price ? [`Noma: ${price}`] : []),
    "",
    `Rezervē: happycarnevale.lv${pagePath}`,
    "📞 26 126 313",
    "",
    "#kostīmunoma #kostimunoma #happycarnevale #rīga #karnevāls",
  ].join("\n");
}
