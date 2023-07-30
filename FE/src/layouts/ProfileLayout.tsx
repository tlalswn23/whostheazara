import profileBg from "../assets/img/profileBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import MotionLayout from "./MotionLayout";

const ProfileLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <MotionLayout>
      <div
        className={`3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] flex justify-center items-center bg-cover`}
        style={{ backgroundImage: `url("${profileBg}")` }}
      >
        {children}
      </div>
    </MotionLayout>
  );
};

export default ProfileLayout;
