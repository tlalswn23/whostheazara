import profileBg from "../assets/img/profileBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const ProfileLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className={`w-full h-screen bg-contain bg-black bg-no-repeat bg-center relative`} // bg-black 제거
      style={{ backgroundImage: `url(${profileBg})` }}
    >
      {children}
    </div>
  );
};

export default ProfileLayout;
