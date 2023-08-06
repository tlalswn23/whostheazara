type userSeq = number;
type jobSeq = number;

export interface SubChat {
  type: "CHAT";
  sender: userSeq;
  message: string;
}

export interface SubStartTimer {
  type: "TIMER";
  data: number;
}

export interface SubVote {
  type: "VOTE";
  data: {
    userSeq: userSeq;
    cnt: number;
  }[];
}

export interface SubVoteResult {
  type: "VOTE_RESULT";
  data: userSeq;
}

export interface SubNightResult {
  type: "ALIVE";
  data: {
    userSeq: userSeq;
    alive: boolean;
  };
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
