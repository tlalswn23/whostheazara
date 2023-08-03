import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopType } from "../../types/ShopType";
import { ShopListBottom } from "./ShopListBottom";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState, useEffect } from "react";

interface ShopListProps {
  changeItem: (index: number, num: number) => void;
  selectList: [cap: number, face: number, clothing: number];
  shopAllItem: ShopType;
  coin: number;
}

export const ShopList = ({ changeItem, selectList, shopAllItem, coin }: ShopListProps) => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  const [selectItem, setSelectItem] = useState(0);

  useEffect(() => {
    setSelectItem(selectList[selectTab]);
  }, [selectTab]);

  useEffect(() => {
    changeItem(selectTab, selectItem);
  }, [selectItem]);

  return (
    <div className="w-[60%] h-full flex flex-col">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox
        selectTab={selectTab}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
        shopAllItem={shopAllItem}
      />
      <ShopListBottom coin={coin} />
    </div>
  );
};
