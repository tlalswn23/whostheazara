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
    const result = await sendEmailVerificationCodeWithResetPw(emailField.value);
    if (result) setIsSendEmailVerificationCode(true);
  };

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid];

  const onResetPw = async () => {
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    if (!isSendEmailVerificationCode) toast.warn("이메일 인증코드를 발송해주세요.");
    switch (inValidIndex) {
      case FORM_FIELD_MAP.PASSWORD:
        toast.warn("비밀번호는 숫자와 영문이 포함 6자리 이상으로 입력해주세요.");
        return;
      case FORM_FIELD_MAP.CONFIRM_PASSWORD:
        toast.warn("비밀번호가 일치하지 않습니다.");
        return;
    }
    const result = await resetPassword(emailField.value, passwordField.value, verificationCode);
    if (result) showModalHandler(Modal_Category_Map.LOGIN);
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
      <img src={resetPwBox} className="absolute left-[-150px] top-[-150px] text-3xl min-w-[700px] h-[700px]" />
      <div className="absolute left-[-50px] top-[-104px] text-3xl w-[500px] h-[700px]">
        <h2 className="text-center font-bold text-[48px] mb-[50px]">비밀번호 찾기</h2>

        <div className="flex items-end ">
          <div className="my-[10px]  w-[69%] mb-0">
            <label className="text-[32px]">이메일</label>
            <br />
            <input
              className="h-[40px] border-solid border-black border-[1px] w-full text-xl  "
              onChange={(e) => emailField.onChange(e.target.value)}
              value={emailField.value}
            />
          </div>
          <ModalBtn
            text="인증코드 발송"
            btnWidth={150}
            btnHeight={50}
            fontSize={20}
            clickBtnHandler={onSendVerificationCode}
          />
        </div>

        <div className="flex items-end ">
          <div className="my-[10px]  w-full">
            <label className="text-[32px]">인증코드</label>
            <br />
            <input
              className="h-[40px] border-solid border-black border-[1px] w-full "
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

        <div className="flex justify-around mt-[28px]">
          <ModalBtn text="비밀번호 수정하기" btnWidth={300} btnHeight={60} isBold={true} clickBtnHandler={onResetPw} />
        </div>
        <div className="text-center">
          <div
            className=" cursor-pointer text-xl mt-6 text-slate-400 hover:text-slate-800 transition-colors duration-500 "
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
