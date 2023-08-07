import { SeatInfo, CurSeats } from "../../types/RoomSettingType";

export const defaultJobSetting = {
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
};

export const defaultSeatInfo: SeatInfo = {
  userSeq: 0,
  nickName: "",
  state: 0,
};

export const defaultCurSeats: CurSeats = [
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
];
