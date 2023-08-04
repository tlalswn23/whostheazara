import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useRoomSetting } from "../context/roomSettingContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoomsApiCall } from "../api/axios/useRoomsApiCall";
import { useState } from "react";

export type UserList = Array<string | boolean>;

export const Room = () => {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const { getRoomInfo } = useRoomsApiCall();
  useFetchAccessToken();
  const { roomSetting, setRoomSetting } = useRoomSetting();
  const [userList, setUserList] = useState<UserList>([]);

  useEffect(() => {
    if (!roomCode) return;
    (async () => {
      const roomInfo = await getRoomInfo(roomCode);
      setRoomSetting({
        title: roomInfo.title,
        jobSetting: roomInfo.jobSetting,
        maxUsers: roomInfo.maxUsers,
        ownerUserSeq: roomInfo.owner,
      });
      setUserList(roomInfo.curUsersName);
    })();

    if (roomSetting.ownerUserSeq === 0) {
      toast.error("비정상적인 접근입니다.");
      navigate(-1);
    }
  }, [roomCode]);

  return (
    <RoomLayout>
      <div className="relative flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center w-full">
          <RoomHeader />
          <RoomHeaderBtn />
        </div>
        <div className="flex items-center w-full">
          <RoomChat />
          <RoomUserList userList={userList} setUserList={setUserList} />
        </div>
      </div>
    </RoomLayout>
  );
};
