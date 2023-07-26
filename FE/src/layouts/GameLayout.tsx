import { useState } from "react";
import gameBg1 from "../assets/img/gameBg.gif";
import gameBg2 from "../assets/img/gameBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export const GameLayout = ({ children }: LayoutChildrenProps) => {
  const [backgroundImage, setBackGroundImage] = useState(gameBg1);
  setTimeout(() => {
    setBackGroundImage(gameBg2);
  }, 5000);
  return (
    <div
      className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] flex justify-center items-center bg-cover transla transition ease-in-out duration-1000 animate-fade-in`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};
