interface ShopListTabItemProps {
  index: number;
  text: string;
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTabItem = ({ index, text, selectTab, setSelectTab }: ShopListTabItemProps) => {
  return (
    <>
      <div
        className={`w-[300px] h-[100px] bg-yellow-200 flex justify-center items-center text-[32px] font-bold cursor-pointer ${
          index === selectTab && "bg-green-200"
        }`}
        onClick={() => setSelectTab(index)}
      >
        <p>{text}</p>
      </div>
    </>
  );
};
