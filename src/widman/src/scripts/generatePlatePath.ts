type Point = { x: number; y: number };

export function generatePlatePath({
  start,
  length,
  width,
  direction,
}: {
  start: Point;
  length: number;
  width: number;
  direction: Point;
}): Path2D {
  const matrix = new DOMMatrix();
  const local = new Path2D();
  const path = new Path2D();

  local.roundRect(0, -width / 2, length, width, width / 4);

  matrix.translateSelf(start.x, start.y);
  matrix.rotateSelf((Math.atan2(direction.y, direction.x) * 180) / Math.PI);

  path.addPath(local, matrix);

  return path;
}
