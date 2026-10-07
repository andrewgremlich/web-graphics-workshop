import "../style/styles.css";
import "./canvas.ts";

import random from "random";

import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	getCtx,
	updateCanvasCtx,
} from "./canvas.ts";
import { generateSymmetricLeafPath } from "./generateSymmetricLeafPath.ts";
import { createGrid } from "./createGrid.ts";
import { arrayToShuffled } from "array-shuffle";

updateCanvasCtx();

const ctx = getCtx();

ctx.fillStyle = "hsl(233 8% 47%)";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.fill();

// Widmanstätten pattern
// https://nnix.com/projects/meteorite/
// https://github.com/davidemerson/widmanstatten/blob/main/meteorite.py
// https://grady.dev/projects/widmanst%C3%A4tten/

const groupings = 90;

const groupPositions = arrayToShuffled(createGrid(groupings));

groupPositions.forEach((val, iter) => {
	const xPosition = groupPositions[iter].x;
	const yPosition = groupPositions[iter].y;

	const degIter = random.int(0, 3);
	const forwards = random.bool();
	const lengthOfStroke = random.int(600, 1000);
	const controlOffset = random.int(4, 10);
	const streakGrouping = random.int(4, 7);
	const colorShadingStroke = random.int(45, 47);
	const colorShadingFill = random.int(47, 57);

	for (let i = 0; i <= streakGrouping; i++) {
		const groupingOffset = controlOffset * 2 * i;

		const line = generateSymmetricLeafPath({
			beginning: { x: xPosition, y: yPosition + groupingOffset },
			ending: {
				x: xPosition + (forwards ? lengthOfStroke : -lengthOfStroke),
				y: yPosition + groupingOffset,
			},
			rotationRadians: degIter * 60,
			controlOffset,
		});

		ctx.lineWidth = random.int(2, 5);
		ctx.lineCap = "round";
		ctx.strokeStyle = `hsl(233 8% ${colorShadingStroke}%)`;
		ctx.fillStyle = `hsl(233 8% ${colorShadingFill}%)`;

		ctx.beginPath();
		ctx.stroke(line);
		ctx.fill(line);
	}
});
