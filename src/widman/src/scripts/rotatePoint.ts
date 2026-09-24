export function rotatePoint(
	point: { x: number; y: number },
	angleRadians: number,
	pivot = { x: 0, y: 0 },
) {
	const dx = point.x - pivot.x;
	const dy = point.y - pivot.y;
	const cos = Math.cos(angleRadians);
	const sin = Math.sin(angleRadians);

	return {
		x: pivot.x + dx * cos - dy * sin,
		y: pivot.y + dx * sin + dy * cos,
	};
}
