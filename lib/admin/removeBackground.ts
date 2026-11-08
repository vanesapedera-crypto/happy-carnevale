/**
 * Pārlūka pusē (admin panelī): noņem kostīma bildei fonu.
 *
 * Modelis public/models/isnet-q8.onnx (IS-Net, Apache-2.0, saspiests līdz ~46 MB).
 * Pirmajā reizē pārlūks to lejupielādē, pēc tam ņem no kešatmiņas.
 * Bildes apstrādā pa vienai, lai dators nepārslogojas.
 */

const MODEL_URL = "/models/isnet-q8.onnx";
const ORT_VERSION = "1.23.2";
const SIZE = 1024;
const MAX_OUTPUT = 640;

type Ort = typeof import("onnxruntime-web");
type Session = import("onnxruntime-web").InferenceSession;

let sessionPromise: Promise<{ ort: Ort; session: Session }> | null = null;

function loadSession() {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const ort = await import("onnxruntime-web");
      ort.env.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist/`;
      if (!globalThis.crossOriginIsolated) ort.env.wasm.numThreads = 1;
      const session = await ort.InferenceSession.create(MODEL_URL, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });
      return { ort, session };
    })().catch((error) => {
      sessionPromise = null;
      throw error;
    });
  }
  return sessionPromise;
}

async function loadBitmap(src: string): Promise<ImageBitmap> {
  const response = await fetch(src, { mode: "cors", cache: "force-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return createImageBitmap(await response.blob());
}

function canvas(width: number, height: number) {
  const element = document.createElement("canvas");
  element.width = width;
  element.height = height;
  const context = element.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("canvas");
  return { element, context };
}

async function cutOut(src: string): Promise<Blob> {
  const { ort, session } = await loadSession();
  const bitmap = await loadBitmap(src);

  try {
    // 1) Modeļa ievade: 1024×1024, vērtības 0..1 mīnus 0.5
    const input = canvas(SIZE, SIZE);
    input.context.drawImage(bitmap, 0, 0, SIZE, SIZE);
    const pixels = input.context.getImageData(0, 0, SIZE, SIZE).data;
    const area = SIZE * SIZE;
    const data = new Float32Array(3 * area);
    for (let i = 0; i < area; i++) {
      data[i] = pixels[i * 4] / 255 - 0.5;
      data[area + i] = pixels[i * 4 + 1] / 255 - 0.5;
      data[2 * area + i] = pixels[i * 4 + 2] / 255 - 0.5;
    }
    const feeds = { [session.inputNames[0]]: new ort.Tensor("float32", data, [1, 3, SIZE, SIZE]) };
    const result = await session.run(feeds);
    const mask = result[session.outputNames[0]].data as Float32Array;

    // 2) Maska 0..255; vājus plankumus fonā nogriež
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < area; i++) {
      if (mask[i] < min) min = mask[i];
      if (mask[i] > max) max = mask[i];
    }
    const span = max - min || 1;
    const maskCanvas = canvas(SIZE, SIZE);
    const maskImage = maskCanvas.context.createImageData(SIZE, SIZE);
    for (let i = 0; i < area; i++) {
      const value = (mask[i] - min) / span;
      const alpha = Math.min(1, Math.max(0, (value - 0.12) / 0.76));
      maskImage.data[i * 4 + 3] = Math.round(alpha * 255);
    }
    maskCanvas.context.putImageData(maskImage, 0, 0);

    // 3) Oriģinālā izmērā (ne lielāks par 1200 px) pieliek masku
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const full = canvas(width, height);
    full.context.drawImage(maskCanvas.element, 0, 0, width, height);
    full.context.globalCompositeOperation = "source-in";
    full.context.drawImage(bitmap, 0, 0, width, height);

    // 4) Apgriež tukšās malas un samazina
    const alpha = full.context.getImageData(0, 0, width, height).data;
    let top = height, left = width, right = -1, bottom = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (alpha[(y * width + x) * 4 + 3] > 8) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
    if (right < 0) throw new Error("Bildē neatradām kostīmu.");
    const cropW = right - left + 1;
    const cropH = bottom - top + 1;
    const outScale = Math.min(1, MAX_OUTPUT / Math.max(cropW, cropH));
    const out = canvas(Math.round(cropW * outScale), Math.round(cropH * outScale));
    out.context.drawImage(full.element, left, top, cropW, cropH, 0, 0, out.element.width, out.element.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      out.element.toBlob(resolve, "image/webp", 0.86)
    );
    // Safari WebP neprot – tad PNG (arī caurspīdīgs)
    if (blob && blob.type === "image/webp") return blob;
    const png = await new Promise<Blob | null>((resolve) => out.element.toBlob(resolve, "image/png"));
    if (!png) throw new Error("encode");
    return png;
  } finally {
    bitmap.close();
  }
}

let queue: Promise<unknown> = Promise.resolve();

/** Noņem fonu bildei pēc adreses. Izsaukumi tiek izpildīti pēc kārtas. */
export function removeBackground(src: string): Promise<Blob> {
  const job = queue.then(() => cutOut(src));
  queue = job.catch(() => {});
  return job;
}
