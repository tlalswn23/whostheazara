import { HomeBtn } from "./HomeBtn";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAllToken } from "../../utils/cookie";
import { useIsLoginState } from "../../context/loginContext";

interface HomeSideMenuProps {
  showModalHandler: (type: number) => void;
}

const HomeSideMenu = ({ showModalHandler }: HomeSideMenuProps) => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useIsLoginState();
  const onLogout = () => {
    toast.success("로그아웃 되었습니다.");
    removeAllToken();
    setIsLogin(false);
  };

  return isLogin ? (
    <aside className="absolute bottom-[60px] ml-[60px] flex flex-col l">
      <HomeBtn text="로비입장" color="yellow" onClick={() => navigate("/lobby")} />
      <HomeBtn text="로그아웃" color="none" onClick={onLogout} />
      <HomeBtn text="게임설명" color="none" onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  ) : (
    <aside className="absolute bottom-[60px] ml-[60px] flex flex-col l">
      <HomeBtn text="로그인" color="yellow" onClick={() => showModalHandler(Modal_Category_Map.LOGIN)} />
      <HomeBtn text="회원가입" color="none" onClick={() => showModalHandler(Modal_Category_Map.SIGNUP)} />
      <HomeBtn text="비밀번호 찾기" color="none" onClick={() => showModalHandler(Modal_Category_Map.RESET_PASSWORD)} />
      <HomeBtn text="게임설명" color="none" onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  );
};

export default HomeSideMenu;
