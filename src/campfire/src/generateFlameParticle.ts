import { random } from "./utils.ts";

const flameParticleParent = document.querySelector("#flame-particle-parent");

export function generateFlameParticle() {
	// TODO: object pool for flame particles?
	const flameParticle = document.createElement("div");
	const DURATION = random(1000, 3000);
	const LEFT = random(40, 55);
	const PARTICLE_DISTANCE = random(-500, -400);

	flameParticle.classList.add("flame-particle");
	flameParticle.style.setProperty("--animation-duration", DURATION + "ms");
	flameParticle.style.setProperty("--left-position", LEFT + "%");
	flameParticle.style.setProperty(
		"--flame-particle-distance",
		PARTICLE_DISTANCE + "px",
	);

	flameParticleParent?.append(flameParticle);

	setTimeout(() => {
		flameParticle.remove();
	}, DURATION);
}
