import LobbyLayout from "../layouts/LobbyLayout";
import LobbySideMenu from "../components/Lobby/LobbySideMenu";
import { LobbyCreateRoom } from "../components/Lobby/LobbyCreateRoom";
import { LobbyBack } from "../components/Lobby/LobbyBack";

const Lobby = () => {
  return (
    <LobbyLayout>
      <LobbySideMenu />
      <LobbyCreateRoom />
      <LobbyBack />
    </LobbyLayout>
  );
};

export default Lobby;
