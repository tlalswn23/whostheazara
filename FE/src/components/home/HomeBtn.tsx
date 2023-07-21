interface HomeBtnProps {
  text: string;
  color: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, color, index, onClick }: HomeBtnProps) => {
  const indexStyle = [
    "text-[84px] top-[70px] left-[50px] rotate-[4deg]",
    "text-[40px] top-[200px] left-[-20px] rotate-[8deg]",
    "text-[48px] top-[270px] left-[140px] rotate-[-8deg]",
    "text-[84px] top-[70px] left-[10px] rotate-[4deg]",
  ];
  return (
    <>
      <button
        className={`absolute w-auto h-auto p-[20px] whitespace-nowrap font-bold ${
          indexStyle[index]
        } text-center transition-all duration-500 ${
          color === "yellow" ? "text-yellow-200 h-[100px]" : "text-white"
        } hover:scale-110`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
