import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { useState } from "react";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validatePassword } from "../../utils/validateForm";
import { toast } from "react-toastify";
import { resetPassword, sendEmailVerificationCodeWithResetPw } from "../../api/users/usersApiCall";
import { FORM_FIELD_MAP } from "../../constants/FormFieldMap";
import resetPwBox from "../../assets/img/resetPwBox.png";

const ResetPwFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendEmailVerificationCode, setIsSendEmailVerificationCode] = useState(true);

  const onSendVerificationCode = async () => {
    if (!emailField.isValid) {
      toast.warn("이메일 형식이 올바르지 않습니다.");
      return;
    }
    try {
      await sendEmailVerificationCodeWithResetPw(emailField.value);
      setIsSendEmailVerificationCode(true);
    } catch (error) {
      console.log(error);
    }
  };

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid];

  const onResetPw = async () => {
    if (!isSendEmailVerificationCode) {
      toast.warn("이메일 인증코드를 발송해주세요.");
      return;
    }
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    switch (inValidIndex) {
      case FORM_FIELD_MAP.PASSWORD:
        toast.warn("비밀번호는 숫자와 영문이 포함 6자리 이상으로 입력해주세요.");
        return;
      case FORM_FIELD_MAP.CONFIRM_PASSWORD:
        toast.warn("비밀번호가 일치하지 않습니다.");
        return;
    }
    try {
      await resetPassword(emailField.value, passwordField.value, verificationCode);
      showModalHandler(Modal_Category_Map.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.RESET_PASSWORD}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        emailField.clear();
        passwordField.clear();
        confirmPasswordField.clear();
        setVerificationCode("");
      }}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={400}
      height={400}
      closeOnEsc={true}
      showCloseButton={false}
    >
      <img src={resetPwBox} className="absolute left-[-80px] top-[-120px] text-3xl min-w-[580px] h-[640px]" />
      <div className="absolute left-[-10px] top-[-80px] text-3xl w-[440px]">
        <h2 className="text-center font-bold text-[48px] mb-[50px]">비밀번호 찾기</h2>

        <div className="flex items-end ">
          <div className="mb-[8px] w-[69%]">
            <label className="ml-[8px] text-[24px]">이메일</label>
            <input
              className="h-[36px] border-solid border-black border-[1px] w-full text-xl"
              onChange={(e) => emailField.onChange(e.target.value)}
              value={emailField.value}
            />
          </div>
          <div className="mb-[4px]">
            <ModalBtn
              text="인증코드 요청"
              btnWidth={130}
              btnHeight={46}
              fontSize={18}
              clickBtnHandler={onSendVerificationCode}
            />
          </div>
        </div>

        <div className="flex items-end ">
          <div className="w-full">
            <label className="ml-[8px] text-[24px]">인증코드</label>
            <input
              className="h-[36px] border-solid border-black border-[1px] w-full "
              onChange={(e) => setVerificationCode(e.target.value)}
              value={verificationCode}
            />
          </div>
        </div>

        <InputForm label="비밀번호" value={passwordField.value} handleChange={passwordField.onChange} />
        <InputForm
          label="비밀번호 확인"
          value={confirmPasswordField.value}
          handleChange={confirmPasswordField.onChange}
        />

        <div className="flex justify-around mt-[24px]">
          <ModalBtn text="비밀번호 수정" btnWidth={200} btnHeight={70} isBold={true} clickBtnHandler={onResetPw} />
        </div>
        <div className="text-center">
          <div
            className="cursor-pointer text-xl mt-[16px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => showModalHandler(Modal_Category_Map.LOGIN)}
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default ResetPwFormModal;
