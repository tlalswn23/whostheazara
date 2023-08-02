import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import test from "../../assets/img/shop/walk/cap/test.gif";

interface ShopCharacterPreviewProps {
  color: number;
}

export const ShopCharacterPreview = ({ color }: ShopCharacterPreviewProps) => {
  return (
    <>
      <img
        src={RABBIT_MAP[color].IMG[RABBIT_STATE_MAP.WALK]}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      <img src={test} className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]" />
    </>
  );
};
