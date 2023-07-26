import { useState } from "react";
import gameMenuCameraOn from "../../assets/img/gameMenuCameraOn.png";
import gameMenuMicOn from "../../assets/img/gameMenuMicOn.png";
import gameMenuInfo from "../../assets/img/gameMenuInfo.png";
import gameMenuSpeakerOn from "../../assets/img/gameMenuSpeakerOn.png";
import gameMenuSpeakerOff from "../../assets/img/gameMenuSpeakerOff.png";
import gameMenuMicOff from "../../assets/img/gameMenuMicOff.png";
import gameMenuCameraOff from "../../assets/img/gameMenuCameraOff.png";

export const GameMenu = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  return (
    <div className="absolute right-[20px] h-full flex items-center">
      <div className="flex flex-col justify-around h-[44%]">
        <img className="w-[64px] h-[64px] cursor-pointer" src={gameMenuInfo} />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={soundOn ? gameMenuSpeakerOn : gameMenuSpeakerOff}
          onClick={() => setSoundOn(!soundOn)}
        />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={micOn ? gameMenuMicOn : gameMenuMicOff}
          onClick={() => setMicOn(!micOn)}
        />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={cameraOn ? gameMenuCameraOn : gameMenuCameraOff}
          onClick={() => setCameraOn(!cameraOn)}
        />
      </div>
    </div>
  );
};
