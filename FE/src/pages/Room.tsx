import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useEffect } from "react";
import { useState } from "react";
import { CurSeats, JobSetting } from "../types/RoomSettingType";
import { useWebSocket } from "../context/socketContext";
import { defaultJobSetting, defaultCurSeats } from "../constants/room/defaultRoomInfo";
import { useNavigate, useParams } from "react-router-dom";
import {
  SubChangeOwner,
  SubCurSeats,
  SubInitialRoomSetting,
  SubJobSetting,
  SubStart,
  SubTitle,
  SubChat,
  SubEnterChat,
} from "../types/StompRoomSubType";
import { useAccessTokenState } from "../context/accessTokenContext";

export const Room = () => {
  useFetchAccessToken();
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { accessToken, userSeq } = useAccessTokenState();
  const [gameCode, setGameCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const [jobSetting, setJobSetting] = useState<JobSetting>(defaultJobSetting);
  const [curSeats, setCurSeats] = useState<CurSeats>(defaultCurSeats);
  const [chatList, setChatList] = useState<string[]>([]);
  const { client } = useWebSocket();

  const subRoom = (roomCode: string) => {
    client?.subscribe(`/sub/room/${roomCode}`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE ROOM");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "ENTER_ROOM_SETTING":
          const initialRoomSettingData: SubInitialRoomSetting = subDataBody;
          setTitle(initialRoomSettingData.data.title);
          setIsOwner(initialRoomSettingData.data.ownerSeq === userSeq);
          setJobSetting(initialRoomSettingData.data.jobSetting);
          setCurSeats(initialRoomSettingData.data.curSeats);
          break;
        case "ENTER_MESSAGE":
          const enterChatData: SubEnterChat = subDataBody;
          setChatList((prev) => [...prev, enterChatData.data]);
          break;
        case "START":
          const startData: SubStart = subDataBody;
          setGameCode(startData.data);
          break;
        case "CHAT":
          const chatData: SubChat = subDataBody;
          setChatList((prev) => [...prev, `[${chatData.data.nickname}] : ${chatData.data.message}`]);
          break;
        case "TITLE":
          const titleData: SubTitle = subDataBody;
          setTitle(titleData.data);
          break;
        case "JOB_SETTING":
          const jobSettingData: SubJobSetting = subDataBody;
          setJobSetting(jobSettingData.data);
          break;
        case "CHANGE_OWNER":
          const ownerData: SubChangeOwner = subDataBody;
          setIsOwner(ownerData.ownerSeq === userSeq);
          break;
        case "CUR_SEATS":
          const curSeatsData: SubCurSeats = subDataBody;
          setCurSeats(curSeatsData.data);
          break;
        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubRoom = (roomCode: string) => {
    client?.unsubscribe(`/sub/room/${roomCode}`);
  };

  const pubEnterRoom = (roomCode: string) => {
    client?.publish({
      destination: `/pub/room/${roomCode}/enter`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const pubExitRoom = (roomCode: string) => {
    client?.publish({
      destination: `/pub/room/${roomCode}/exit`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  useEffect(() => {
    if (!gameCode) return;

    const userSeqOrderMap: { [userOrder: number]: number } = {};

    curSeats.forEach((seat) => {
      userSeqOrderMap[seat.order] = seat.userSeq;
    });

    navigate(`/game/${gameCode}`, {
      state: {
        userSeqOrderMap,
        gameCode,
      },
    });
  }, [gameCode]);

  useEffect(() => {
    if (!roomCode) return;
    subRoom(roomCode);
    pubEnterRoom(roomCode);

    return () => {
      pubExitRoom(roomCode);
      unSubRoom(roomCode);
      setChatList([]);
    };
  }, [roomCode]);

  return (
    <RoomLayout>
      <div className="relative flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center w-full">
          <RoomHeader
            isOwner={isOwner}
            setTitle={setTitle}
            title={title}
            jobSetting={jobSetting}
            setJobSetting={setJobSetting}
          />
          <RoomHeaderBtn isOwner={isOwner} />
        </div>
        <div className="flex items-center w-full">
          <RoomChat chatList={chatList} />
          <RoomUserList curSeats={curSeats} setCurSeats={setCurSeats} isOwner={isOwner} />
        </div>
      </div>
    </RoomLayout>
  );
};
