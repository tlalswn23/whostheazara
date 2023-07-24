import profileBg from "../assets/img/profileBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const ProfileLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className={`w-[1920px] h-[970px] flex justify-center items-center`}
      style={{ backgroundImage: `url(${profileBg})` }}
    >
      {children}
    </div>
  );
};

export default ProfileLayout;
