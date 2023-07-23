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

  setIsLogin(false); // 테스트

  return isLogin ? (
    <aside className="absolute bottom-[300px] left-[140px]">
      <HomeBtn text="로비입장" index={3} onClick={() => navigate("/lobby")} />
      <HomeBtn text="로그아웃" index={4} onClick={onLogout} />
      <HomeBtn text="게임설명" index={5} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  ) : (
    <aside className="absolute bottom-[300px] left-[140px]">
      <HomeBtn text="로그인" index={0} onClick={() => showModalHandler(Modal_Category_Map.LOGIN)} />
      <HomeBtn text="회원가입" index={1} onClick={() => showModalHandler(Modal_Category_Map.SIGNUP)} />
      <HomeBtn text="게임설명" index={2} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  );
};

export default HomeSideMenu;
