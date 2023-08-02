import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState, useEffect } from "react";

interface ShopListProps {
  changePreview: (index: number, num: number) => void;
  outfit: [cap: number, face: number, clothing: number];
}

export const ShopList = ({ changePreview, outfit }: ShopListProps) => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  const [selectItem, setSelectItem] = useState(0);

  useEffect(() => {
    setSelectItem(outfit[selectTab]);
  }, [selectTab]);

  useEffect(() => {
    changePreview(selectTab, selectItem);
  }, [selectItem]);

  return (
    <div className="w-[60%] h-full flex flex-col">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox selectTab={selectTab} selectItem={selectItem} setSelectItem={setSelectItem} />
    </div>
  );
};
