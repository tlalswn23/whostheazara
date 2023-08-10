import { useEffect, useRef } from "react";

export const playBGM = (src: string) => {
  useEffect(() => {
    const bgm = new Audio(src);

    bgm.autoplay = true;
    bgm.loop = true;

    bgm.play().catch(error => {
      console.error("BGM play failed:", error);
    });

    return () => {
      bgm.pause();
      bgm.src = '';
    }
  }, []);
}

export const playSFX = (src: string) => {
  const sfx = new Audio(src);

  sfx.play().catch(error => {
    console.error("SFX play failed:", error);
  });
}