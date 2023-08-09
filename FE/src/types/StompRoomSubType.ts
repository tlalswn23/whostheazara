import { CurSeats, JobSetting } from "./RoomSettingType";

type userSeq = number;

export interface SubEnterChat {
  type: "ENTER_MESSAGE";
  roomCode: string;
  data: {
    senderSeq: number;
    nickname: string;
    message: string;
  };
}

export interface SubChat {
  type: "CHAT";
  data: {
    nickname: string;
    message: string;
  };
}
export interface SubTitle {
  type: "TITLE";
  data: string;
}

export interface SubJobSetting {
  type: "JOB_SETTING";
  data: {
    "3": boolean;
    "4": boolean;
    "5": boolean;
    "6": boolean;
    "7": boolean;
  };
}

export interface SubStart {
  type: "START";
  gameCode: string;
}

export interface SubChangeOwner {
  type: "CHANGE_OWNER";
  ownerSeq: userSeq;
}

export interface SubCurSeats {
  type: "CUR_SEATS";
  data: {
    order: number;
    userSeq: userSeq;
    nickname: string;
    state: -1 | 0 | 1;
  }[];
}

export interface SubInitialRoomSetting {
  type: "ENTER_ROOM_SETTING";
  data: {
    title: string;
    jobSetting: JobSetting;
    ownerSeq: userSeq;
    curSeats: CurSeats;
  };
}

export interface SubStart {
  type: "START";
  gameCode: string;
}
