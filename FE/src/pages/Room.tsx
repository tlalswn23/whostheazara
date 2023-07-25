import { RoomHeader } from "../components/room/RoomHeader";
import { RoomExitBtn } from "../components/room/RoomExitBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useWebSocket } from "../context/socketContext";
import { useEffect } from "react";

export const Room = () => {
  const { client } = useWebSocket();
  useEffect(() => {
    //TODO: client.subscribe() 로직 구현
  }, []);
  return (
    <RoomLayout>
      <RoomHeader />
      <RoomChat />
      <RoomUserList />
      <RoomExitBtn />
    </RoomLayout>
  );
};
