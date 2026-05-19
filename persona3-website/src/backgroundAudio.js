const AUDIO_KEY = "pw-bg-audio";

export function unmuteVideo(video) {
  if (!video) return Promise.resolve(false);
  video.muted = false;
  video.volume = 1;
  return video
    .play()
    .then(() => true)
    .catch(() => false);
}

export function enableBackgroundAudio() {
  sessionStorage.setItem(AUDIO_KEY, "1");
  return Promise.all(
    [...document.querySelectorAll("video.app-bg-video")].map(unmuteVideo),
  );
}

export function syncBackgroundAudio(video) {
  if (sessionStorage.getItem(AUDIO_KEY) === "1") {
    return unmuteVideo(video);
  }
  return Promise.resolve(false);
}

/** Try to start background music as soon as the page loads. */
export async function startBackgroundAudioOnLoad(video) {
  if (!video) return false;

  const tryUnmuted = async () => {
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      sessionStorage.setItem(AUDIO_KEY, "1");
      return true;
    } catch {
      return false;
    }
  };

  if (await tryUnmuted()) return true;

  // Muted autoplay first, then unmute (works in some browsers).
  video.muted = true;
  try {
    await video.play();
    video.muted = false;
    video.volume = 1;
    await video.play();
    sessionStorage.setItem(AUDIO_KEY, "1");
    return true;
  } catch {
    video.muted = true;
    return false;
  }
}
