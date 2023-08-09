type userSeq = number;

export interface PubChat {
  senderSeq: userSeq;
  message: string;
}

export interface PubTitle {
  title: string;
}

export interface PubJobSetting {
  data: {
    "3": boolean;
    "4": boolean;
    "5": boolean;
    "6": boolean;
    "7": boolean;
  };
}

export interface PubStart {
  start: boolean;
}
