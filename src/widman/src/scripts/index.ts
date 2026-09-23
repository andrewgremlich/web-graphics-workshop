import "../style/styles.css";

import "./canvas.ts";
import { getCtx, updateCanvasCtx } from "./canvas.ts";

updateCanvasCtx();

const ctx = getCtx();

// Widmanstätten pattern
// https://nnix.com/projects/meteorite/
// https://github.com/davidemerson/widmanstatten/blob/main/meteorite.py
// https://grady.dev/projects/widmanst%C3%A4tten/

function generatePointsAlongControlLine() {
	const [beginning, ending] = [
		{ x: 10, y: 10 },
		{ x: 100, y: 200 },
	];
	const angleOfControlLine = Math.atan2(
		ending.y - beginning.y,
		ending.x - beginning.x,
	);

	console.log(angleOfControlLine);

	const path2D = new Path2D(); // Path2D can be daisy chained

	path2D.moveTo(beginning.x, beginning.y);
	path2D.lineTo(ending.x, ending.y);
	// angle of control line.
	// new points along distance formula.
	// loop once on positive perpendicular point then negative.

	return path2D;
}

const line = generatePointsAlongControlLine();

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "hsl(233 8% 47%)";

ctx.beginPath();
ctx.stroke(line);
