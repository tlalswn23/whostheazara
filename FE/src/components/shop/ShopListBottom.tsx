import coinImg from "../../assets/img/shop/coin.png";
import reset from "../../assets/img/shop/reset.png";

interface ShopListBottomProps {
  coin: number;
}

export const ShopListBottom = ({ coin }: ShopListBottomProps) => {
  return (
    <div className="flex w-full items-center px-[20px] pt-[10px]">
      <div className="w-[700px] h-[160px] flex text-[40px] text-yellow-300 justify-center">
        <div className="flex items-center flex-wrap justify-center">
          <p className="text-green-200">보유 금액</p>
          <div className="flex items-center">
            <img src={coinImg} className="w-[80px]" />
            <p className="pr-[20px]">{coin}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-[80px] mx-[10px] font-bold text-white">-</p>
        </div>
        <div className="flex items-center flex-wrap justify-center">
          <p className="text-green-200">총 비용 </p>
          <div className="flex items-center">
            <img src={coinImg} className="w-[80px]" />
            <p className="pr-[20px]">100</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-[80px] mx-[10px] font-bold text-white">=</p>
        </div>
        <div className="flex items-center flex-wrap justify-center">
          <p className="text-green-200">남은 금액</p>
          <div className="flex items-center">
            <img src={coinImg} className="w-[80px]" />
            <p className="pr-[20px]"> 150</p>
          </div>
        </div>
      </div>
      <div className="w-[180px] h-[130px] border-solid border-[10px] border-white flex justify-center items-center text-[48px] text-black bg-yellow-200 rounded-2xl mx-[40px]">
        <p className="">구매</p>
      </div>
      <div className="w-[120px] bg-green-200 border-solid border-[10px] rounded-3xl flex justify-center items-center p-[10px]">
        <img src={reset} />
      </div>
    </div>
  );
};
