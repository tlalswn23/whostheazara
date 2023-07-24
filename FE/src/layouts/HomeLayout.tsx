import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import mainRabbit from "../assets/img/RabbitOnly.png";
import mainTitle from "../assets/img/WhoIsZARA.gif";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="relative w-[1920px] h-[1080px] bg-black">
      <img src={mainTitle} className="absolute w-[600px] top-[40px] left-[40px]" />
      <div className="absolute h-[860px] top-[40px] left-[800px]">
        <HomeEye />
        <img src={mainRabbit} className="h-full" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
