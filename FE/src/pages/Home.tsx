import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import HomeSideMenu from "../components/home/HomeSideMenu";
import { ModalCategoryMap } from "../constants/ModalCategoryMap";
import LoginFormModal from "../components/modal/LoginFormModal";
import SignupFormModal from "../components/modal/SignupFormModal";
import FindPwFormModal from "../components/modal/FindPwFormModal";
import GameDescriptionModal from "../components/modal/GameDescriptionModal";

const Home = () => {
  const [curModalType, setCurModalType] = React.useState<number>(ModalCategoryMap.None);

  const showModalHandler = (ShowModalType: number) => {
    setCurModalType(ShowModalType);
  };

  return (
    <HomeLayout>
      <HomeSideMenu showModalHandler={showModalHandler} />
      <LoginFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <SignupFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <FindPwFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <GameDescriptionModal curModalType={curModalType} showModalHandler={showModalHandler} />
    </HomeLayout>
  );
};

export default Home;
