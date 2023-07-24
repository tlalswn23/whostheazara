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
      <div className="flex flex-col w-full">
        <div className="flex justify-end mb-[20px] mr-[60px]">
          <LobbyHeaderBtn text="프로필" loc="profile" />
          <LobbyHeaderBtn text="홈 화면" loc="" />
        </div>
        <div className="relative flex items-center ml-[120px]">
          <LobbySideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
          <div
            className={`min-w-[1140px] h-[700px] mx-[140px] ${
              viewMain === 0 ? "" : "border-solid border-white border-[20px] text-[56px] font-bold bg-black"
            }`}
          >
            {viewMain == 1 ? <LobbyCreateRoom /> : ""}
            {viewMain == 2 ? <LobbyListRoom /> : ""}
          </div>
        </div>
      </div>
    </LobbyLayout>
  );
};

export default Lobby;
