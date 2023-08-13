import { useEffect } from "react";
import { BGM_MAP, SFX_MAP } from "../constants/common/SoundMap";

export const BGM = BGM_MAP
export const SFX = SFX_MAP

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