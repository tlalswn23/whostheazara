import { TAB_MAP } from "../../constants/Shop/TabMap";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState } from "react";

export const ShopList = () => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  return (
    <>
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox selectTab={selectTab} />
    </>
  );
};
