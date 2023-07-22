import { useState } from "react";

interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  const [indexStyle, setIndexStyle] = useState([
    "text-[9vh] top-[16%] left-[3%] rotate-[4deg] text-yellow-200",
    "text-[4vh] top-[48%] left-[-1%] rotate-[8deg] text-white",
    "text-[5vh] top-[64%] left-[8%] rotate-[-8deg] text-white",
    "text-[9vh] top-[16%] left-[2%] rotate-[4deg] text-yellow-200",
    "text-[4vh] top-[48%] left-[-1%] rotate-[8deg] text-white",
    "text-[5vh] top-[64%] left-[8%] rotate-[-8deg] text-white",
  ]);
  // TODO: remove this
  console.log(setIndexStyle);

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
