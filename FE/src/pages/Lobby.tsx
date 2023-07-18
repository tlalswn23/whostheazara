import LobbyLayout from "../layouts/LobbyLayout";
import LobbySideMenu from "../components/Lobby/LobbySideMenu";
import { LobbyCreateRoom } from "../components/Lobby/LobbyCreateRoom";

const Lobby = () => {
  return (
    <LobbyLayout>
      <LobbySideMenu />
      <LobbyCreateRoom />
    </LobbyLayout>
  );
};

export default Lobby;
