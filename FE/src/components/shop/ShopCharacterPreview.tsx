import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { ShopAllItemType, SelectedItemsType } from "../../types/ShopType";
import { SHOP_ITEM_CATEGORY_MAP } from "../../constants/shop/ShopItemCategoryMap";

interface ShopCharacterPreviewProps {
  selectedItems: SelectedItemsType;
  color: number;
  shopAllItem: ShopAllItemType;
}

export const ShopCharacterPreview = ({ color, selectedItems, shopAllItem }: ShopCharacterPreviewProps) => {
  return (
    <div className="relative w-full h-full flex justify-center">
      <img
        src={RABBIT_MAP[color].IMG[RABBIT_STATE_MAP.STAND]}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      <img
        src={`data:image/png;base64,${
          shopAllItem.clothingList.length > 0 && selectedItems[SHOP_ITEM_CATEGORY_MAP.CLOTHING].image
        }`}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      <img
        src={`data:image/png;base64,${
          shopAllItem.faceList.length > 0 && selectedItems[SHOP_ITEM_CATEGORY_MAP.FACE].image
        }`}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      <img
        src={`data:image/png;base64,${
          shopAllItem.capList.length > 0 && selectedItems[SHOP_ITEM_CATEGORY_MAP.CAP].image
        }`}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
    </div>
  );
};
