import blackBtnImg from "../../assets/img/blackBtnImg.png";
import { ProfileInputForm } from "./ProfileInputForm";
import useFormField from "../../hooks/useFormField";
import { deleteUser } from "../../api/users/usersApiCall";
import { toast } from "react-toastify";
import { useAccessTokenState } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { removeRefreshToken } from "../../utils/cookie";

const ProfileDelUser = () => {
  const passwordField = useFormField("");
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const { accessToken } = useAccessTokenState();
  const navigate = useNavigate();

  const onDeleteUser = async () => {
    if (!confirmPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      await deleteUser(passwordField.value, accessToken);
      removeRefreshToken();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-[80px] text-[48px] flex flex-col justify-around items-center h-full">
      <ProfileInputForm text="비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
      <ProfileInputForm
        text="비밀번호 확인"
        handleChange={confirmPasswordField.onChange}
        value={confirmPasswordField.value}
      />

      <div
        className="absolute  cursor-pointer w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px] text-[52px]"
        onClick={onDeleteUser}
      >
        <img src={blackBtnImg} className="absolute " />
        <p className="absolute font-bold text-red-300">탈퇴 하기</p>
      </div>
    </div>
  );
};
export default ProfileDelUser;
