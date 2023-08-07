type userSeq = number;

export interface SubChat {
  type: "CHAT";
  message: string;
}
export interface SubTitle {
  type: "TITLE";
  title: string;
}

export interface SubStart {
  type: "START";
  start: boolean;
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

export interface SubChangeOwner {
  type: "CHANGE_OWNER";
  ownerSeq: userSeq;
}

export interface SubCurSeats {
  type: "CUR_SEATS";
  data: {
    userSeq: userSeq;
    nickName: string;
    state: -1 | 0 | 1;
  }[];
}
