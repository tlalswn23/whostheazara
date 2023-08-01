import coin from "../../assets/img/shop/coin.png";

interface itemInfo {
  img: string;
  cost: number;
}
interface ShopListBoxItemProps {
  item: itemInfo;
}

export const ShopListBoxItem = ({ item }: ShopListBoxItemProps) => {
  return (
    <>
      <div className="w-[240px] h-[240px] my-[18px] flex flex-wrap ml-[36px] border-solid border-sky-200 border-[8px] rounded-xl">
        <div className="w-[100%] h-[80%] rounded-t-md bg-gray-300">{item.img}</div>
        <div className="flex justify-center w-full bg-black items-center">
          <img className="w-auto h-[40px]" src={coin} />
          <p className="text-yellow-400 font-bold text-center text-[28px] rounded-b-md">{item.cost}</p>
        </div>
      </div>
    </>
  );
};
