import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { CAP_MAP, CLOTHING_MAP, FACE_MAP } from "../../constants/shop/ShopListMap";

interface ShopCharacterPreviewProps {
  outfit: [cap: number, face: number, clothing: number];
  color: number;
}

export const ShopCharacterPreview = ({ color, outfit }: ShopCharacterPreviewProps) => {
  return (
    <>
      <img
        src={RABBIT_MAP[color].IMG[RABBIT_STATE_MAP.STAND]}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      <img src={CLOTHING_MAP[outfit[2]].img} className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]" />
      <img src={FACE_MAP[outfit[1]].img} className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]" />
      <img src={CAP_MAP[outfit[0]].img} className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]" />
    </>
  );
};
