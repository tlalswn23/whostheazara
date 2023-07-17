import { HomeBtn } from "./HomeBtn";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";

interface HomeSideMenuProps {
  showModalHandler: (type: number) => void;
}

const HomeSideMenu = ({ showModalHandler }: HomeSideMenuProps) => {
  return (
    <aside className="absolute bottom-[60px] ml-[60px] flex flex-col l">
      <HomeBtn text="로그인" color="yellow" onClick={() => showModalHandler(ModalCategoryMap.Login)} />
      <HomeBtn text="회원가입" color="none" onClick={() => showModalHandler(ModalCategoryMap.SignUp)} />
      <HomeBtn text="비밀번호 찾기" color="none" onClick={() => showModalHandler(ModalCategoryMap.FindPw)} />
      <HomeBtn text="게임 설명" color="none" onClick={() => showModalHandler(ModalCategoryMap.GameDescription)} />
    </aside>
  );
};

export default HomeSideMenu;
