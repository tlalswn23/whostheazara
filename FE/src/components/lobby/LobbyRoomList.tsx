import { useEffect, useState } from "react";
import { LobbyRoomItem } from "./LobbyRoomItem";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";
import { motion } from "framer-motion";
import no_room_list from "../../assets/img/room/no_room_list.png";

interface Room {
  roomSeq: number;
  title: string;
  roomCode: string;
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

  if (roomList.length !== 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-wrap h-full overflow-scroll"
      >
        {roomList.map((room, index) => (
          <LobbyRoomItem
            key={index}
            index={index}
            title={room.title}
            roomCode={room.roomCode}
            curUsers={room.curUserNum}
            maxUsers={room.maxUserNum}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
      <img
        src={no_room_list}
        alt="방 없음"
        className=" object-scale-down 3xl:w-[400px] w-[320px] 3xl:h-[400px] h-[320px] mx-auto 3xl:my-[40px] my-[32x]"
      />
    </motion.div>
  );
};
