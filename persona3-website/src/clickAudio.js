import clickSrc from "./assets/click.m4a";

export const FEATURE_SELECTOR =
  ".p3-row, .sc-bar-outer, .sc-info-bar-wrap, .resume-card-wrap, .p3-page-back-bar, .p3-screen-backdrop, .resume-detail-row-link, .experience-lab-link";

const TRANSITION_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "Escape",
  "Backspace",
]);

const POOL_SIZE = 8;
const pool = Array.from({ length: POOL_SIZE }, () => {
  const audio = new Audio(clickSrc);
  audio.preload = "auto";
  return audio;
});
let poolIndex = 0;

export function isFeatureTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(FEATURE_SELECTOR));
}

export function isTransitionKey(key) {
  return TRANSITION_KEYS.has(key);
}

export function playClickSound() {
  const audio = pool[poolIndex];
  poolIndex = (poolIndex + 1) % POOL_SIZE;
  audio.currentTime = 0;
  audio.volume = 0.55;
  audio.play().catch(() => {});
}

/** Prime the audio pool on load so UI sounds work without an extra click first. */
export function primeClickAudio() {
  const audio = pool[0];
  const volume = audio.volume;
  audio.volume = 0.001;
  audio.currentTime = 0;
  return audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = volume;
    })
    .catch(() => {});
}
