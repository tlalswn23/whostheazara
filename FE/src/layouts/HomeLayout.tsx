import mainBg from "../assets/img/mainBg.gif";
import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className="w-full h-screen bg-contain bg-black  bg-no-repeat  bg-center relative"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      {children}
    </div>
  );
};

export default HomeLayout;
