import { random } from "./utils.ts";

export function animateFlame(flame: HTMLDivElement, duration: number) {
  // carry forward the last "end" as the new "start" — no snap
  const prevX = flame.style.getPropertyValue("--flame-from-x-end") || "45%";
  const prevY = flame.style.getPropertyValue("--flame-from-y-end") || "0%";
  const prevControlCurveY1 =
    flame.style.getPropertyValue("--curve-to-control-y-1-end") || "42%";
  const prevPositionCurveX1 =
    flame.style.getPropertyValue("--curve-to-position-x-1-end") || "75%";

  flame.style.setProperty("--flame-from-x-start", prevX);
  flame.style.setProperty("--flame-from-y-start", prevY);
  flame.style.setProperty("--curve-to-control-y-1-start", prevControlCurveY1);
  flame.style.setProperty("--curve-to-position-x-1-start", prevPositionCurveX1);

  flame.style.setProperty("--flame-from-x-end", `${random(20, 50)}%`);
  flame.style.setProperty("--flame-from-y-end", `${random(0, 20)}%`);
  flame.style.setProperty("--curve-to-control-y-1-end", `${random(40, 50)}%`);
  flame.style.setProperty("--curve-to-position-x-1-end", `${random(70, 80)}%`);
  flame.style.setProperty("--animation-duration", `${duration}ms`);

  flame.style.animation = "none";
  void flame.offsetWidth;
  flame.style.animation = `flame-flicker ${duration}ms ease-in-out`;
}
