import { RoomHeader } from "../components/room/RoomHeader";
import { RoomExitBtn } from "../components/room/RoomExitBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useAccessTokenState } from "../context/accessTokenContext";
import { setAccessTokenLocalVar } from "../api/axios/interceptAxios";
import { useEffect } from "react";

export const Room = () => {
  const accessToken = useFetchAccessToken();
  const { setAccessToken } = useAccessTokenState();
  useEffect(() => {
    if (!accessToken) return;
    setAccessToken(accessToken);
    setAccessTokenLocalVar(accessToken);
  }, []);
  return (
    <RoomLayout>
      <div className="flex flex-wrap w-full justify-center items-center 3xl:px-[40px] px-[36px]">
        <div className="flex items-center justify-around w-full">
          <RoomHeader />
          <RoomExitBtn />
        </div>
        <div className="flex items-center w-full">
          <RoomChat />
          <RoomUserList />
        </div>
      </div>
    </RoomLayout>
  );
};
