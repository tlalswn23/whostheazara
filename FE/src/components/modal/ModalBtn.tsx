interface ModalBtnProps {
  text: string;
  btnWidth: number;
  btnHeight: number;
  isBold?: boolean;
  fontSize?: number;
}

export const ModalBtn = ({ text, btnWidth, btnHeight, isBold, fontSize }: ModalBtnProps) => {
  return (
    <button
      className={` mt-4 h-[${btnHeight}px]  bg-amber-300 hover:bg-amber-400 text-black py-2 px-2 rounded-lg transition-colors duration-500 ${
        isBold ? "font-bold" : ""
      } mx-2`}
      style={{ width: btnWidth, fontSize: `${fontSize}px` }}
    >
      {text}
    </button>
  );
};
