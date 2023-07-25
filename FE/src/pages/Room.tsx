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
  return (
    <RoomLayout>
      <RoomHeader />
      <RoomChat />
      <RoomUserList />
      <RoomExitBtn />
    </RoomLayout>
  );
};
