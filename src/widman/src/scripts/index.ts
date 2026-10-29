import "../style/styles.css";
import { arrayToShuffled } from "array-shuffle";
import random from "random";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  getCtx,
  updateCanvasCtx,
} from "./canvas.ts";
import { createGrid } from "./createGrid.ts";
import { generatePlatePath } from "./generatePlatePath.ts";

const ctx = getCtx();

const baseColor = "#6f7070";
const randomAngleStart = random.int(35, 40);
const angles = [
  randomAngleStart,
  randomAngleStart + 60,
  randomAngleStart + 60 * 2,
].map((degrees) => (degrees * Math.PI) / 180);

function drawPattern() {
  updateCanvasCtx();
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (const position of arrayToShuffled(createGrid({ groupings: 90 }))) {
    const angle = angles[random.int(0, angles.length - 1)]; // sample an angle
    const vector = { x: Math.cos(angle), y: Math.sin(angle) }; // a start position or a vector
    const normal = { x: -vector.y, y: vector.x }; // perpendicular to vector
    const length = random.float(780, 1100); // random length
    const width = 10; // fixed to 10 for pattern consistency.
    const spacing = width * random.float(1.25, 1.8); // as an illusion so that there's a space between strokes.
    const count = random.int(4, 8); // random how many in a grouping?
    const center = {
      x: position.x + random.float(-40, 40),
      y: position.y + random.float(-40, 40),
    }; // randomly around position
    const brightness = 52 + Math.cos(angle * 2 - 0.8) * 6; // depending on angle, make a consistent brightness.

    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spacing; // how much to offset a stroke from original point.
      const plateLength = length * random.float(0.75, 1.15); // or magnitude.
      const start = {
        x: center.x + normal.x * offset - (vector.x * plateLength) / 2,
        y: center.y + normal.y * offset - (vector.y * plateLength) / 2,
      }; // position stroke start side by side rather than along the length.
      const end = {
        x: start.x + vector.x * plateLength,
        y: start.y + vector.y * plateLength,
      }; // position the end based on start.
      const plate = generatePlatePath({
        start,
        length: plateLength,
        width: width * 1.5,
        direction: vector,
      }); // generate plate based on rounded rect.
      const lightness = brightness + random.float(-3, 3); // variable difference from original brightness.
      ctx.fillStyle = `hsl(210 4% ${lightness}%)`;
      ctx.fill(plate);
      ctx.strokeStyle = "rgba(24, 28, 30, 0.25)";
      ctx.lineWidth = 0.5;
      ctx.stroke(plate);

      ctx.save();
      ctx.clip(plate);

      for (let band = -width; band <= width; band += random.float(1.2, 2.8)) {
        ctx.beginPath();
        ctx.moveTo(start.x + normal.x * band, start.y + normal.y * band);
        ctx.lineTo(end.x + normal.x * band, end.y + normal.y * band);
        ctx.strokeStyle = random.bool()
          ? "rgba(20, 25, 28, 0.09)"
          : "rgba(240, 243, 239, 0.09)";
        ctx.lineWidth = random.float(0.3, 0.8);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // A restrained grain softens the otherwise perfectly smooth canvas surface.
  for (let i = 0; i < 32000; i++) {
    ctx.fillStyle = i % 2 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.045)";
    ctx.fillRect(
      random.float(0, CANVAS_WIDTH),
      random.float(0, CANVAS_HEIGHT),
      0.7,
      0.7,
    );
  }
}

drawPattern();
