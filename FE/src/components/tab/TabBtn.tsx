import { tabTitleMap } from "../../constants/ShowTabType";

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
      } w-56 h-20 bg-black rounded-tl-2xl rounded-tr-2xl border-8 border-b-0 border-white text-center pt-4 text-3xl cursor-pointer hover:text-amber-200 transition-colors duration-500`}
      onClick={() => setCurTabType(tabType)}
    >
      {tabTitleMap[tabType]}
    </div>
  );
};
export default TabBtn;
