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
  const local = new Path2D();
  local.roundRect(0, -width / 2, length, width, width / 4);

  const path = new Path2D();
  path.addPath(
    local,
    new DOMMatrix([
      direction.x,
      direction.y,
      -direction.y,
      direction.x,
      start.x,
      start.y,
    ]),
  );
  return path;
}
