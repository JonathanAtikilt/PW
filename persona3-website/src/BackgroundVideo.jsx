import { useCallback, useEffect, useRef } from "react";
import backgroundVideo from "./assets/main1.mp4";
import backgroundMusic from "./assets/color-your-night.mp4";
import {
  enableBackgroundAudio,
  playBackgroundAudio,
} from "./backgroundAudio";

export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const attemptStart = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && !audio.muted) return;

    if (!audio.paused && audio.muted) {
      audio.muted = false;
      return;
    }

    await playBackgroundAudio(audio);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    video.muted = true;
    video.play().catch(() => {});

    attemptStart();

    const onReady = () => attemptStart();
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("canplaythrough", onReady);

    const retryTimers = [0, 100, 300, 800, 2000].map((ms) =>
      window.setTimeout(() => attemptStart(), ms),
    );

    const onInteract = () => {
      enableBackgroundAudio();
    };
    document.addEventListener("pointerdown", onInteract, { capture: true, once: true });
    document.addEventListener("keydown", onInteract, { capture: true, once: true });
    document.addEventListener("touchstart", onInteract, { capture: true, once: true });

    return () => {
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("canplaythrough", onReady);
      retryTimers.forEach((id) => window.clearTimeout(id));
      document.removeEventListener("pointerdown", onInteract, { capture: true });
      document.removeEventListener("keydown", onInteract, { capture: true });
      document.removeEventListener("touchstart", onInteract, { capture: true });
    };
  }, [attemptStart]);

  return (
    <>
      <video
        ref={videoRef}
        className="app-bg-video"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <audio
        ref={audioRef}
        className="app-bg-audio"
        src={backgroundMusic}
        loop
        preload="auto"
        autoPlay
        muted
        playsInline
      />
    </>
  );
}
