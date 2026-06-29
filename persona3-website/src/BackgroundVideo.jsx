import { useEffect, useRef } from "react";
import backgroundVideo from "./assets/main1.mp4";
import backgroundMusic from "./assets/color-your-night.mp4";
import {
  bootstrapBackgroundAudio,
  getOrCreateBackgroundAudio,
  playBackgroundAudio,
} from "./backgroundAudio";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const audio = getOrCreateBackgroundAudio(backgroundMusic);
    bootstrapBackgroundAudio(backgroundMusic);

    const onReady = () => playBackgroundAudio(audio);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("canplaythrough", onReady);

    return () => {
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("canplaythrough", onReady);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="app-bg-video"
      src={backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
