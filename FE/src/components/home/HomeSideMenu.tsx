import { HomeBtn } from "./HomeBtn";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";
import { logout } from "../../api/users/usersApiCall";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface HomeSideMenuProps {
  showModalHandler: (type: number) => void;
}

const HomeSideMenu = ({ showModalHandler }: HomeSideMenuProps) => {
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  console.log(cookies);
  return cookies ? (
    <aside className="absolute bottom-[60px] ml-[60px] flex flex-col l">
      <HomeBtn text="로비입장" color="yellow" onClick={() => navigate("/lobby")} />
      <HomeBtn text="로그아웃" color="none" onClick={() => logout()} />
      <HomeBtn text="게임설명" color="none" onClick={() => showModalHandler(ModalCategoryMap.GameDescription)} />
    </aside>
  ) : (
    <aside className="absolute bottom-[60px] ml-[60px] flex flex-col l">
      <HomeBtn text="로그인" color="yellow" onClick={() => showModalHandler(ModalCategoryMap.Login)} />
      <HomeBtn text="회원가입" color="none" onClick={() => showModalHandler(ModalCategoryMap.SignUp)} />
      <HomeBtn text="비밀번호 찾기" color="none" onClick={() => showModalHandler(ModalCategoryMap.FindPw)} />
      <HomeBtn text="게임설명" color="none" onClick={() => showModalHandler(ModalCategoryMap.GameDescription)} />
    </aside>
  );
};

export default HomeSideMenu;
