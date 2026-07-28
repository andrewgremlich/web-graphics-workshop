import "./styles.css";
import "./icons.ts";

import { animateFlame } from "./animateFlame.ts";
import { primeCampfireSound } from "./campfire.ts";
import { generateFlameParticle } from "./generateFlameParticle.ts";
import { random } from "./utils.ts";

const flames = document.querySelectorAll(".flame");
const ACTIVATE_MOTION = window.matchMedia(
  "(prefers-reduced-motion: no-preference)",
).matches;

primeCampfireSound();

if (ACTIVATE_MOTION) {
  setInterval(() => {
    generateFlameParticle();
  }, 300);

  flames.forEach((flame) => {
    function cycle() {
      animateFlame((flame as HTMLDivElement), random(800, 1000));
    }

    flame.addEventListener("animationend", cycle);

    cycle();
  });
}
