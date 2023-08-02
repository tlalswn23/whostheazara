import { BACK_COLOR_MAP, BORDER_COLOR_MAP } from "../../constants/common/ColorMap";

interface ShopCharacterColorProps {
  color: number;
  setColor: (num: number) => void;
}

export const ShopCharacterColor = ({ color, setColor }: ShopCharacterColorProps) => {
  return (
    <div className="flex flex-wrap w-[100%] justify-center">
      {BACK_COLOR_MAP.map((item, index) => {
        if (index > 0) {
          return (
            <div
              className={`3xl:w-[100px] w-[80px] 3xl:h-[100px] h-[80px] 3xl:mx-[30px] mx-[24px] 3xl:mb-[30px] mb-[24px] ${item} cursor-pointer border-solid 3xl:border-[8px] border-[6.4px] rounded-md ${
                color === index - 1 ? `${BORDER_COLOR_MAP[index]} scale-110` : "border-white"
              }`}
              onClick={() => setColor(index - 1)}
              key={index}
            />
          );
        }
      })}
    </div>
  );
};
