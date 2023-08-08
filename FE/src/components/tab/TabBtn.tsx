import { tabTitleMap } from "../../constants/home/ShowTabType";

interface TabBtnProps {
  tabType: number;
  isActive: boolean;
  setCurTabType: React.Dispatch<React.SetStateAction<number>>;
}
const TabBtn = ({ tabType, isActive, setCurTabType }: TabBtnProps) => {
  return (
    <div
      className={`${
        isActive ? "text-amber-400" : "text-white"
      } 3xl:w-[192px] w-[153.6px] 3xl:h-[64px] h-[51.2px] bg-black rounded-tl-2xl rounded-tr-2xl 3xl:border-[8px] border-[6.4px] 3xl:border-b-[0px] border-b-[0px] border-white text-center 3xl:pt-[8px] pt-[6.4px] 3xl:text-[28px] text-[22.4px] cursor-pointer hover:text-amber-200 transition-colors duration-500`}
      onClick={() => setCurTabType(tabType)}
    >
      {tabTitleMap[tabType]}
    </div>
  );
};
export default TabBtn;
