const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 800;

if (!canvas) throw Error("Canvas could not get set");

if (!ctx) throw Error("CTX not available");

canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

await document.fonts.load("60px IBM Plex Serif");

export function updateCanvasCtx() {
	if (!canvas) {
		return;
	}

	const { width, height } = canvas.getBoundingClientRect();
	const dpr = window.devicePixelRatio || 1;

	canvas.width = Math.floor(width * dpr);
	canvas.height = Math.floor(height * dpr);

	ctx?.scale(dpr, dpr);
}

export function getCanvas() {
	if (!canvas) throw "Can not continue with out canvas";

	return canvas;
}

export function getCtx() {
	if (!ctx) throw "can not continue without ctx";

	return ctx;
}

export function createLayer(
	paint: (ctx: OffscreenCanvasRenderingContext2D) => void,
) {
	let cached: OffscreenCanvas | null = null;

	return () => {
		if (cached) return cached;

		const layer = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
		const ctx = layer.getContext("2d");

		if (!ctx) throw new Error("no ctx");

		paint(ctx);

		cached = layer;
		return layer;
	};
}
