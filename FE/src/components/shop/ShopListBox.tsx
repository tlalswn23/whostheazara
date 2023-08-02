import { useState, useEffect } from "react";
import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopListBoxItem } from "./ShopListBoxItem";
import axios from "axios";

interface ShopListBoxPorps {
  selectTab: number;
  selectItem: number;
  setSelectItem: (num: number) => void;
}

interface ShopType {
  cap: ShopItemType[];
  face: ShopItemType[];
  clothing: ShopItemType[];
}

interface ShopItemType {
  itemSeq: number;
  price: number;
  image: string;
  sold: boolean;
}

export const ShopListBox = ({ selectTab, selectItem, setSelectItem }: ShopListBoxPorps) => {
  const [shopItem, setShopItem] = useState<ShopItemType[]>([]);
  const [shopAllItem, setShopAllItem] = useState<ShopType>({ cap: [], face: [], clothing: [] });
  const custom = {
    cap: [],
    face: [],
    clothing: [],
  };

  useEffect(() => {
    const init = async () => {
      let response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/cap`);
      custom.cap = response.data;
      response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/face`);
      custom.face = response.data;
      response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/clothing`);
      custom.clothing = response.data;

      setShopAllItem(custom);
      setShopItem(custom.cap);
    };

    init();
  }, []);

  useEffect(() => {
    if (selectTab === TAB_MAP.CAP) {
      setShopItem(shopAllItem.cap);
    } else if (selectTab === TAB_MAP.FACE) {
      setShopItem(shopAllItem.face);
    } else if (selectTab === TAB_MAP.CLOTHING) {
      setShopItem(shopAllItem.clothing);
    }
  }, [selectTab]);

  return (
    <div className="w-full h-full flex flex-wrap overflow-scroll cursor-pointer">
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
