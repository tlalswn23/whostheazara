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
      case "DAY": // 낮일때, 죽은 사람 제외 모두 카메라 켜기 가능
      case "VOTE":
        if (amIDead) {
          return false;
        }
        return true;
      case "VOTE_RESULT": // 투표 결과 나올 때 투표당한 사람만 카메라 켜기 가능
        if (amIVoted) {
          return true;
        }
        return false;
      case "NIGHT": // 밤에 자라만 카메라 켜기 가능
        if (amIDead) {
          return false;
        } 
        if (amIZara) {
          return true;
        } 
        return false;
      case "NIGHT_RESULT":  // 밤 결과 나올 때 모두 카메라 끄기        
        return false;
      default:
        console.error("unknown data - nowTime: ", nowTime);
        break;
    }
    return true;
  }

  const onClickSoundOn = () => {    
    if (!canIChangeSetting()) {
      setGameAudio(!soundOn);
      setSoundOn(!soundOn);
      return;
    }
    setGameAudio(!soundOn);
    setUserAudio(!soundOn);
    setSoundOn(!soundOn);
  }

  const onClickCameraOn = () => {
    if (!canIChangeSetting()) {
      return;
    }
    setMyMic(!micOn);
    setMicOn(!micOn);
  }

  const onClickMicOn = () => {
    if (!canIChangeSetting()) {
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
    console.log("NOWTIMETEST nowtime: ", nowTime);
    console.log("NOWTIMETEST canIChange: ", canIChangeSetting());
    console.log("NOWTIMETEST amIZara: ", amIZara);
    console.log("NOWTIMETEST amIDead: ", amIDead);
    console.log("NOWTIMETEST amIVoted: ", amIVoted);
    let bgm: HTMLAudioElement;
    switch (nowTime) {
      case "DAY": // 낮
      case "VOTE":
        bgm = createBGMInstance(BGM.DAY);
        setAmIVoted(false); // 투표 결과 리셋
        setUserVideo(true); // 다른 유저 영상 보이게 하기
        setUserAudio(soundOn);  // 유저 사운드는 현재 사운드 설정에 맞추기
        if (amIDead) {
          setMyCameraMicOn(false);  // 죽었으면 카메라 마이크 끄기
          break;
        }
        setMyCameraMicOn(true); // 살았으면 카메라 마이크 켜기
        break;
      case "VOTE_RESULT": // 투표 결과 나올 때
        bgm = createBGMInstance(BGM.RESULT);
        setUserVideo(true); // 다른 유저 영상 보이게 하기
        setUserAudio(soundOn);  // 유저 사운드는 현재 사운드 설정에 맞추기
        if (amIVoted) {
          setMyCameraMicOn(true); // 투표 당한 사람만 카메라 마이크 켜기
          break;
        }
        setMyCameraMicOn(false);  // 투표 안당한 사람은 카메라 마이크 끄기
        break;
      case "NIGHT": // 밤
        bgm = createBGMInstance(BGM.NIGHT);
        if (amIDead) {  // 죽었으면
          setUserVideo(true); // 다른 사람 영상 볼 수 있음
          setUserAudio(soundOn);  // 소리도 들을 수 있음
          setMyCameraMicOn(false);  // 내 카메라 마이크 끄기
          break;
        } 
        if (amIZara) {  // 내가 자라이면
          setUserVideo(true); // 다른 사람 영상 볼 수 있음
          setUserAudio(soundOn);  // 소리도 들을 수 있음
          setMyCameraMicOn(true); // 내 카메라 마이크 켜기
          break;
        }
        // 자라가 아니면 내 카메라 마이크 끄고 다른사람 영상 소리 못 보고 들음
        setUserVideo(false);  
        setUserAudio(false);    
        setMyCameraMicOn(false);
        break;        
      case "NIGHT_RESULT":
        // 밤 결과 나올 때 모든 유저 카메라 마이크 끄고 영상 소리 못 보고 들음
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
