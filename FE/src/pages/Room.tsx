import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useEffect } from "react";
import { useState } from "react";
import { CurSeats, JobSetting } from "../types/RoomSettingType";
import stompUrl from "../api/url/stompUrl";
import { useWebSocket } from "../context/socketContext";
import { defaultJobSetting, defaultCurSeats } from "../constants/room/defaultRoomInfo";
import { useNavigate, useParams } from "react-router-dom";
import { SubChat } from "../types/StompGameSubType";
import {
  SubChangeOwner,
  SubCurSeats,
  SubInitialRoomSetting,
  SubJobSetting,
  SubStart,
  SubTitle,
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
    const url = stompUrl.subRoom(roomCode);
    client?.subscribe(
      url,
      (subData) => {
        const subDataBody = JSON.parse(subData.body);
        console.log("SUBSCRIBE ROOM");
        console.log(subDataBody);
        switch (subDataBody.type) {
          case "INITIAL_ROOM_SETTING":
            const initialRoomSettingData: SubInitialRoomSetting = subDataBody;
            setTitle(initialRoomSettingData.title);
            setIsOwner(initialRoomSettingData.ownerSeq === userSeq);
            if (jobSetting === defaultJobSetting) setJobSetting(initialRoomSettingData.jobSetting);
            if (curSeats === defaultCurSeats) setCurSeats(initialRoomSettingData.curSeats);
            break;
          case "START":
            const startData: SubStart = subDataBody;
            setGameCode(startData.gameCode);
            break;
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
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  };

  const unSubRoom = (roomCode: string) => {
    const url = stompUrl.subRoom(roomCode);
    client?.unsubscribe(url);
  };

  useEffect(() => {
    if (!gameCode) return;

    const userSeqOrderMap: { [key: number]: number } = {};

    curSeats.forEach((seat) => {
      userSeqOrderMap[seat.order] = seat.userSeq;
    });

    navigate(`/game/${gameCode}`, {
      state: {
        userSeqOrderMap,
      },
    });
  }, [gameCode]);

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
