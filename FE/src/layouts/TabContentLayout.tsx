import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const TabContentLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="border-8 border-white text-white flex-1 text-4xl p-12 bg-black  overflow-hidden">{children}</div>
  );
};
export default TabContentLayout;
