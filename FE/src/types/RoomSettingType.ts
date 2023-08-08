export type JOB_ID = "3" | "4" | "5" | "6" | "7";

export type JobSetting = {
  [key in JOB_ID]: boolean;
};

export type SeatInfo = {
  order: number;
  userSeq: number;
  nickName: string;
  state: -1 | 0 | 1;
};

export type CurSeats = SeatInfo[];
