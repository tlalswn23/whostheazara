import rabbitImg from "../../assets/img/rabbitImg.png";
import btnImg from "../../assets/img/blackBtnImg.png";

interface lobbySideMenuProps {
  onSetViewMain: (num: number) => void;
  viewMain: number;
}

const LobbySideMenu = ({ viewMain, onSetViewMain }: lobbySideMenuProps) => {
  return (
    <aside className="absolute bottom-[80px] left-[100px] ml-[60px] flex flex-col leading-[140px] text-center">
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
        className={`w-[400px] h-[200px] bg-contain bg-no-repeat bg-center relative flex items-center justify-center`}
        style={{ backgroundImage: `url(${btnImg})` }}
      >
        <input
          type="text"
          className="w-[340px] h-[90px] text-[48px] text-center bg-black text-white underline"
          placeholder="방 번호 입력"
          maxLength={6}
        ></input>
        {/* <p className="text-white text-[48px] w-full ">내 프로필</p> */}
      </div>
      <img src={rabbitImg} className="absolute z-index-5 left-[40px] top-[-220px] w-[310px]" />
    </aside>
  );
};

export default LobbySideMenu;
