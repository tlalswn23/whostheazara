import { LobbyCreateRoom } from "../components/lobby/LobbyCreateRoom";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomLayout } from "../layouts/RoomLayout";

export const Room = () => {
  return (
    <RoomLayout>
      <LobbyCreateRoom />
      <RoomHeaderBtn index={1} text="나가기" loc="lobby" />
    </RoomLayout>
  );
};
