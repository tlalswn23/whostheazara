import { useState } from "react";

interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  // 텍스트 오류 발생
  const [indexStyle, setIndexStyle] = useState([
    "text-[80px] top-[0px] left-[-10px] rotate-[5deg] text-yellow-200",
    "text-[36px] top-[110px] left-[-60px] rotate-[9deg] text-white",
    "text-[40px] top-[160px] left-[90px] rotate-[-8deg] text-white",
    "text-[68px] top-[10px] left-[-20px] rotate-[5deg] text-yellow-200",
    "text-[36px] top-[110px] left-[-60px] rotate-[9deg] text-white",
    "text-[40px] top-[160px] left-[100px] rotate-[-8deg] text-white",
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
