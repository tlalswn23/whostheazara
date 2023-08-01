import blackBtnImg from "../../assets/img/common/blackBtnImg.png";
import { ProfileInputForm } from "./ProfileInputForm";
import useFormField from "../../hooks/useFormField";
import { deleteUser } from "../../api/axios/usersApiCall";
import { toast } from "react-toastify";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useNavigate } from "react-router-dom";
import { removeRefreshToken } from "../../utils/cookie";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { AxiosError } from "axios";

const ProfileDelUser = () => {
  const passwordField = useFormField("");
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const { setAccessToken } = useAccessTokenState();
  const navigate = useNavigate();

  const onDeleteUser = async () => {
    if (!confirmPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await deleteUser(passwordField.value);
      removeRefreshToken();
      setAccessToken("");
      navigate("/");
    } catch (error) {
      const { status } = (error as AxiosError).response!;
      if (status === ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN) {
        toast.error("다시 로그인 해주세요.");
        navigate("/home");
      }
    }
  };
  return (
    <div className=" 3xl:p-[80px] p-[64px] 3xl:text-[48px] text-[38px] flex flex-col justify-around items-center h-full">
      <ProfileInputForm text="비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
      <ProfileInputForm
        text="비밀번호 확인"
        handleChange={confirmPasswordField.onChange}
        value={confirmPasswordField.value}
      />

      <div
        className="absolute  cursor-pointer 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-50px] right-[40px] 3xl:text-[52px] text-[41px]"
        onClick={onDeleteUser}
      >
        <img src={blackBtnImg} className="absolute " />
        <p className="absolute font-bold text-red-300">탈퇴 하기</p>
      </div>
    </div>
  );
};
export default ProfileDelUser;
