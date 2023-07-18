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
import { sendEmailVerificationCodeWithSignup } from "../../api/users/usersApiCall";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const nicknameField = useFormField("", validateNickname);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");

  const isValidList = [nicknameField.isValid, passwordField.isValid, confirmPasswordField.isValid];

  const clickSendEmailVerificationCode = () => {
    if (!emailField.isValid) {
      toast.warn("이메일 형식이 올바르지 않습니다.");
      return;
    }
    sendEmailVerificationCodeWithSignup(emailField.value);
  };

  const clickSignupBtnHandler = () => {
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    switch (inValidIndex) {
      case FormFieldMap.nickname:
        toast.warn("닉네임은 2~10자리로 입력해주세요.");
        return;
      case FormFieldMap.password:
        toast.warn("비밀번호는 8~16자리로 입력해주세요.");
        return;
      case FormFieldMap.confirmPassword:
        toast.warn("비밀번호가 일치하지 않습니다.");
        return;
    }
  };

  return (
    <Rodal
      visible={curModalType === ModalCategoryMap.SignUp}
      onClose={() => {
        showModalHandler(ModalCategoryMap.None);
        emailField.reset();
        nicknameField.reset();
        passwordField.reset();
        confirmPasswordField.reset();
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
          <div className="my-[10px]  w-[69%]">
            <label className="text-[32px]">이메일</label>
            <br />
            <input
              className="h-[40px] border-solid border-black border-[1px] w-full text-xl  "
              onChange={(e) => emailField.handleChange(e.target.value)}
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
          <div className="my-[10px]  w-려ㅣㅣ">
            <label className="text-[32px]">인증코드</label>
            <br />
            <input
              className="h-[40px] border-solid border-black border-[1px] w-full "
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
        </div>

        <InputForm label="비밀번호" handleChange={passwordField.handleChange} />
        <InputForm label="비밀번호 확인" handleChange={confirmPasswordField.handleChange} />
        <InputForm label="닉네임" handleChange={nicknameField.handleChange} />

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
