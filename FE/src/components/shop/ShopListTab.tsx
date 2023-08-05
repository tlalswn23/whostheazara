import { ShopListTabItem } from "./ShopListTabItem";
import backImg from "../../assets/img/shop/backImg.png";
import { Link } from "react-router-dom";
import { SHOP_ITEM_CATEGORY_MAP } from "../../constants/shop/ShopItemCategoryMap";

interface ShopListTabProps {
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTab = ({ selectTab, setSelectTab }: ShopListTabProps) => {
  const tabList = [SHOP_ITEM_CATEGORY_MAP.CAP, SHOP_ITEM_CATEGORY_MAP.FACE, SHOP_ITEM_CATEGORY_MAP.CLOTHING];
  return (
    <div className="flex w-[100%] justify-center 3xl:my-[10px] my-[8px]">
      {tabList.map((item) => (
        <ShopListTabItem index={item} selectTab={selectTab} setSelectTab={setSelectTab} key={item} />
      ))}
      <Link to="/lobby" className="3xl:w-[120px] w-[96px] 3xl:mr-[90px] mr-[72px]">
        <div
          className={`bg-gray-700  hover:scale-125 duration-500 3xl:w-[120px] w-[96px] 3xl:h-[100px] h-[80px] flex justify-center items-center cursor-pointer rounded-2xl 3xl:mx-[40px] mx-[32px] border-solid border-white 3xl:border-[8px] border-[6.4px] shadow-black shadow-lg"
        }`}
        >
          <img src={backImg} className="w-full 3xl:p-[20px] p-[16px]" />
        </div>
      </Link>
    </div>
  );
};
