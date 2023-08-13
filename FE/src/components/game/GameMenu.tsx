import { useState, useEffect } from "react";
import gameMenuCameraOn from "../../assets/img/game/gameMenuCameraOn.png";
import gameMenuMicOn from "../../assets/img/game/gameMenuMicOn.png";
import gameMenuInfo from "../../assets/img/game/gameMenuInfo.png";
import gameMenuSpeakerOn from "../../assets/img/game/gameMenuSpeakerOn.png";
import gameMenuSpeakerOff from "../../assets/img/game/gameMenuSpeakerOff.png";
import gameMenuMicOff from "../../assets/img/game/gameMenuMicOff.png";
import gameMenuCameraOff from "../../assets/img/game/gameMenuCameraOff.png";
import { BGM, createBGMInstance } from "../../utils/audioManager";

interface GameMenuProps {
  onSetInfoOn: () => void;
  setMyCamera: (cameraOn: boolean) => void;
  setMyMic: (micOn: boolean) => void;
  setGameAudio: (soundOn: boolean) => void;
  setUserVideo: (videoOn: boolean) => void;
  setUserAudio: (videoOn: boolean) => void;
  setAmIVoted: (amIVoted: boolean) => void;
  nowTime: string;
  amIDead: boolean;
  amIZara: boolean;
  amIVoted: boolean;
}

export const GameMenu = ({ 
  onSetInfoOn, 
  setMyCamera, 
  setMyMic, 
  setGameAudio, 
  setUserVideo, 
  setUserAudio,
  setAmIVoted, 
  nowTime, 
  amIDead, 
  amIZara, 
  amIVoted 
}: GameMenuProps) => {
  const [soundOn, setSoundOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const canIChangeSetting = (): boolean => {
    switch (nowTime) {
      case "DAY":
      case "VOTE":
        if (amIDead) {
          return false;
        }
        return true;
      case "VOTE_RESULT":
        if (amIVoted) {
          return true;
        }
        return false;
      case "NIGHT":
      case "NIGHT_RESULT":
        if (amIDead) {
          return false;
        } 
        if (amIZara) {
          return true;
        } 
        return false;
      default:
        console.error("unknown data - nowTime: ", nowTime);
        break;
    }
    return true;
  }

  const onClickSoundOn = () => {    
    if (!canIChangeSetting) {
      setGameAudio(!soundOn);
      setSoundOn(!soundOn);
      return;
    }
    setGameAudio(!soundOn);
    setUserAudio(!soundOn);
    setSoundOn(!soundOn);
  }

  const onClickCameraOn = () => {
    if (!canIChangeSetting) {
      return;
    }
    setMyMic(!micOn);
    setMicOn(!micOn);
  }

  const onClickMicOn = () => {
    if (!canIChangeSetting) {
      return;
    }
    setMyCamera(!cameraOn);
    setCameraOn(!cameraOn);
  }

  const setMyCameraMicOn = (cameraMicOn: boolean) => {
    setMyCamera(cameraMicOn);
    setCameraOn(cameraMicOn);
    setMyMic(cameraMicOn);
    setMicOn(cameraMicOn);
  }

  useEffect(() => {    
    let bgm: HTMLAudioElement;
    switch (nowTime) {
      case "DAY":
      case "VOTE":
        bgm = createBGMInstance(BGM.DAY);
        setAmIVoted(false);
        setUserVideo(true);
        setUserAudio(soundOn);
        if (amIDead) {
          setMyCameraMicOn(false);
          break;
        }
        setMyCameraMicOn(true);    
        break;
      case "VOTE_RESULT":
        bgm = createBGMInstance(BGM.RESULT);
        setUserVideo(true);
        setUserAudio(soundOn);
        if (amIVoted) {
          setMyCameraMicOn(true);
          break;
        }
        setMyCameraMicOn(false);    
        break;
      case "NIGHT":
      case "NIGHT_RESULT":
        bgm = createBGMInstance(BGM.NIGHT);
        if (amIDead) {
          setUserVideo(true);
          setUserAudio(soundOn);
          setMyCameraMicOn(false);
          break;
        } 
        if (amIZara) {
          setUserVideo(true);
          setUserAudio(soundOn);
          setMyCameraMicOn(true);
          break;
        }
        setUserVideo(false);
        setUserAudio(false);    
        setMyCameraMicOn(false);
        break;
      default:
        break;
    }

    return () => {
      if (bgm) {
        bgm.pause();
        bgm.src = "";
      }
    };
  }, [nowTime])

  return (
    <div className="absolute right-[20px] h-full flex items-center">
      <div className="flex flex-col justify-around h-[44%]">
        <img className="w-[64px] h-[64px] cursor-pointer" src={gameMenuInfo} onClick={() => onSetInfoOn()} />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={soundOn ? gameMenuSpeakerOn : gameMenuSpeakerOff}
          onClick={onClickSoundOn}
        />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={micOn ? gameMenuMicOn : gameMenuMicOff}
          onClick={onClickCameraOn}
        />
        <img
          className="w-[64px] h-[64px] cursor-pointer"
          src={cameraOn ? gameMenuCameraOn : gameMenuCameraOff}
          onClick={onClickMicOn}
        />
      </div>
    </div>
  );
};
