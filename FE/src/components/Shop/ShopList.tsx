import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState } from "react";

export const ShopList = () => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  return (
    <div className="w-[60%] h-full bg-gray-800 flex flex-col">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox selectTab={selectTab} />
    </div>
  );
};
