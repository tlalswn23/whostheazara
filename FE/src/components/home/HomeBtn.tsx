interface HomeBtnProps {
  text: string;
  color: string;
  onClick: () => void;
}

export const HomeBtn = ({ text, color, onClick }: HomeBtnProps) => {
  return (
    <>
      <button
        className={`w-[15vw] h-[4vw] font-bold text-[24px] my-[10px] text-center transition-all duration-500 ${
          color === "yellow" ? "bg-amber-400 h-[100px] hover:scale-110" : "bg-gray-400 hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
