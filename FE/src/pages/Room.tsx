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
import chatUrl from "../api/url/chatUrl";
import { useWebSocket } from "../context/socketContext";

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
  // const navigate = useNavigate();
  const { roomCode } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState<string>(location.state?.title || "");
  // const [ownerUserSeq, setOwnerUserSeq] = useState(0);
  const [jobSetting, setJobSetting] = useState<JobSettingType>(location.state?.jobSetting || defaultJobSetting);
  const [curSeats, setCurSeats] = useState<CurSeats>(defaultCurSeats);
  const [chatList, setChatList] = useState<string[]>([]);
  const { client } = useWebSocket();

  const subRoom = () => {
    // const url = chatUrl.subscribe(roomCode!);
    // client?.subscribe(url, (receive) => {
    //   const data = JSON.parse(receive.body);
    // TODO
    // 받은 데이터로 채팅, 룸 정보 업데이트
    // setTitle, setOwnerUserSeq, setJobSetting, setCurSeats, setChatList
    // });
  };

  const unSubRoom = () => {
    // TODO
    // crate된 roomCode가 아니면 서버에서 거부
    if (!roomCode) return;
    const url = chatUrl.subscribe(roomCode!);
    client?.unsubscribe(url);
  };

  useEffect(() => {
    if (!roomCode) return;
    subRoom();

    return () => {
      // location.pathname을 확인하여 /game으로 시작하는 경로로 이동하는지 확인
      if (!location.pathname.startsWith("/game")) {
        unSubRoom();
      }
      setChatList([]);
    };
  }, [roomCode]);

  return (
    <RoomLayout>
      <div className="relative flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center w-full">
          <RoomHeader setTitle={setTitle} title={title} jobSetting={jobSetting} setJobSetting={setJobSetting} />
          <RoomHeaderBtn />
        </div>
        <div className="flex items-center w-full">
          <RoomChat chatList={chatList} />
          <RoomUserList curSeats={curSeats} setCurSeats={setCurSeats} />
        </div>
      </div>
    </RoomLayout>
  );
};
