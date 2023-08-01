import { createContext, useState, useContext } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { useMemo } from "react";

export interface JobSettingContextType {
  [key: number]: boolean;
}
export interface RoomSettingContextType {
  title: string;
  jobSetting: JobSettingContextType;
  roomCode: string;
}

const defaultJobSetting: JobSettingContextType = {
  "3": false,
  "4": false,
  "5": false,
  "6": false,
  "7": false,
};

const roomSettingContext = createContext({
  roomSetting: {} as RoomSettingContextType,
  setRoomSetting: (_: (prev: RoomSettingContextType) => RoomSettingContextType) => {},
});

export const RoomSettingProvider = ({ children }: LayoutChildrenProps) => {
  const [roomSetting, setRoomSetting] = useState<RoomSettingContextType>({
    title: "",
    jobSetting: defaultJobSetting,
    roomCode: "",
  });

  const value = useMemo(() => ({ roomSetting, setRoomSetting }), [roomSetting, setRoomSetting]);

  return <roomSettingContext.Provider value={value}>{children}</roomSettingContext.Provider>;
};

export const useRoomSetting = () => {
  const context = useContext(roomSettingContext);
  if (context === null) {
    throw new Error("useRoomSetting must be used within a RoomSettingProvider");
  }
  return {
    roomSetting: context.roomSetting,
    setRoomSetting: context.setRoomSetting,
  };
};
