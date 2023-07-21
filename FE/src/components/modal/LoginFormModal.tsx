import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { login } from "./../../api/users/usersApiCall";
import { useState } from "react";
import { useIsLoginState } from "../../context/loginContext";

const LoginFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useIsLoginState();

  const emailHandleChange = (newValue: string) => {
    setEmail(newValue);
  };
  const passwordHandleChange = (newValue: string) => {
    setPassword(newValue);
  };

  const onLogin = async () => {
    const result = await login(email, password);
    if (result) {
      setIsLogin(true);
      showModalHandler(Modal_Category_Map.NONE);
    }
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.LOGIN}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        setEmail("");
        setPassword("");
      }}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={512}
      height={520}
      closeOnEsc={true}
    >
      <div className="-m-[15px] text-4xl w-[512px] h-[520px] bg-white color-white p-[60px]">
        <h2 className="text-center font-bold text-[48px] mb-[40px]">로그인</h2>
        <InputForm label="이메일" value={email} handleChange={emailHandleChange} />
        <InputForm label="비밀번호" value={password} handleChange={passwordHandleChange} />
        <div className="flex">
          <ModalBtn text="로그인" clickBtnHandler={onLogin} btnHeight={60} btnWidth={170} isBold={true} />
          <ModalBtn
            text="회원가입"
            clickBtnHandler={() => showModalHandler(Modal_Category_Map.SIGNUP)}
            btnHeight={60}
            btnWidth={170}
            isBold={true}
          />
        </div>
        <div className="text-center">
          <div
            className=" cursor-pointer text-xl mt-6 text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => showModalHandler(Modal_Category_Map.RESET_PASSWORD)}
          >
            비밀번호를 잊으셨나요?
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default LoginFormModal;
