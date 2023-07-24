import { changePassword } from "../../api/users/usersApiCall";
import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { useAccessTokenState } from "../../context/loginContext";
import useFormField from "../../hooks/useFormField";
import { validatePassword } from "../../utils/validateForm";
import { ProfileInputForm } from "./ProfileInputForm";
import { toast } from "react-toastify";

export const ProfileUpdate = () => {
  const passwordField = useFormField("", validatePassword);
  const newPasswordField = useFormField("", validatePassword);
  const confirmNewPasswordField = useFormField("", (value) => value === newPasswordField.value);
  const { accessToken, setAccessToken } = useAccessTokenState();

  const onUpdatePassword = async () => {
    if (!confirmNewPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      const newAccessToken = await changePassword(passwordField.value, newPasswordField.value, accessToken);
      if (newAccessToken) setAccessToken(newAccessToken);
      passwordField.clear();
      newPasswordField.clear();
      confirmNewPasswordField.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-around items-center h-full p-[40px] text-[48px]">
        <ProfileInputForm text="기존 비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
        <ProfileInputForm text="새 비밀번호" handleChange={newPasswordField.onChange} value={newPasswordField.value} />
        <ProfileInputForm
          text="비밀번호 확인"
          handleChange={confirmNewPasswordField.onChange}
          value={confirmNewPasswordField.value}
        />
      </div>
      <div
        className="absolute cursor-pointer w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[0px] text-[56px]"
        onClick={onUpdatePassword}
      >
        <img src={yellowBtnImg} className="absolute " />
        <p className="absolute">수정</p>
      </div>
    </>
  );
};
