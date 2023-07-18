import rabbitImg from "../../assets/img/rabbitImg.png";
import btnImg from "../../assets/img/lobbyBlackBtnImg.png";

interface lobbySideMenuProps {
  onSetViewMain: (num: number) => void;
  viewMain: number;
}

const LobbySideMenu = ({ viewMain, onSetViewMain }: lobbySideMenuProps) => {
  return (
    <aside className="absolute bottom-[80px] left-[100px] ml-[60px] flex flex-col leading-[180px] text-center">
      <div
        className={`w-[400px] h-[200px] bg-contain bg-no-repeat bg-center relative flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url(${btnImg})` }}
        onClick={() => onSetViewMain(1)}
      >
        <p className={`text-white text-[48px] w-full ${viewMain === 1 ? "text-yellow-200" : ""}`}>방 만들기</p>
      </div>
      <div
        className={`w-[400px] h-[200px] bg-contain bg-no-repeat bg-center relative flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url(${btnImg})` }}
        onClick={() => onSetViewMain(2)}
      >
        <p className={`text-white text-[48px] w-full ${viewMain === 2 ? "text-yellow-200" : ""}`}>방 찾기</p>
      </div>
      <div
        className={`w-[400px] h-[200px] bg-contain bg-no-repeat bg-center relative flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url(${btnImg})` }}
      >
        <p className="text-white text-[48px] w-full ">내 프로필</p>
      </div>
      <img src={rabbitImg} className="absolute z-index-5 left-[20px] top-[-220px] w-[310px]" />
    </aside>
  );
};

export default LobbySideMenu;
