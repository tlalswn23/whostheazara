import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import mainRabbit from "../assets/img/RabbitOnly.png";
import mainTitle from "../assets/img/WhoIsZARA.gif";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="relative w-[100vw] h-[100vh] bg-black">
      <img src={mainTitle} className="absolute w-[42.5%] top-[5%] left-[2.5%]" />
      <div className="absolute h-[90%] top-[5%] right-[2.5%]">
        <HomeEye />
        <img src={mainRabbit} className="h-full" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
