import React, { useEffect } from "react";
import HomeLayout from "../layouts/HomeLayout";
import HomeSideMenu from "../components/home/HomeSideMenu";
import { Modal_Category_Map } from "../constants/home/ModalCategoryMap";
import LoginFormModal from "../components/modal/LoginFormModal";
import SignupFormModal from "../components/modal/SignupFormModal";
import ResetPwFormModal from "../components/modal/ResetPwFormModal";
import GameDescriptionModal from "../components/modal/GameDescriptionModal";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { Link } from "react-router-dom";
import MainPageBGM from "../assets/sound/bgm/MainPagePGM.wav"

const Home = () => {
  useFetchAccessToken();

  const bgm = new Audio(MainPageBGM);

  bgm.autoplay = true;
  bgm.loop = true;  

  useEffect(() => {
    bgm.play();
  }, [])

  const [curModalType, setCurModalType] = React.useState<number>(Modal_Category_Map.NONE);

  const showModalHandler = (ShowModalType: number) => {
    setCurModalType(ShowModalType);
  };

  return (
    <HomeLayout>
      <Link to="game/1">
        <p className="absolute left-[800px] w-[200px] h-[200px] text-red-200 text-[80px]">TEST</p>
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
