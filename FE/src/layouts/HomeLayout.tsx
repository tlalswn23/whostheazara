import mainImg from "../assets/img/mainImg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className="w-full h-screen bg-contain bg-black  bg-no-repeat  bg-center relative"
      style={{ backgroundImage: `url(${mainImg})` }}
    >
      {children}
    </div>
  );
};

export default HomeLayout;
