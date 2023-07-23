import { useState } from "react";

interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  // 텍스트 오류 발생
  const [indexStyle, setIndexStyle] = useState([
    "text-[92px] top-[-90px] left-[10px] rotate-[5deg] text-yellow-200",
    "text-[46px] top-[48px] left-[-48px] rotate-[9deg] text-white",
    "text-[52px] top-[128px] left-[96px] rotate-[-8deg] text-white",
    "text-[86px] top-[-90px] left-[0px] rotate-[5deg] text-yellow-200",
    "text-[46px] top-[48px] left-[-48px] rotate-[9deg] text-white",
    "text-[52px] top-[128px] left-[128px] rotate-[-8deg] text-white",
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
