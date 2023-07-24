import { useState } from "react";

interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  // 텍스트 오류 발생
  const [indexStyle, setIndexStyle] = useState([
    "text-[96px] top-[0px] left-[-10px] rotate-[5deg] text-yellow-200",
    "text-[48px] top-[130px] left-[-90px] rotate-[9deg] text-white",
    "text-[64px] top-[200px] left-[90px] rotate-[-8deg] text-white",
    "text-[88px] top-[0px] left-[-40px] rotate-[5deg] text-yellow-200",
    "text-[46px] top-[130px] left-[-90px] rotate-[9deg] text-white",
    "text-[58px] top-[200px] left-[90px] rotate-[-8deg] text-white",
  ]);

  return (
    <>
      <button
        className={`absolute w-auto h-auto whitespace-nowrap font-bold ${indexStyle[index]} hover:scale-110`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
