import zaraImg from "../../assets/img/profile/zaraImg.png";
import btnImg from "../../assets/img/common/blackBtnImg.png";
import { PROFILE_MAP } from "../../constants/profile/ProfileMap";

interface profileSideMenuProps {
  onSetViewMain: (num: number) => void;
  viewMain: number;
}

const ProfileSideMenu = ({ viewMain, onSetViewMain }: profileSideMenuProps) => {
  return (
    <aside className="relative 3xl:ml-[40px] ml-[32px] flex flex-col text-center">
      <img
        src={zaraImg}
        className="absolute 3xl:left-[-74px] left-[-59.2px] 3xl:top-[-120px] top-[-96px] 3xl:w-[200px] w-[160px] cursor-pointer"
        onClick={() => onSetViewMain(PROFILE_MAP.PROFILE_BASIC)}
      />
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(PROFILE_MAP.PROFILE_BASIC)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] hover:text-amber-300 duration-500 w-full ${
            viewMain === PROFILE_MAP.PROFILE_BASIC ||
            viewMain === PROFILE_MAP.PROFILE_DEL_USER ||
            viewMain === PROFILE_MAP.PROFILE_UPDATE
              ? "text-amber-300"
              : ""
          }`}
        >
          내 정보 조회
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(PROFILE_MAP.PROFILE_RECENTLY_DATA)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === PROFILE_MAP.PROFILE_RECENTLY_DATA ? "text-amber-300" : ""
          }`}
        >
          전적 조회
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(PROFILE_MAP.PROFILE_DATA)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === PROFILE_MAP.PROFILE_DATA ? "text-amber-300" : ""
          }`}
        >
          전적 통계
        </p>
      </div>
    </aside>
  );
};

export default ProfileSideMenu;
