import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import mainRabbit from "../assets/img/RabbitOnly.png";
import mainTitle from "../assets/img/WhoIsZARA.gif";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="w-[1900px] h-[940px] bg-black flex justify-center items-center">
      <div className="flex flex-col w-full h-[900px] justify-start mt-[40px] ml-[40px]">
        <img src={mainTitle} className="w-[720px] h-auto" />
        <div className="mt-[120px] ml-[140px]">{children}</div>
      </div>
      <div className="relative min-w-[860px] mr-[40px] flex justify-end ">
        <HomeEye />
        <img src={mainRabbit} className="h-full" />
      </div>
    </div>
  );
};

export default HomeLayout;
