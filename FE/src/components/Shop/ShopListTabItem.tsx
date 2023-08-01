import face from "../../assets/img/shop/face.png";
import cap from "../../assets/img/shop/cap.png";
import clothing from "../../assets/img/shop/cloth.png";

interface ShopListTabItemProps {
  index: number;
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTabItem = ({ index, selectTab, setSelectTab }: ShopListTabItemProps) => {
  const tabImg = [cap, face, clothing];
  return (
    <>
      <div
        className={`w-[240px] h-[100px] bg-yellow-100 flex justify-center items-center text-[32px] font-bold cursor-pointer rounded-lg mx-[40px] ${
          index === selectTab && "bg-yellow-400"
        }`}
        onClick={() => setSelectTab(index)}
      >
        <img src={tabImg[index]} className="h-full " />
      </div>
    </>
  );
};
