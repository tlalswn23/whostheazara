import { BACK_COLOR_MAP } from "../../constants/common/ColorMap";

interface ShopCharacterColorProps {
  setColor: (num: number) => void;
}

export const ShopCharacterColor = ({ setColor }: ShopCharacterColorProps) => {
  return (
    <div className="flex flex-wrap w-[100%] justify-center">
      {BACK_COLOR_MAP.map((item, index) => {
        if (index > 0) {
          return (
            <div
              className={`w-[100px] h-[100px] mx-[30px] mb-[30px] ${item} cursor-pointer`}
              onClick={() => setColor(index - 1)}
              key={index}
            ></div>
          );
        }
      })}
    </div>
  );
};
