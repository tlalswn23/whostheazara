import LobbyLayout from "../layouts/LobbyLayout";
import LobbySideMenu from "../components/Lobby/LobbySideMenu";
import { LobbyCreateRoom } from "../components/Lobby/LobbyCreateRoom";
import { LobbyBack } from "../components/Lobby/LobbyBack";
import { LobbyListRoom } from "../components/Lobby/LobbyListRoom";
import { useState } from "react";

const Lobby = () => {
  const [viewMain, setViewMain] = useState(0);
  const onSetViewMain = (index: number) => {
    if (viewMain === index) {
      setViewMain(0);
    } else {
      setViewMain(index);
    }
  };
  return (
    <LobbyLayout>
      <LobbySideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
      {viewMain == 1 ? <LobbyCreateRoom /> : ""}
      {viewMain == 2 ? <LobbyListRoom /> : ""}
      <LobbyBack />
    </LobbyLayout>
  );
};

export default Lobby;
