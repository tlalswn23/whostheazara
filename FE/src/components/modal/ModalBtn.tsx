interface ModalBtnProps {
  text: string;
  color: string;
}

export const ModalBtn = ({ text, color }: ModalBtnProps) => {
  return (
    <button
      className={`${
        text.length > 4 ? "w-[340px]" : "w-[180px]"
      } h-[60px] bg-yellow-400 font-bold rounded-[10px] text-[24px] mt-[20px] text-center  transition-colors duration-500 ${
        color === "yellow" ? "bg-yellow-300  hover:bg-black hover:text-yellow-300 " : "bg-gray-300"
      }`}
    >
      {text}
    </button>
  );
};
