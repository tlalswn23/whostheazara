import { RoomHeader } from "../components/room/RoomHeader";
import { RoomExitBtn } from "../components/room/RoomExitBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";

export const Room = () => {
  return (
    <RoomLayout>
      <RoomHeader />
      <RoomChat />
      <RoomUserList />
      <RoomExitBtn />
    </RoomLayout>
  );
};
