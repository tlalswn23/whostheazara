import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { login } from "./../../api/users/usersApiCall";
import { useState } from "react";
import { useIsLoginState } from "../../context/loginContext";
import LoginBox from "../../assets/img/LoginBox.png";

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
      width={0}
      height={0}
      closeOnEsc={true}
      showCloseButton={false}
    >
      <img src={LoginBox} className="relative left-[-18vw] top-[-18vw] min-w-[36vw] h-[34vw] bg-transparent" />
      <div className="relative left-[-18vw] top-[-53vw] min-w-[36vw] h-[58vh] p-[3vw] bg-transparent">
        <h2 className="text-center font-bold text-[3.4vw] mb-[6%]">로그인</h2>
        <InputForm label="이메일" value={email} handleChange={emailHandleChange} />
        <InputForm label="비밀번호" value={password} handleChange={passwordHandleChange} />
        <div className="flex mt-[24px] justify-around">
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
            className=" cursor-pointer text-xl mt-[10px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
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
