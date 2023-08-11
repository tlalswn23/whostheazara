import { CurSeats } from "./RoomSettingType";

type userSeq = number;
type gameCode = string;

export interface SubEnterChat {
  type: "ENTER_MESSAGE";
  roomCode: string;
  data: string;
}

export interface SubChat {
  type: "CHAT";
  roomCode: string;
  data: {
    nickname: string;
    message: string;
  };
}

export interface SubExitMessage {
  type: "EXIT";
  roomCode: string;
  data: string;
}
export interface SubTitle {
  type: "TITLE";
  roomCode: string;
  data: string;
}

export interface SubJobSetting {
  type: "JOB_SETTING";
  roomCode: string;
  data: {
    jobSetting: {
      "3": boolean;
      "4": boolean;
      "5": boolean;
      "6": boolean;
      "7": boolean;
    };
  };
}

export interface SubStart {
  type: "START";
  roomCode: string;
  data: gameCode;
}

export interface SubChangeOwner {
  type: "CHANGE_OWNER";
  roomCode: string;
  ownerSeq: userSeq;
}

export interface SubCurSeats {
  type: "CUR_SEATS";
  data: CurSeats;
}

export interface SubInitialRoomSetting {
  type: "ENTER_ROOM_SETTING";
  data: {
    roomCode: string;
    title: string;
    jobSetting: {
      "1": boolean;
      "2": boolean;
      "3": boolean;
      "4": boolean;
      "5": boolean;
      "6": boolean;
      "7": boolean;
    };
    ownerSeq: userSeq;
    curSeats: CurSeats;
  };
}

export interface SubStart {
  type: "START";
  gameCode: string;
}
