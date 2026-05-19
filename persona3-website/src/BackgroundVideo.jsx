import { useCallback, useEffect, useRef } from "react";
import backgroundVideo from "./assets/main1.mp4";
import {
  enableBackgroundAudio,
  startBackgroundAudioOnLoad,
  syncBackgroundAudio,
} from "./backgroundAudio";

export default function BackgroundVideo() {
  const ref = useRef(null);

  const attemptStart = useCallback(async () => {
    const video = ref.current;
    if (!video) return;

    if (sessionStorage.getItem("pw-bg-audio") === "1") {
      await syncBackgroundAudio(video);
      return;
    }

    await startBackgroundAudioOnLoad(video);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    attemptStart();

    const onReady = () => attemptStart();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const retryTimers = [150, 500, 1200].map((ms) =>
      window.setTimeout(() => attemptStart(), ms),
    );

    // Fallback if the browser still blocks autoplay with sound.
    const onInteract = () => {
      enableBackgroundAudio();
    };
    document.addEventListener("pointerdown", onInteract, { capture: true, once: true });
    document.addEventListener("keydown", onInteract, { capture: true, once: true });

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      retryTimers.forEach((id) => window.clearTimeout(id));
      document.removeEventListener("pointerdown", onInteract, { capture: true });
      document.removeEventListener("keydown", onInteract, { capture: true });
    };
  }, [attemptStart]);

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
