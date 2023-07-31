import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validateNickname, validatePassword } from "../../utils/validateForm";
import { FORM_FIELD_MAP } from "../../constants/home/FormFieldMap";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendEmailVerificationCodeWithSignup, signup } from "../../api/axios/usersApiCall";
import signupBox from "../../assets/img/home/signupBox.png";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const nicknameField = useFormField("", validateNickname);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendEmailVerificationCode, setIsSendEmailVerificationCode] = useState(true);

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid, nicknameField.isValid];

  const onSendVerificationCode = async () => {
    if (!emailField.isValid) {
      toast.warn("이메일형식이 올바르지 않습니다.");
      return;
    }
    try {
      await sendEmailVerificationCodeWithSignup(emailField.value);
      setIsSendEmailVerificationCode(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSignup = async () => {
    if (!isSendEmailVerificationCode) {
      toast.warn("이메일 인증코드를 발송하지 않았습니다.");
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
      case FORM_FIELD_MAP.NICKNAME:
        toast.warn("닉네임은 10자리이하로 입력해주세요.");
        return;
    }
    try {
      await signup(emailField.value, passwordField.value, nicknameField.value, verificationCode);
      showModalHandler(Modal_Category_Map.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllInput = () => {
    emailField.clear();
    nicknameField.clear();
    passwordField.clear();
    confirmPasswordField.clear();
    setVerificationCode("");
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.SIGNUP}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        clearAllInput();
      }}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={400}
      height={400}
      closeOnEsc={true}
      showCloseButton={false}
    >
      <img src={signupBox} className="absolute left-[-80px] top-[-130px] text-3xl min-w-[580px] h-[660px]" />
      <div className="absolute left-[-20px] top-[-130px] w-[460px]">
        <h2 className="text-center font-bold text-[48px] my-[24px]">회원가입</h2>

        <div className="flex items-end ">
          <div className="mb-[8px] w-[69%]">
            <label className="ml-[4px] text-[24px]">이메일</label>
            <input
              className="h-[36px] border-solid border-black border-[1px] w-full text-xl"
              onChange={(e) => emailField.onChange(e.target.value)}
              value={emailField.value}
            />
          </div>
          <div className="mb-[4px]">
            <ModalBtn
              text="인증코드 발송"
              btnWidth={130}
              btnHeight={46}
              fontSize={18}
              clickBtnHandler={onSendVerificationCode}
            />
          </div>
        </div>

        <div className="mb-[8px]  w-full">
          <label className="ml-[4px] text-[24px]">인증코드</label>
          <input
            className="h-[36px] border-solid border-black border-[1px] w-full "
            onChange={(e) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />
        </div>

        <InputForm label="비밀번호" value={passwordField.value} handleChange={passwordField.onChange} />
        <InputForm
          label="비밀번호 확인"
          value={confirmPasswordField.value}
          handleChange={confirmPasswordField.onChange}
        />
        <InputForm label="닉네임" value={nicknameField.value} handleChange={nicknameField.onChange} />

        <div className="flex justify-around mt-[20px]">
          <ModalBtn text="회원가입" btnWidth={200} btnHeight={70} isBold={true} clickBtnHandler={onSignup} />
        </div>
        <div className="text-center">
          <div
            className=" cursor-pointer mt-[8px] text-[18px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => {
              showModalHandler(Modal_Category_Map.LOGIN);
              clearAllInput();
            }}
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default SignupFormModal;
