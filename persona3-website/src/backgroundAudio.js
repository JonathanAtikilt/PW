const AUDIO_KEY = "pw-bg-audio";

export function unmuteVideo(video) {
  if (!video) return Promise.resolve();
  video.muted = false;
  video.volume = 1;
  return video.play().catch(() => {});
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
  return Promise.resolve();
}

export function tryStartAudioOnHome(video) {
  if (!video) return;
  const onHome =
    window.location.pathname === "/" || window.location.pathname === "";
  if (!onHome) return;

  enableBackgroundAudio();

  // Works when the visitor just clicked a link/bookmark to open the site (same-tab navigation).
  if (navigator.userActivation?.isActive) {
    enableBackgroundAudio();
  }
}
