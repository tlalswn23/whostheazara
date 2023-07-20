import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomSideMenu } from "../components/room/RoomSideMenu";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";

export const Room = () => {
  return (
    <RoomLayout>
      <RoomHeader />
      <RoomSideMenu />
      <RoomUserList />
      <RoomHeaderBtn index={1} text="나가기" loc="lobby" />
    </RoomLayout>
  );
};
