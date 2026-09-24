import "../style/styles.css";

import "./canvas.ts";
import { getCtx, updateCanvasCtx } from "./canvas.ts";
import { generateSymmetricLeafPath } from "./generateSymmetricLeafPath.ts";

updateCanvasCtx();

const ctx = getCtx();

// Widmanstätten pattern
// https://nnix.com/projects/meteorite/
// https://github.com/davidemerson/widmanstatten/blob/main/meteorite.py
// https://grady.dev/projects/widmanst%C3%A4tten/

const line = generateSymmetricLeafPath({
	beginning: { x: 10, y: 50 },
	ending: { x: 500, y: 50 },
	rotationRadians: (Math.PI / 180) * 20,
	controlOffset: 10,
});

const line2 = generateSymmetricLeafPath({
	beginning: { x: 10, y: 200 },
	ending: { x: 450, y: 200 },
	rotationRadians: -(Math.PI / 180) * 20,
	controlOffset: 10,
});

ctx.lineWidth = 3;
ctx.lineCap = "round";
ctx.strokeStyle = "hsl(233 8% 47%)";
ctx.fillStyle = "hsl(233 8% 57%)";

ctx.beginPath();
ctx.stroke(line);
ctx.fill(line);

ctx.strokeStyle = "hsl(233 8% 37%)";
ctx.fillStyle = "hsl(233 8% 27%)";

ctx.beginPath();
ctx.stroke(line2);
ctx.fill(line2);
