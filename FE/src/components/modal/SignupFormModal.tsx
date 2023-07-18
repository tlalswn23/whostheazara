import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validateNickname, validatePassword } from "../../utils/validateForm";
import { FormFieldMap } from "../../constants/FormFieldMap";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendEmailVerificationCodeWithSignup, signup } from "../../api/users/usersApiCall";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const nicknameField = useFormField("", validateNickname);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendEmailVerificationCode, setIsSendEmailVerificationCode] = useState(false);

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid, nicknameField.isValid];

  const clickSendEmailVerificationCode = async () => {
    if (!emailField.isValid) {
      toast.warn("이메일 형식이 올바르지 않습니다.");
      return;
    }
    const result = await sendEmailVerificationCodeWithSignup(emailField.value);
    if (result) setIsSendEmailVerificationCode(true);
  };

  const clickSignupBtnHandler = async () => {
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    if (!isSendEmailVerificationCode) toast.warn("이메일 인증코드를 발송해주세요.");
    switch (inValidIndex) {
      case FormFieldMap.password:
        toast.warn("비밀번호는 숫자와 영문이 포함 6자리 이상으로 입력해주세요.");
        return;
      case FormFieldMap.confirmPassword:
        toast.warn("비밀번호가 일치하지 않습니다.");
        return;
      case FormFieldMap.nickname:
        toast.warn("닉네임은 10자리이하로 입력해주세요.");
        return;
    }

    const result = await signup(emailField.value, passwordField.value, nicknameField.value, verificationCode);
    if (result) showModalHandler(ModalCategoryMap.Login);
  };

  return (
    <Rodal
      visible={curModalType === ModalCategoryMap.SignUp}
      onClose={() => {
        showModalHandler(ModalCategoryMap.None);
        emailField.clear();
        nicknameField.clear();
        passwordField.clear();
        confirmPasswordField.clear();
        setVerificationCode("");
      }}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={600}
      height={700}
      closeOnEsc={true}
    >
      <div className="-m-[15px] text-3xl w-full h-full bg-white color-white p-[40px]">
        <h2 className="text-center font-bold text-[48px] mb-[10px]">회원가입</h2>

        <div className="flex items-end ">
          <div className="my-[10px]  w-[69%] mb-0">
            <label className="text-[32px]">이메일</label>
            <br />
            <input
              className="h-[40px] border-solid border-black border-[1px] w-full text-xl  "
              onChange={(e) => emailField.handleChange(e.target.value)}
              value={emailField.value}
            />
          </div>
          <ModalBtn
            text="인증코드 발송"
            btnWidth={150}
            btnHeight={50}
            fontSize={20}
            clickBtnHandler={clickSendEmailVerificationCode}
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

        <InputForm label="비밀번호" value={passwordField.value} handleChange={passwordField.handleChange} />
        <InputForm
          label="비밀번호 확인"
          value={confirmPasswordField.value}
          handleChange={confirmPasswordField.handleChange}
        />
        <InputForm label="닉네임" value={nicknameField.value} handleChange={nicknameField.handleChange} />

        <div className="flex justify-around">
          <ModalBtn
            text="회원가입"
            btnWidth={300}
            btnHeight={60}
            isBold={true}
            clickBtnHandler={clickSignupBtnHandler}
          />
        </div>
        <div className="text-center">
          <div
            className=" cursor-pointer text-xl mt-6 text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => showModalHandler(ModalCategoryMap.Login)}
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default SignupFormModal;
