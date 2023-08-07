export type JOB_ID = "3" | "4" | "5" | "6" | "7";

export type JobSettingType = {
  "3": boolean;
  "4": boolean;
  "5": boolean;
  "6": boolean;
  "7": boolean;
};

export type SeatInfo = {
  userSeq: number;
  nickName: string;
  state: number;
};

export type CurSeats = [SeatInfo, SeatInfo, SeatInfo, SeatInfo, SeatInfo, SeatInfo, SeatInfo, SeatInfo];
