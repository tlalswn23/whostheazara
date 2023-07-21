interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  const indexStyle = [
    "text-[84px] top-[70px] left-[50px] rotate-[4deg] text-yellow-200",
    "text-[40px] top-[200px] left-[-20px] rotate-[8deg] text-white",
    "text-[48px] top-[270px] left-[140px] rotate-[-8deg] text-white",
    "text-[84px] top-[70px] left-[10px] rotate-[4deg] text-yellow-200",
  ];
  return (
    <>
      <button
        className={`absolute w-auto h-auto p-[20px] whitespace-nowrap font-bold ${indexStyle[index]} text-center transition- duration-500 hover:scale-110`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
