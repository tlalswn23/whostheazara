import { RoomHeader } from "../components/room/RoomHeader";
import { RoomExitBtn } from "../components/room/RoomExitBtn";
import { RoomChat } from "../components/room/RoomChat";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";
import { useWebSocket } from "../context/socketContext";
import { useEffect } from "react";
import { useState } from "react";
import { StompChatType } from "../types/StompChatType";

export const Room = () => {
  const { client } = useWebSocket();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    client?.subscribe("", (body) => {
      const jsonBody = JSON.parse(body.body);
      //TODO: 채팅 리스트에 추가
      // setChatList((prev: StompChatType[]): StompChatType[] => [...prev, jsonBody]);
    });

    return () => {
      setChatList([]);
    };
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
