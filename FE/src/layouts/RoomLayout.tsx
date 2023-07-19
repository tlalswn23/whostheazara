import lobbyBg from "../assets/img/lobbyBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export const RoomLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className={`w-full h-screen bg-contain bg-black bg-no-repeat bg-center relative`} // bg-black 제거
      style={{ backgroundImage: `url(${lobbyBg})` }}
    >
      {children}
    </div>
  );
};
