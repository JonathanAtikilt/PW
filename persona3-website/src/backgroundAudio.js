const AUDIO_KEY = "pw-bg-audio";
const RETRY_MS = [0, 50, 150, 300, 600, 1000, 2000, 4000, 8000];

let retryTimers = [];
let listenersAttached = false;

function getBackgroundAudioElements() {
  return [...document.querySelectorAll("audio.app-bg-audio")];
}

function isAudible(audio) {
  return Boolean(audio && !audio.paused && !audio.muted && audio.volume > 0);
}

/** Create or return the shared background music element. */
export function getOrCreateBackgroundAudio(src) {
  const existing = document.querySelector("audio.app-bg-audio");
  if (existing) return existing;
  if (!src) return null;

  const audio = document.createElement("audio");
  audio.className = "app-bg-audio";
  audio.src = src;
  audio.loop = true;
  audio.preload = "auto";
  audio.muted = true;
  audio.autoplay = true;
  audio.setAttribute("playsinline", "");
  document.body.appendChild(audio);
  audio.play().catch(() => {});
  return audio;
}

/** Play looped background music; prefers muted autoplay, then unmutes when allowed. */
export async function playBackgroundAudio(audio) {
  if (!audio) return false;

  audio.volume = 1;
  audio.loop = true;

  if (isAudible(audio)) {
    sessionStorage.setItem(AUDIO_KEY, "1");
    return true;
  }

  if (!audio.paused && audio.muted) {
    try {
      audio.muted = false;
      await audio.play();
      sessionStorage.setItem(AUDIO_KEY, "1");
      return true;
    } catch {
      audio.muted = true;
    }
  }

  try {
    audio.muted = true;
    await audio.play();
    audio.muted = false;
    await audio.play();
    sessionStorage.setItem(AUDIO_KEY, "1");
    return true;
  } catch {
    try {
      audio.muted = false;
      await audio.play();
      sessionStorage.setItem(AUDIO_KEY, "1");
      return true;
    } catch {
      try {
        audio.muted = true;
        await audio.play();
        sessionStorage.setItem(AUDIO_KEY, "1");
        return false;
      } catch {
        return false;
      }
    }
  }
}

export function enableBackgroundAudio() {
  return Promise.all(getBackgroundAudioElements().map(playBackgroundAudio));
}

export function syncBackgroundAudio(audio) {
  if (sessionStorage.getItem(AUDIO_KEY) === "1") {
    return playBackgroundAudio(audio);
  }
  return Promise.resolve(false);
}

function clearBackgroundAudioRetries() {
  retryTimers.forEach((id) => window.clearTimeout(id));
  retryTimers = [];
}

function attachBackgroundAudioListeners(src) {
  if (listenersAttached) return;
  listenersAttached = true;

  const retry = () => {
    const audio = getOrCreateBackgroundAudio(src);
    if (isAudible(audio)) return;
    playBackgroundAudio(audio);
  };

  const onVisible = () => {
    if (document.visibilityState === "visible") retry();
  };

  const onInteract = () => retry();

  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener("focus", retry);
  document.addEventListener("pointerdown", onInteract, { capture: true });
  document.addEventListener("keydown", onInteract, { capture: true });
  document.addEventListener("touchstart", onInteract, { capture: true, passive: true });
}

/** Start background music as early as possible and keep retrying until audible. */
export function bootstrapBackgroundAudio(src) {
  const audio = getOrCreateBackgroundAudio(src);
  if (!audio) return Promise.resolve(false);

  clearBackgroundAudioRetries();
  attachBackgroundAudioListeners(src);

  const attempt = () => {
    const current = getOrCreateBackgroundAudio(src);
    return playBackgroundAudio(current);
  };

  attempt();

  RETRY_MS.forEach((ms) => {
    retryTimers.push(window.setTimeout(attempt, ms));
  });

  return attempt();
}

/** @deprecated Use bootstrapBackgroundAudio */
export function startBackgroundAudioOnLoad(audio) {
  return playBackgroundAudio(audio);
}
