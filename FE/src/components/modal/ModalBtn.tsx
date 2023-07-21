import { debounce } from "lodash";

interface ModalBtnProps {
  text: string;
  btnWidth: number;
  btnHeight: number;
  isBold?: boolean;
  fontSize?: number;
  clickBtnHandler: () => void;
}

export const ModalBtn = ({ text, btnWidth, btnHeight, isBold, fontSize, clickBtnHandler }: ModalBtnProps) => {
  return (
    <button
      className={`bg-amber-300 hover:bg-amber-400 text-black rounded-lg transition-colors duration-500 ${
        isBold ? "font-bold" : ""
      } mx-2 text-[28px]`}
      style={{ width: btnWidth, fontSize: `${fontSize}px`, height: `${btnHeight}px` }}
      onClick={debounce(clickBtnHandler, 500)}
    >
      {text}
    </button>
  );
};
