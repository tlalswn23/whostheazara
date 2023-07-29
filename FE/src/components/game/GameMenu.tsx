import { useState } from "react";
import gameMenuCameraOn from "../../assets/img/game/gameMenuCameraOn.png";
import gameMenuMicOn from "../../assets/img/game/gameMenuMicOn.png";
import gameMenuInfo from "../../assets/img/game/gameMenuInfo.png";
import gameMenuSpeakerOn from "../../assets/img/game/gameMenuSpeakerOn.png";
import gameMenuSpeakerOff from "../../assets/img/game/gameMenuSpeakerOff.png";
import gameMenuMicOff from "../../assets/img/game/gameMenuMicOff.png";
import gameMenuCameraOff from "../../assets/img/game/gameMenuCameraOff.png";

interface GameMenuProps {
  onSetInfoOn: () => void;
}

export const GameMenu = ({ onSetInfoOn }: GameMenuProps) => {
  const [soundOn, setSoundOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  return (
    <div className="absolute right-[20px] h-full flex items-center">
      <div className="flex flex-col justify-around h-[44%]">
        <img className="w-[64px] h-[64px] cursor-pointer" src={gameMenuInfo} onClick={() => onSetInfoOn()} />
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
