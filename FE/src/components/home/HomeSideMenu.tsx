import { HomeBtn } from "./HomeBtn";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccessTokenState } from "../../context/accessTokenContext";
interface HomeSideMenuProps {
  showModalHandler: (type: number) => void;
}

const HomeSideMenu = ({ showModalHandler }: HomeSideMenuProps) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAccessTokenState();

  const onLogout = () => {
    // TODO: 로그아웃 api 호출
    setAccessToken("");
    toast.success("로그아웃 되었습니다.");
  };

  return accessToken ? (
    <aside className="relative">
      <HomeBtn text="로비입장" index={3} onClick={() => navigate("/lobby")} />
      <HomeBtn text="로그아웃" index={4} onClick={onLogout} />
      <HomeBtn text="게임설명" index={5} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  ) : (
    <aside className="relative">
      <HomeBtn text="로그인" index={0} onClick={() => showModalHandler(Modal_Category_Map.LOGIN)} />
      <HomeBtn text="회원가입" index={1} onClick={() => showModalHandler(Modal_Category_Map.SIGNUP)} />
      <HomeBtn text="게임설명" index={2} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  );
};

export default HomeSideMenu;
