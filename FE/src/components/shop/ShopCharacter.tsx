import { useState } from "react";
import { ShopCharacterColor } from "./ShopCharacterColor";
import { ShopCharacterPreview } from "./ShopCharacterPreview";
import { ShopType } from "../../types/ShopType";

interface ShopCharacterProps {
  selectList: [cap: number, face: number, clothing: number];
  shopAllItem: ShopType;
}

export const ShopCharacter = ({ selectList, shopAllItem }: ShopCharacterProps) => {
  const [color, setColor] = useState(0);
  return (
    <>
      <div className="relative w-[40%] h-full flex flex-col justify-center items-center 3xl:py-[40px] py-[32px]">
        <ShopCharacterPreview color={color} selectList={selectList} shopAllItem={shopAllItem} />
        <ShopCharacterColor color={color} setColor={setColor} />
      </div>
    </>
  );
};
