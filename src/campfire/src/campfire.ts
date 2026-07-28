import campfireAudio from "./campfire.mp3";

const play = document.querySelector("#play-sound");
const pause = document.querySelector("#pause-sound");

export function primeCampfireSound() {
  const audio = new Audio();
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const gain = ctx.createGain();

  source.connect(gain).connect(ctx.destination);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1);

  audio.crossOrigin = "anonymous";
  audio.src = campfireAudio;
  audio.loop = true;
  audio.addEventListener("error", (e) => console.log("audio error", e));

  let started = false;

  play?.addEventListener("pointerdown", () => {
    if (!started) {
      audio.play().catch((err) => console.log(err));
    }

    started = true;
  });

  pause?.addEventListener("pointerdown", () => {
    if (started) {
      audio.pause();
    }

    started = false;
  });
}
