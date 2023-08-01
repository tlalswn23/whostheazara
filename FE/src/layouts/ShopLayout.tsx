import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import MotionLayout from "./MotionLayout";

export const ShopLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <MotionLayout>
      <div className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] overflow-hidden flex`}>
        {children}
      </div>
    </MotionLayout>
  );
};
