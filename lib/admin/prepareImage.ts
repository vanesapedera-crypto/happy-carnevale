/**
 * Pārlūka pusē: pirms augšupielādes samazina lielus attēlus.
 * Telefona foto (5-10 MB) kļūst par ~200-500 KB, lapa ielādējas ātrāk,
 * un fails iekļaujas servera 4 MB ierobežojumā.
 */

const MAX_DIMENSION = 1600;
const KEEP_ORIGINAL_BELOW_BYTES = 700 * 1024;
const TARGET_MAX_BYTES = 3.5 * 1024 * 1024;
const QUALITY = 0.86;

interface LoadedImage {
  source: CanvasImageSource;
  width: number;
  height: number;
  release: () => void;
}

async function loadImage(file: File): Promise<LoadedImage> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close(),
      };
    } catch {
      // Mēģinām ar <img> zemāk.
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("decode"));
      element.src = url;
    });
    return {
      source: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      release: () => URL.revokeObjectURL(url),
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function draw(image: LoadedImage, width: number, height: number, background?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas");
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(image.source, 0, 0, width, height);
  return canvas;
}

function toBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
}

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Atgriež augšupielādei gatavu failu. Met kļūdu, ja attēlu nevar nolasīt. */
export async function prepareImage(file: File): Promise<File> {
  const image = await loadImage(file);

  try {
    const longestSide = Math.max(image.width, image.height);
    if (
      longestSide <= MAX_DIMENSION &&
      file.size <= KEEP_ORIGINAL_BELOW_BYTES &&
      file.type in EXTENSIONS
    ) {
      return file;
    }

    const scale = Math.min(1, MAX_DIMENSION / longestSide);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    // JPG paliek JPG. PNG/WebP var būt caurspīdīgs fons, tāpēc tos saglabājam kā WebP.
    let blob: Blob | null = null;
    if (file.type !== "image/jpeg") {
      blob = await toBlob(draw(image, width, height), "image/webp");
    }
    // Ja pārlūks WebP neprot vai fails joprojām par lielu: JPG uz balta fona.
    if (!blob || !(blob.type in EXTENSIONS) || blob.size > TARGET_MAX_BYTES) {
      blob = await toBlob(draw(image, width, height, "#ffffff"), "image/jpeg");
    }
    if (!blob) throw new Error("encode");

    const baseName = file.name.replace(/\.[^.]+$/, "") || "attels";
    return new File([blob], `${baseName}.${EXTENSIONS[blob.type] ?? "jpg"}`, {
      type: blob.type,
    });
  } finally {
    image.release();
  }
}
