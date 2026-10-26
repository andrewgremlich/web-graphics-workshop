const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 800;
export const CANVAS_ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT;

if (!canvas) throw Error("Canvas could not get set");
if (!ctx) throw Error("CTX not available");



export function updateCanvasCtx() {
  if (!canvas) {
    return;
  }

  const { width, height } = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  ctx?.setTransform(canvas.width / CANVAS_WIDTH, 0, 0, canvas.height / CANVAS_HEIGHT, 0, 0);
}

export function getCanvas() {
  if (!canvas) throw "Can not continue with out canvas";
  return canvas;
}

export function getCtx() {
  if (!ctx) throw "can not continue without ctx";
  return ctx;
}
