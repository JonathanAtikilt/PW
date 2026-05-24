const AUDIO_KEY = "pw-bg-audio";

function getBackgroundAudioElements() {
  return [...document.querySelectorAll("audio.app-bg-audio")];
}

export function playBackgroundAudio(audio) {
  if (!audio) return Promise.resolve(false);
  audio.volume = 1;
  audio.loop = true;
  return audio
    .play()
    .then(() => true)
    .catch(() => false);
}

export function enableBackgroundAudio() {
  sessionStorage.setItem(AUDIO_KEY, "1");
  return Promise.all(getBackgroundAudioElements().map(playBackgroundAudio));
}

export function syncBackgroundAudio(audio) {
  if (sessionStorage.getItem(AUDIO_KEY) === "1") {
    return playBackgroundAudio(audio);
  }
  return Promise.resolve(false);
}

/** Try to start background music as soon as the page loads. */
export async function startBackgroundAudioOnLoad(audio) {
  if (!audio) return false;

  try {
    await audio.play();
    sessionStorage.setItem(AUDIO_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
