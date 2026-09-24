import { pointsOnBezierCurves } from "points-on-curve";
import { mirrorPointAcrossLine } from "./mirrorPointAcrossLine.ts";
import { rotatePoint } from "./rotatePoint.ts";

type Point = { x: number; y: number };
interface GenerateBezierPathOptions {
	beginning: Point;
	ending: Point;
	controlPoints?: Point[];
	rotationRadians?: number;
	mirror?: boolean;
}

function generateBezierPath({
	beginning,
	ending,
	controlPoints = [],
	rotationRadians = 0,
	mirror = false,
}: GenerateBezierPathOptions): Path2D {
	const points = pointsOnBezierCurves([
		[beginning.x, beginning.y],
		...controlPoints.map(({ x, y }): [number, number] => [x, y]),
		[ending.x, ending.y],
	]);

	const rotated = points.map(([x, y]) =>
		rotatePoint({ x, y }, rotationRadians, beginning),
	);

	const first = rotated[0];
	const last = rotated[rotated.length - 1];
	const path2D = new Path2D();

	path2D.moveTo(first.x, first.y);
	for (const { x, y } of rotated.slice(1)) {
		path2D.lineTo(x, y);
	}

	if (mirror) {
		for (let i = rotated.length - 2; i > 0; i--) {
			const { x, y } = mirrorPointAcrossLine(rotated[i], first, last);
			path2D.lineTo(x, y);
		}
	}

	return path2D;
}

export function generateSymmetricLeafPath({
	beginning,
	ending,
	controlOffset,
	rotationRadians = 0,
}: {
	beginning: Point;
	ending: Point;
	controlOffset: number;
	rotationRadians?: number;
}): Path2D {
	return generateBezierPath({
		beginning,
		ending,
		controlPoints: [
			{ x: beginning.x + controlOffset, y: beginning.y - controlOffset },
			{ x: ending.x - controlOffset, y: ending.y - controlOffset },
		],
		rotationRadians,
		mirror: true,
	});
}
