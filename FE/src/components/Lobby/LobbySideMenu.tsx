import { LobbyBtn } from "./LobbyBtn";
import rabbitImg from "../../assets/img/rabbitImg.png";

const LobbySideMenu = () => {
  return (
    <aside className="absolute bottom-[80px] left-[100px] ml-[60px] flex flex-col leading-[180px] text-center">
      <LobbyBtn text="방 만들기" />
      <LobbyBtn text="방 찾기" />
      <LobbyBtn text="내 프로필" />
      <img src={rabbitImg} className="absolute z-index-5 left-[20px] top-[-220px] w-[310px]" />
    </aside>
  );
};

export default LobbySideMenu;
