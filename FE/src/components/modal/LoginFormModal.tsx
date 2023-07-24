import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { login } from "./../../api/users/usersApiCall";
import { useState } from "react";
import { useAccessTokenState } from "../../context/loginContext";
import loginBox from "../../assets/img/loginBox.png";

const LoginFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useAccessTokenState();

  const emailHandleChange = (newValue: string) => {
    setEmail(newValue);
  };
  const passwordHandleChange = (newValue: string) => {
    setPassword(newValue);
  };

  const onLogin = async () => {
    try {
      const accessToken = await login(email, password);
      setAccessToken(accessToken);
      showModalHandler(Modal_Category_Map.NONE);
    } catch (error) {
      console.log(error);
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
      width={400}
      height={480}
      closeOnEsc={true}
      showCloseButton={false}
    >
      <img src={loginBox} className="absolute left-[-80px] top-[-10px] min-w-[560px] h-[500px] bg-transparent" />
      <div className="absolute left-[-80px] top-[-10px] text-4xl w-[560px] h-[500px] p-[60px] bg-transparent">
        <h2 className="text-center font-bold text-[48px] mb-[40px]">로그인</h2>
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
