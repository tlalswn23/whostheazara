import LobbyLayout from "../layouts/LobbyLayout";
import LobbySideMenu from "../components/lobby/LobbySideMenu";
import { LobbyCreateRoom } from "../components/lobby/LobbyCreateRoom";
import { LobbyHeaderBtn } from "../components/lobby/LobbyHeaderBtn";
import { LobbyListRoom } from "../components/lobby/LobbyListRoom";
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
      <LobbyHeaderBtn index={0} text="프로필" loc="profile" />
      <LobbyHeaderBtn index={1} text="홈 화면" loc="" />
    </LobbyLayout>
  );
};

export default Lobby;
