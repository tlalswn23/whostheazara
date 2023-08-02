import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState } from "react";

interface ShopListProps {
  changePreview: (index: number, num: number) => void;
}

export const ShopList = ({ changePreview }: ShopListProps) => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  const [seletItem, setSeletItem] = useState(0);

  return (
    <div className="w-[60%] h-full flex flex-col">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox selectTab={selectTab} setSeletItem={setSeletItem} />
    </div>
  );
};
