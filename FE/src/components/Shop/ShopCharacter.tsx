import { useState } from "react";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { ShopCharacterColor } from "./ShopCharacterColor";
export const ShopCharacter = () => {
  const [color, setColor] = useState(0);
  return (
    <>
      <div className="w-[40%] h-full flex flex-col justify-end items-center bg-gradient-to-t from-black from-0% font-bold to-gray-700">
        <div className="w-[80%] text-center">
          <p className="text-white font-bold text-[48px]">3000 $</p>
        </div>
        <img src={RABBIT_MAP[color].IMG[RABBIT_STATE_MAP.STAND]} className="w-[600px] h-[600px]" />
        <ShopCharacterColor setColor={setColor} />
      </div>
    </>
  );
};
