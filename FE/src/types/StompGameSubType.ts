type userSeq = number;
type jobSeq = number;
type nickname = string;

export interface SubStart {
  type: "START";
  data: {
    userSeq: userSeq;
    jobSeq: jobSeq;
    nickname: nickname;
  }[];
}
export interface SubChat {
  type: "CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}

export interface SubStartTimer {
  type: "TIMER";
  data: {
    type: string;
    time: number;
  };
}

export interface SubVote {
  type: "VOTE";
  data: {
    userSeq: number;
  }[];
}

export interface SubVoteResult {
  type: "VOTE_RESULT";
  data: userSeq;
}

export interface SubNightResult {
  type: "NIGHT_RESULT";
  userSeq: userSeq | null;
}

export interface SubGameResult {
  type: "GAME_RESULT";
  data: {
    rabbitWin: boolean;
    userInfo: {
      userSeq: userSeq;
      jobSeq: jobSeq;
      win: boolean;
    }[];
  };
}

export interface SubZaraTarget {
  type: "ABILITY";
  targetUserSeq: userSeq;
}

export interface SubZaraChat {
  type: "ZARA_CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}

export interface SubGhostChat {
  type: "GHOST_CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}
