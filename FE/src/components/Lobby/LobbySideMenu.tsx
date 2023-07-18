import { LobbyBtn } from "./LobbyBtn";

const LobbySideMenu = () => {
  return (
    <aside className="absolute bottom-[140px] left-[200px] ml-[60px] flex flex-col leading-[180px] text-center">
      <LobbyBtn text="방 만들기" />
      <LobbyBtn text="방 찾기" />
      <LobbyBtn text="내 프로필" />
    </aside>
  );
};

export default LobbySideMenu;
