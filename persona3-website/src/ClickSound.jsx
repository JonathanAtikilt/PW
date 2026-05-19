import { useEffect } from "react";
import {
  isFeatureTarget,
  isTransitionKey,
  playClickSound,
} from "./clickAudio";

export default function ClickSound() {
  useEffect(() => {
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
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
