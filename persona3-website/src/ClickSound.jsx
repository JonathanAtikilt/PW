import { useEffect } from "react";
import backgroundMusic from "./assets/color-your-night.mp4";
import { bootstrapBackgroundAudio } from "./backgroundAudio";
import {
  isFeatureTarget,
  isTransitionKey,
  playClickSound,
  primeClickAudio,
} from "./clickAudio";

export default function ClickSound() {
  useEffect(() => {
    const unlockAudio = () => bootstrapBackgroundAudio(backgroundMusic);

    primeClickAudio().then(unlockAudio);
    const retry = window.setTimeout(() => {
      primeClickAudio().then(unlockAudio);
    }, 300);

    const onPointerDown = (e) => {
      if (isFeatureTarget(e.target)) playClickSound();
    };

    const onKeyDown = (e) => {
      if (e.repeat) return;
      if (isTransitionKey(e.key)) playClickSound();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.clearTimeout(retry);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
