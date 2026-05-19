import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import backgroundVideo from "./assets/main1.mp4";
import {
  enableBackgroundAudio,
  syncBackgroundAudio,
  tryStartAudioOnHome,
} from "./backgroundAudio";

export default function BackgroundVideo() {
  const ref = useRef(null);
  const location = useLocation();
  const unlockedRef = useRef(false);

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    enableBackgroundAudio();
  }, []);

  useEffect(() => {
    syncBackgroundAudio(ref.current);
  }, []);

  // Attempt audio as soon as the home page loads.
  useEffect(() => {
    if (location.pathname !== "/") return;

    const video = ref.current;
    if (!video) return;

    tryStartAudioOnHome(video);

    const onReady = () => tryStartAudioOnHome(video);
    video.addEventListener("loadeddata", onReady);
    const retry = window.setTimeout(() => tryStartAudioOnHome(video), 400);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      window.clearTimeout(retry);
    };
  }, [location.pathname]);

  // Browsers often block sound until the visitor interacts; any first tap/click/key unlocks it.
  useEffect(() => {
    const opts = { capture: true, once: true };
    document.addEventListener("pointerdown", unlockAudio, opts);
    document.addEventListener("keydown", unlockAudio, opts);
    return () => {
      document.removeEventListener("pointerdown", unlockAudio, opts);
      document.removeEventListener("keydown", unlockAudio, opts);
    };
  }, [unlockAudio]);

  return (
    <video
      ref={ref}
      className="app-bg-video"
      src={backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
