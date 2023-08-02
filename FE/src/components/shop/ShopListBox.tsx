import { useState, useEffect } from "react";
import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopListBoxItem } from "./ShopListBoxItem";
import { ShopType } from "../../types/ShopType";

interface ShopListBoxPorps {
  selectTab: number;
  selectItem: number;
  setSelectItem: (num: number) => void;
  shopAllItem: ShopType;
}
interface ShopItemType {
  itemSeq: number;
  price: number;
  image: string;
  sold: boolean;
}

export const ShopListBox = ({ selectTab, selectItem, setSelectItem, shopAllItem }: ShopListBoxPorps) => {
  const [shopItem, setShopItem] = useState<ShopItemType[]>([]);

  useEffect(() => {
    if (selectTab === TAB_MAP.CAP) {
      setShopItem(shopAllItem.cap);
    } else if (selectTab === TAB_MAP.FACE) {
      setShopItem(shopAllItem.face);
    } else if (selectTab === TAB_MAP.CLOTHING) {
      setShopItem(shopAllItem.clothing);
    }
  }, [selectTab, shopAllItem]);

  return (
    <div className="w-full 3xl:max-h-[540px] max-h-[432px] flex flex-wrap overflow-scroll my-[20px]">
      {shopItem.map((item, index) => {
        return (
          index > 0 && (
            <ShopListBoxItem
              item={item}
              index={index}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              key={index}
            />
          )
        );
      })}
    </div>
  );
};
