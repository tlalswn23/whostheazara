import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import HomeSideMenu from "../components/home/HomeSideMenu";
import { Modal_Category_Map } from "../constants/home/ModalCategoryMap";
import LoginFormModal from "../components/modal/LoginFormModal";
import SignupFormModal from "../components/modal/SignupFormModal";
import ResetPwFormModal from "../components/modal/ResetPwFormModal";
import GameDescriptionModal from "../components/modal/GameDescriptionModal";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { Link } from "react-router-dom";

const Home = () => {
  useFetchAccessToken();

  const [curModalType, setCurModalType] = React.useState<number>(Modal_Category_Map.NONE);

  const showModalHandler = (ShowModalType: number) => {
    setCurModalType(ShowModalType);
  };

  return (
    <HomeLayout>
      <Link to="game/1">
        <p className="absolute top-[0px] left-[400px] w-[200px] h-[200px] text-red-200 text-[50px]">예찬(1)</p>
      </Link>
      <Link to="game/2">
        <p className="absolute top-[0px] left-[600px] w-[200px] h-[200px] text-green-200 text-[50px]">제성(2)</p>
      </Link>
      <Link to="game/3">
        <p className="absolute top-[0px] left-[800px] w-[200px] h-[200px] text-sky-200 text-[50px]">슬호(3)</p>
      </Link>
      <HomeSideMenu showModalHandler={showModalHandler} />
      <LoginFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <SignupFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <ResetPwFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <GameDescriptionModal curModalType={curModalType} showModalHandler={showModalHandler} />
    </HomeLayout>
  );
};

export default Home;
