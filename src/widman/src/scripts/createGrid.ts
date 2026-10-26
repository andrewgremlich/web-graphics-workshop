import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_ASPECT_RATIO } from "./canvas";

// I wonder if this can be done any other way...
function findGridSize(groupings: number) {
  let bestColumnSize = 1;
  let bestRowSize = groupings;
  let bestDifference = Infinity;

  for (let cols = 1; cols <= groupings; cols++) {
    if (groupings % cols !== 0) continue;
    const rows = groupings / cols;
    const gridAspectRatio = cols / rows;
    const difference = Math.abs(
      Math.log(gridAspectRatio / CANVAS_ASPECT_RATIO),
    );

    if (difference < bestDifference) {
      bestDifference = difference;
      bestColumnSize = cols;
      bestRowSize = rows;
    }
  }

  return { bestColumnSize, bestRowSize };
}

export function createGrid({ groupings }: { groupings: number }) {
  const { bestColumnSize, bestRowSize } = findGridSize(groupings);
  const regionWidth = CANVAS_WIDTH / bestColumnSize;
  const regionHeight = CANVAS_HEIGHT / bestRowSize;
  const coordinates = [];

  for (let row = 0; row < bestRowSize; row++) {
    for (let col = 0; col < bestColumnSize; col++) {
      coordinates.push({
        x: Math.round((col + 0.5) * regionWidth),
        y: Math.round((row + 0.5) * regionHeight),
      });
    }
  }

  return coordinates;
}
