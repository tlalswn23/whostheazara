import mainImg from "../assets/img/mainImg.gif";
import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <>
      <div
        className={`w-full h-screen bg-contain bg-black  bg-no-repeat  bg-center relative`}
        style={{ backgroundImage: `url(${mainImg})` }}
      >
        {children}
      </div>
      <HomeEye />
    </>
  );
};

export default HomeLayout;
