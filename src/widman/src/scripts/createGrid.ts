import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./canvas";

// I wonder if this can be done any other way...
function findGridSize(divisions: number) {
  const aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
  let bestColumnSize = 1;
  let bestRowSize = divisions;
  let bestDifference = Infinity;

  for (let cols = 1; cols <= divisions; cols++) {
    if (divisions % cols !== 0) continue;

    const rows = divisions / cols;
    const gridAspectRatio = cols / rows;
    const difference = Math.abs(Math.log(gridAspectRatio / aspectRatio));

    if (difference < bestDifference) {
      bestDifference = difference;
      bestColumnSize = cols;
      bestRowSize = rows;
    }
  }

  return { bestColumnSize, bestRowSize };
}

export function createGrid(divisions: number) {
  const { bestColumnSize, bestRowSize } = findGridSize(divisions);
  const regionWidth = CANVAS_WIDTH / bestColumnSize;
  const regionHeight = CANVAS_HEIGHT / bestRowSize;
  const coordinates = [];

  for (let row = 0; row < bestRowSize; row++) {
    for (let col = 0; col < bestColumnSize; col++) {
      coordinates.push({
        x: col * regionWidth + 10,
        y: row * regionHeight + 10,
      });
    }
  }

  return coordinates;
}
