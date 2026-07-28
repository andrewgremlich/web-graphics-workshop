export function random(min: number, max: number, step = 1) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("min and max must be integers");
  }
  if (step <= 0) throw new Error("step must be positive");

  if (min > max) {
    [min, max] = [max, min];
  }

  const steps = Math.floor((max - min) / step);
  const i = Math.floor(Math.random() * (steps + 1));
  return min + i * step;
}
