import zaraImg from "../../assets/img/zaraImg.png";
import btnImg from "../../assets/img/blackBtnImg.png";
interface profileSideMenuProps {
  onSetViewMain: (num: number) => void;
  viewMain: number;
}

const ProfileSideMenu = ({ viewMain, onSetViewMain }: profileSideMenuProps) => {
  return (
    <aside className="relative ml-[40px] flex flex-col text-center">
      <img
        src={zaraImg}
        className="absolute 3xl:left-[-74px] left-[-50px] 3xl:top-[-130px] top-[-84px] 3xl:w-[200px] w-[140px]"
      />
      <div
        className={`3xl:w-[400px] w-[300px] 3xl:h-[174px] h-[140px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(1)}
      >
        <p className={`text-white 3xl:text-[48px] text-[36px] w-full ${viewMain === 1 ? "text-yellow-200" : ""}`}>
          비밀번호 변경
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[300px] 3xl:h-[174px] h-[140px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(2)}
      >
        <p className={`text-white 3xl:text-[48px] text-[36px] w-full ${viewMain === 2 ? "text-yellow-200" : ""}`}>
          게임전적조회
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[300px] 3xl:h-[174px] h-[140px] bg-contain bg-no-repeat bg-center flex items-center justify-center`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(3)}
      >
        <p className={`text-white 3xl:text-[48px] text-[36px] w-full ${viewMain === 3 ? "text-yellow-200" : ""}`}>
          게임전적통계
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[300px] 3xl:h-[174px] h-[140px] bg-contain bg-no-repeat bg-center flex items-center justify-center`}
        style={{ backgroundImage: `url("${btnImg}")` }}
        onClick={() => onSetViewMain(4)}
      >
        <p className={`text-white 3xl:text-[48px] text-[36px] w-full ${viewMain === 4 ? "text-red-600" : ""}`}>
          회원 탈퇴
        </p>
      </div>
    </aside>
  );
};

export default ProfileSideMenu;
