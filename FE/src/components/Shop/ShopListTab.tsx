import { ShopListTabItem } from "./ShopListTabItem";

interface ShopListTabProps {
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTab = ({ selectTab, setSelectTab }: ShopListTabProps) => {
  const tabList = ["모자", "얼굴", "의상"];
  return (
    <div className="flex w-[100%] justify-around">
      {tabList.map((item, index) => (
        <ShopListTabItem index={index} text={item} selectTab={selectTab} setSelectTab={setSelectTab} />
      ))}
    </div>
  );
};
