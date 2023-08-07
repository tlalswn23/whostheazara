import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useEffect } from "react";
import { useState } from "react";
import { JobSettingType, CurSeats } from "../types/RoomSettingType";
import stompUrl from "../api/url/stompUrl";
import { useWebSocket } from "../context/socketContext";
import { defaultJobSetting, defaultCurSeats } from "../constants/room/defaultRoomInfo";
import { useParams } from "react-router-dom";
import { SubChat } from "../types/StompGameSubType";
import { SubChangeOwner, SubCurSeats, SubJobSetting, SubTitle } from "../types/StompRoomSubType";

export const Room = () => {
  useFetchAccessToken();
  const { roomCode } = useParams();

  const [title, setTitle] = useState<string>("");
  const [ownerUserSeq, setOwnerUserSeq] = useState(0);
  const [jobSetting, setJobSetting] = useState<JobSettingType>(defaultJobSetting);
  const [curSeats, setCurSeats] = useState<CurSeats>(defaultCurSeats);
  const [chatList, setChatList] = useState<string[]>([]);
  const { client } = useWebSocket();

  const subRoom = (roomCode: string) => {
    const url = stompUrl.subRoom(roomCode);
    client?.subscribe(url, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE ROOM");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT":
          const chatData: SubChat = subDataBody;
          setChatList((prev) => [...prev, chatData.message]);
          break;
        case "TITLE":
          const titleData: SubTitle = subDataBody;
          setTitle(titleData.title);
          break;
        case "JOB_SETTING":
          const jobSettingData: SubJobSetting = subDataBody;
          setJobSetting(jobSettingData.data);
          break;
        case "CHANGE_OWNER":
          const ownerData: SubChangeOwner = subDataBody;
          setOwnerUserSeq(ownerData.ownerSeq);
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
    const url = stompUrl.subRoom(roomCode);
    client?.unsubscribe(url);
  };

  useEffect(() => {
    if (!roomCode) return;
    subRoom(roomCode);

    return () => {
      unSubRoom(roomCode);
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
