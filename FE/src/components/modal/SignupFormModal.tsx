import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validateNickname, validatePassword } from "../../utils/validateForm";
import { FORM_FIELD_MAP } from "../../constants/FormFieldMap";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendEmailVerificationCodeWithSignup, signup } from "../../api/users/usersApiCall";
import signupBox from "../../assets/img/signupBox.png";

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
      toast.warn("이메일 형식이 올바르지 않습니다.");
      return;
    }
    const result = await sendEmailVerificationCodeWithSignup(emailField.value);
    if (result) setIsSendEmailVerificationCode(true);
  };

  const onSignup = async () => {
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    if (!isSendEmailVerificationCode) toast.warn("이메일 인증코드를 발송해주세요.");
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

    const result = await signup(emailField.value, passwordField.value, nicknameField.value, verificationCode);
    if (result) {
      showModalHandler(Modal_Category_Map.LOGIN);
    }
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.SIGNUP}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        emailField.clear();
        nicknameField.clear();
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
      <img src={signupBox} className="absolute left-[-150px] top-[-150px] text-3xl min-w-[700px] h-[720px]" />
      <div className="absolute left-[-50px] top-[-104px] text-3xl w-[500px] h-[700px]">
        <h2 className="text-center font-bold text-[48px] mb-[40px]">회원가입</h2>

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
        <InputForm label="닉네임" value={nicknameField.value} handleChange={nicknameField.onChange} />

        <div className="flex justify-around">
          <ModalBtn text="회원가입" btnWidth={300} btnHeight={60} isBold={true} clickBtnHandler={onSignup} />
        </div>
        <div className="text-center">
          <div
            className=" cursor-pointer mt-[10px] text-xl text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => showModalHandler(Modal_Category_Map.LOGIN)}
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default SignupFormModal;
