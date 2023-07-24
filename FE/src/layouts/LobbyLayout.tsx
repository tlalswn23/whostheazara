import lobbyBg from "../assets/img/lobbyBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const LobbyLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className={`w-[1920px] h-[1080px] bg-black flex justify-center items-center`} // bg-black 제거
      style={{ backgroundImage: `url(${lobbyBg})` }}
    >
      {children}
    </div>
  );
};

export default LobbyLayout;
