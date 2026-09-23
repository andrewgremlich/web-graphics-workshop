import "../style/styles.css";

import "./canvas.ts";
import { pointsOnBezierCurves } from "points-on-curve";
import { getCtx, updateCanvasCtx } from "./canvas.ts";

updateCanvasCtx();

const ctx = getCtx();

// Widmanstätten pattern
// https://nnix.com/projects/meteorite/
// https://github.com/davidemerson/widmanstatten/blob/main/meteorite.py
// https://grady.dev/projects/widmanst%C3%A4tten/

function rotatePoint(
	point: { x: number; y: number },
	angleRadians: number,
	pivot = { x: 0, y: 0 },
) {
	const dx = point.x - pivot.x;
	const dy = point.y - pivot.y;

	const radius = Math.hypot(point.x, point.y);
	const angleFromPivot = Math.atan2(dy, dx);

	return {
		x: Math.cos(angleFromPivot + angleRadians) * radius,
		y: Math.sin(angleFromPivot + angleRadians) * radius,
	};
}

function debugPoint(point: { x: number; y: number }) {
	ctx.beginPath();
	ctx.fillStyle = "#FF0000";
	ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
	ctx.fill();
}

function generatePointsAlongControlLine() {
	const [beginning, ending] = [
		{ x: 10, y: 10 },
		{ x: 100, y: 200 },
	];
	const points = pointsOnBezierCurves([
		[beginning.x, beginning.y],
		[20, 10],
		[110, 200],
		[ending.x, ending.y],
	]);

	const rotateDeg = (Math.PI / 180) * 10;
	const newPoint = rotatePoint({ x: beginning.x, y: beginning.y }, rotateDeg);

	debugPoint(newPoint);
	debugPoint(rotatePoint({ x: ending.x, y: ending.y }, rotateDeg));

	const angleOfControlLine = Math.atan2(
		ending.y - beginning.y,
		ending.x - beginning.x,
	);

	const path2D = new Path2D(); // Path2D can be daisy chained

	// for (let i = 0; i < points.length; i++) {
	// 	const currentPoint = points[i];
	// 	const nextPoint = points[i + 1];

	// 	if (!nextPoint) {
	// 		continue;
	// 	}

	// 	path2D.moveTo(currentPoint[0], currentPoint[1]);
	// 	path2D.lineTo(nextPoint[0], nextPoint[1]);
	// }

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
