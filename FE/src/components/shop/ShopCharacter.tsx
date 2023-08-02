import { useState } from "react";
import { ShopCharacterColor } from "./ShopCharacterColor";
import coin from "../../assets/img/shop/coin.png";
import { ShopCharacterPreview } from "./ShopCharacterPreview";

export const ShopCharacter = () => {
  const [color, setColor] = useState(0);
  return (
    <>
      <div className="relative w-[40%] h-full flex flex-col justify-between items-center 3xl:py-[40px] py-[32px]">
        <div className="text-center flex justify-center">
          <img className="w-auto 3xl:h-[60px] h-[48px] 3xl:mt-[10px] mt-[8px]" src={coin} />
          <p className="text-yellow-400 font-bold 3xl:text-[48px] text-[38.4px]">134</p>
        </div>
        <ShopCharacterPreview color={color} />
        <ShopCharacterColor setColor={setColor} />
      </div>
    </>
  );
};
