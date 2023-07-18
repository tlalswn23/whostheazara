import { Link } from "react-router-dom";
import lobbyBackButtonImg from "../../assets/img/lobbyBackButtonImg.png";
import lobbyLeftArrow from "../../assets/img/lobbyLeftArrow.png";

export const LobbyBack = () => {
  return (
    <div className="absolute w-[300px] h-[100px] top-[30px] right-[88px]">
      <img src={lobbyBackButtonImg} className="absolute w-full h-full bg-black" />
      <div>
        <img src={lobbyLeftArrow} className="absolute top-[22px] left-[24px] w-[56px]" />
        <Link to="/" className="absolute top-[0px] left-[0px] w-full text-white text-[42px] pl-[88px] py-[18px]">
          뒤로 가기
        </Link>
      </div>
    </div>
  );
};
