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
    <div className="3xl:w-[1140px] w-[912px] 3xl:h-[540px] h-[432px] flex flex-wrap overflow-scroll 3xl:my-[20px] my-[16px]">
      {shopItem.map((item, index) => {
        return (
          index > 0 &&
          item.sold && (
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
      {shopItem.map((item, index) => {
        return (
          index > 0 &&
          !item.sold && (
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
