import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import mainRabbit from "../assets/img/RabbitOnly.png";
import mainTitle from "../assets/img/WhoIsZARA.gif";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="relative w-[1920px] h-[1080px] bg-black flex justify-center items-center">
      <div className="flex flex-col w-full h-full justify-start mt-[120px] ml-[40px]">
        <img src={mainTitle} className="w-[800px] h-auto" />
        <div className="mt-[160px] ml-[140px]">{children}</div>
      </div>
      <div className="relative min-w-[980px] mr-[40px] flex justify-end ">
        <HomeEye />
        <img src={mainRabbit} className="h-full" />
      </div>
    </div>
  );
};

export default HomeLayout;
