import { changePassword } from "../../api/users/usersApiCall";
import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import useFormField from "../../hooks/useFormField";
import { validatePassword } from "../../utils/validateForm";
import { ProfileInputForm } from "./ProfileInputForm";
import { toast } from "react-toastify";

export const ProfileUpdate = () => {
  const passwordField = useFormField("", validatePassword);
  const newPasswordField = useFormField("", validatePassword);
  const confirmNewPasswordField = useFormField("", (value) => value === newPasswordField.value);

  const onUpdatePassword = async () => {
    if (!confirmNewPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    const result = await changePassword(passwordField.value, newPasswordField.value);
    if (result) {
      passwordField.clear();
      newPasswordField.clear();
      confirmNewPasswordField.clear();
    }
  };
  return (
    <>
      <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[80px] text-[48px] font-bold bg-black flex flex-col justify-around">
        <ProfileInputForm text="기존 비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
        <ProfileInputForm text="새 비밀번호" handleChange={newPasswordField.onChange} value={newPasswordField.value} />
        <ProfileInputForm
          text="비밀번호 확인"
          handleChange={confirmNewPasswordField.onChange}
          value={confirmNewPasswordField.value}
        />
        <div
          className="absolute  cursor-pointer w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px] text-[56px]"
          onClick={onUpdatePassword}
        >
          <img src={yellowBtnImg} className="absolute " />
          <p className="absolute">수정</p>
        </div>
      </div>
    </>
  );
};
