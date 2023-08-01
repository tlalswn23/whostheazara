import { useState, useEffect } from "react";
import { TAB_MAP } from "../../constants/Shop/TabMap";
import { CAP_MAP, CLOTHING_MAP, FACE_MAP } from "../../constants/Shop/ShopListMap";
import { ShopListBoxItem } from "./ShopListBoxItem";

interface ShopListBoxPorps {
  selectTab: number;
}

export const ShopListBox = ({ selectTab }: ShopListBoxPorps) => {
  const [shopItem, setShopItem] = useState([{}]);

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
    <>
      <div className="flex flex-wrap">
        {/* {shopItem.map((item) => (
          <ShopListBoxItem />
        ))} */}
      </div>
    </>
  );
};
