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
      <div className="w-[240px] h-[240px] my-[20px] flex flex-wrap ml-[36px]">
        <p className="w-[100%] h-[80%] bg-cyan-400">{item.img}</p>
        <p className="w-[100%] h-[20%] bg-gray-200 text-center text-[28px]">{item.cost} $</p>
      </div>
    </>
  );
};
