import { ShopListTabItem } from "./ShopListTabItem";

interface ShopListTabProps {
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTab = ({ selectTab, setSelectTab }: ShopListTabProps) => {
  const tabList = [0, 1, 2];
  return (
    <div className="flex w-[100%] justify-center 3xl:my-[10px] my-[8px]">
      {tabList.map((item) => (
        <ShopListTabItem index={item} selectTab={selectTab} setSelectTab={setSelectTab} key={item} />
      ))}
    </div>
  );
};
