import { createContext, useState, useContext } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export interface JobSettingContextType {
  id?: number;
  isSelect?: boolean;
}

export interface RoomSettingContextType {
  title: string;
  jobSetting: JobSettingContextType[];
  roomCode: string;
}

const roomSettingContext = createContext({
  roomSetting: {} as RoomSettingContextType,
  setRoomSetting: (_: (prev: RoomSettingContextType) => RoomSettingContextType) => {},
});

export const RoomSettingProvider = ({ children }: LayoutChildrenProps) => {
  const [roomSetting, setRoomSetting] = useState<RoomSettingContextType>({
    title: "",
    jobSetting: [],
    roomCode: "",
  });

  const value = {
    roomSetting,
    setRoomSetting,
  };

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
