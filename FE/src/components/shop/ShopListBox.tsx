import { useState, useEffect } from "react";
import { SHOP_ITEM_CATEGORY_MAP } from "../../constants/shop/ShopItemCategoryMap";
import { ShopListBoxItem } from "./ShopListBoxItem";
import { ShopItemType, SelectedItemsType, ShopAllItemType } from "../../types/ShopType";

interface ShopListBoxProps {
  selectTab: number;
  selectedItems: SelectedItemsType;
  setSelectedItems: (items: (prevItems: SelectedItemsType) => SelectedItemsType) => void;
  shopAllItem: ShopAllItemType;
}

export const ShopListBox = ({ selectTab, selectedItems, setSelectedItems, shopAllItem }: ShopListBoxProps) => {
  const [curViewItems, setCurViewItems] = useState<ShopItemType[]>([]);

  useEffect(() => {
    switch (selectTab) {
      case SHOP_ITEM_CATEGORY_MAP.CAP:
        setCurViewItems(shopAllItem.capList);
        break;
      case SHOP_ITEM_CATEGORY_MAP.FACE:
        setCurViewItems(shopAllItem.faceList);
        break;
      case SHOP_ITEM_CATEGORY_MAP.CLOTHING:
        setCurViewItems(shopAllItem.clothingList);
        break;
    }
  }, [selectTab]);

  return (
    <div className="3xl:w-[1140px] w-[912px] 3xl:h-[540px] h-[432px] flex flex-wrap overflow-scroll 3xl:my-[20px] my-[16px]">
      {curViewItems.map((item) => {
        return (
          <ShopListBoxItem
            item={item}
            category={selectTab}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            key={item.itemSeq}
          />
        );
      })}
    </div>
  );
};
