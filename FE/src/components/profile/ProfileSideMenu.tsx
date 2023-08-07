import zaraImg from "../../assets/img/profile/zaraImg.png";
import btnImg from "../../assets/img/common/blackBtnImg.png";
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
        onClick={() => onSetViewMain(0)}
      />
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(0)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] hover:text-amber-300 duration-500 w-full ${
            viewMain === 0 || viewMain === 1 || viewMain === 4 ? "text-amber-300" : ""
          }`}
        >
          내 정보 조회
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(2)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === 2 ? "text-amber-300" : ""
          }`}
        >
          전적 조회
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(3)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === 3 ? "text-amber-300" : ""
          }`}
        >
          전적 통계
        </p>
      </div>
    </aside>
  );
};

export default ProfileSideMenu;
