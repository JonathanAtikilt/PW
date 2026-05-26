const AUDIO_KEY = "pw-bg-audio";

function getBackgroundAudioElements() {
  return [...document.querySelectorAll("audio.app-bg-audio")];
}

/** Play looped background music; uses muted autoplay when the browser blocks sound. */
export async function playBackgroundAudio(audio) {
  if (!audio) return false;

  audio.volume = 1;
  audio.loop = true;

  try {
    audio.muted = false;
    await audio.play();
    sessionStorage.setItem(AUDIO_KEY, "1");
    return true;
  } catch {
    try {
      audio.muted = true;
      await audio.play();
      audio.muted = false;
      sessionStorage.setItem(AUDIO_KEY, "1");
      return true;
    } catch {
      return false;
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

/** Try to start background music as soon as the page loads. */
export function startBackgroundAudioOnLoad(audio) {
  return playBackgroundAudio(audio);
}
