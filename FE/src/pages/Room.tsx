import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useRoomSetting } from "../context/roomSettingContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Room = () => {
  const navigate = useNavigate();
  useFetchAccessToken();
  const { roomSetting } = useRoomSetting();
  useEffect(() => {
    if (roomSetting.title === "") {
      toast.error("방 생성하기를 통해 방을 생성해주세요.");
      navigate(-1);
    }
  }, [roomSetting]);

  return (
    <RoomLayout>
      <div className="relative flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center w-full">
          <RoomHeader />
          <RoomHeaderBtn />
        </div>
        <div className="flex items-center w-full">
          <RoomChat />
          <RoomUserList />
        </div>
      </div>
    </RoomLayout>
  );
};
