export function mirrorPointAcrossLine(
	point: { x: number; y: number },
	lineStart: { x: number; y: number },
	lineEnd: { x: number; y: number },
) {
	const lineX = lineEnd.x - lineStart.x;
	const lineY = lineEnd.y - lineStart.y;
	const lineLengthSquared = lineX ** 2 + lineY ** 2;

	if (lineLengthSquared === 0) {
		throw new Error("mirrorPointAcrossLine: lineStart and lineEnd must differ");
	}

	const pointX = point.x - lineStart.x;
	const pointY = point.y - lineStart.y;
	const t = (pointX * lineX + pointY * lineY) / lineLengthSquared;

	return {
		x: 2 * (lineStart.x + t * lineX) - point.x,
		y: 2 * (lineStart.y + t * lineY) - point.y,
	};
}