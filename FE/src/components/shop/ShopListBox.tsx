import { useState, useEffect } from "react";
import { TAB_MAP } from "../../constants/shop/TabMap";
import { CAP_MAP, CLOTHING_MAP, FACE_MAP } from "../../constants/shop/ShopListMap";
import { ShopListBoxItem } from "./ShopListBoxItem";

interface ShopListBoxPorps {
  selectTab: number;
  setSeletItem: (num: number) => void;
}

interface ShopListMap {
  img: string;
  cost: number;
}

export const ShopListBox = ({ selectTab, setSeletItem }: ShopListBoxPorps) => {
  const [shopItem, setShopItem] = useState<ShopListMap[]>(CAP_MAP);

  useEffect(() => {
    if (selectTab === TAB_MAP.CAP) {
      setShopItem(CAP_MAP);
    } else if (selectTab === TAB_MAP.FACE) {
      setShopItem(FACE_MAP);
    } else if (selectTab === TAB_MAP.CLOTHING) {
      setShopItem(CLOTHING_MAP);
    }
  }, [selectTab]);

  return (
    <div className="w-full h-full flex flex-wrap overflow-scroll cursor-pointer">
      {shopItem.map((item, index) => {
        return index > 0 && <ShopListBoxItem item={item} key={index} />;
      })}
    </div>
  );
};
