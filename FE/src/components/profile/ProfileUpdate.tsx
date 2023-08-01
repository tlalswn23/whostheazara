import yellowBtnImg from "../../assets/img/common/yellowBtnImg.png";
import useFormField from "../../hooks/useFormField";
import { validatePassword } from "../../utils/validateForm";
import { ProfileInputForm } from "./ProfileInputForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { AxiosError } from "axios";
import { useAxiosWithToken } from "../../hooks/useAxiosWithToken";

export const ProfileUpdate = () => {
  const { changePassword } = useAxiosWithToken();
  const navigate = useNavigate();
  const passwordField = useFormField("", validatePassword);
  const newPasswordField = useFormField("", validatePassword);
  const confirmNewPasswordField = useFormField("", (value) => value === newPasswordField.value);

  const onUpdatePassword = async () => {
    if (!confirmNewPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      await changePassword(passwordField.value, newPasswordField.value);
      passwordField.clear();
      newPasswordField.clear();
      confirmNewPasswordField.clear();
    } catch (error) {
      const { status } = (error as AxiosError).response!;
      if (status === ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN) {
        toast.error("다시 로그인 해주세요.");
        navigate("/home");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col justify-around items-center h-full 3xl:p-[40px] p-[32px] 3xl:text-[48px] text-[38px]">
        <ProfileInputForm text="기존 비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
        <ProfileInputForm text="새 비밀번호" handleChange={newPasswordField.onChange} value={newPasswordField.value} />
        <ProfileInputForm
          text="비밀번호 확인"
          handleChange={confirmNewPasswordField.onChange}
          value={confirmNewPasswordField.value}
        />
      </div>
      <div
        className="absolute cursor-pointer 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-50px] right-[40px] 3xl:text-[56px] text-[44px]"
        onClick={onUpdatePassword}
      >
        <img src={yellowBtnImg} className="absolute " />
        <p className="absolute">수정</p>
      </div>
    </>
  );
};
