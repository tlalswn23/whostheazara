import { useEffect, useState } from "react";
import { LobbyRoomItem } from "./LobbyRoomItem";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";

interface Room {
  roomSeq: number;
  title: string;
  owner: string;
  code: string;
  startAt: string;
  endAt: string;
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
      <div className="flex flex-wrap h-full">
        {roomList.map((item) => {
          return <LobbyRoomItem key={item.roomSeq} />;
        })}
      </div>
    </>
  );
};
