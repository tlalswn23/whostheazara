import coin from "../../assets/img/shop/coin.png";

interface itemInfo {
  itemSeq: number;
  price: number;
  image: string;
  sold: boolean;
}
interface ShopListBoxItemProps {
  item: itemInfo;
  index: number;
  selectItem: number;
  setSelectItem: (num: number) => void;
}

export const ShopListBoxItem = ({ item, index, selectItem, setSelectItem }: ShopListBoxItemProps) => {
  const onClickItem = () => {
    if (selectItem === index) {
      setSelectItem(0);
    } else {
      setSelectItem(index);
    }
  };
  return (
    <>
      <div
        className={`3xl:w-[240px] w-[192px] 3xl:h-[240px] h-[192px] 3xl:my-[15px] my-[12px] flex flex-wrap 3xl:ml-[36px] ml-[28.8px] border-solid 3xl:border-[8px] border-[6.4px] rounded-xl cursor-pointer ${
          index === selectItem && "border-yellow-400"
        }`}
        onClick={() => onClickItem()}
      >
        <div className="w-[100%] h-[80%] rounded-t-md bg-gray-400">
          <img src={`data:image/png;base64,${item.image}`} />
        </div>
        <div className="flex justify-center w-full bg-black items-center">
          <img className="w-auto 3xl:h-[40px] h-[32px]" src={coin} />
          <p className="text-yellow-400 font-bold text-center 3xl:text-[28px] text-[22.4px] rounded-b-md">
            {item.price}
          </p>
        </div>
      </div>
    </>
  );
};
