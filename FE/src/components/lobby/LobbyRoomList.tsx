import { useEffect, useState } from "react";
import { LobbyRoomItem } from "./LobbyRoomItem";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";

interface Room {
  roomSeq: number;
  title: string;
  code: string;
  curUserNum: number;
  maxUserNum: number;
}

export const LobbyRoomList = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const { getRoomList } = useRoomsApiCall();

  useEffect(() => {
    (async () => {
      const roomList = await getRoomList();
      setRoomList(roomList);
    })();
  }, []);

  return (
    <>
      <div className="flex flex-wrap h-full overflow-scroll">
        {roomList.map((room, index) => (
          <LobbyRoomItem
            key={room.roomSeq}
            index={index}
            title={room.title}
            roomCode={room.code}
            curUsers={room.curUserNum}
            maxUsers={room.maxUserNum}
          />
        ))}
      </div>
    </>
  );
};
