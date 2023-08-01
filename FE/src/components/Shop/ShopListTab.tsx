import { TAB_MAP } from "../../constants/Shop/TabMap";
import { ShopListTabItem } from "./ShopListTabItem";

interface ShopListTabProps {
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTab = ({ selectTab, setSelectTab }: ShopListTabProps) => {
  const tabList = [0, 1, 2];
  return (
    <div className="flex w-[100%] justify-center mt-[10px]">
      {tabList.map((item) => (
        <ShopListTabItem index={item} selectTab={selectTab} setSelectTab={setSelectTab} key={item} />
      ))}
    </div>
  );
};
