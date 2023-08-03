import { createContext, useState, useContext } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { useMemo } from "react";

export interface JobSettingContextType {
  [key: number]: boolean;
}
export interface RoomSettingContextType {
  title: string;
  jobSetting: JobSettingContextType;
  maxUsers: number;
}

const defaultJobSetting: JobSettingContextType = {
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
};

const roomSettingContext = createContext({
  roomSetting: {} as RoomSettingContextType,
  setRoomSetting: (_: (prev: RoomSettingContextType) => RoomSettingContextType) => {},
});

export const RoomSettingProvider = ({ children }: LayoutChildrenProps) => {
  const [roomSetting, setRoomSetting] = useState<RoomSettingContextType>({
    title: "",
    jobSetting: defaultJobSetting,
    maxUsers: 5,
  });

  const value = useMemo(() => ({ roomSetting, setRoomSetting }), [roomSetting, setRoomSetting]);

  return <roomSettingContext.Provider value={value}>{children}</roomSettingContext.Provider>;
};

export const useRoomSetting = () => {
  const context = useContext(roomSettingContext);
  if (context === null) {
    throw new Error("useRoomSetting must be used within a RoomSettingProvider");
  }
  return context;
};
