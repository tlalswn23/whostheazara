import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { JobSettingType, CurSeats } from "../types/RoomSettingType";
import { SeatInfo } from "../types/RoomSettingType";

const defaultJobSetting = {
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
};

const defaultSeatInfo: SeatInfo = {
  userSeq: 0,
  nickName: "",
  state: 0,
};

const defaultCurSeats: CurSeats = [
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
];

export const Room = () => {
  useFetchAccessToken();
  const { roomCode } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [ownerUserSeq, setOwnerUserSeq] = useState(0);
  const [jobSetting, setJobSetting] = useState<JobSettingType>(defaultJobSetting);
  const [curSeats, setCurSeats] = useState<CurSeats>(defaultCurSeats);

  useEffect(() => {
    if (!roomCode) return;
  }, [roomCode]);

  return (
    <RoomLayout>
      <div className="relative flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center w-full">
          <RoomHeader title={title} jobSetting={jobSetting} setJobSetting={setJobSetting} />
          <RoomHeaderBtn />
        </div>
        <div className="flex items-center w-full">
          <RoomChat />
          <RoomUserList curSeats={curSeats} setCurSeats={setCurSeats} />
        </div>
      </div>
    </RoomLayout>
  );
};
