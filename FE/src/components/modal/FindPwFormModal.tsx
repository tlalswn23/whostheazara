import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  return (
    <Rodal
      visible={curModalType === ModalCategoryMap.FindPw}
      onClose={() => showModalHandler(ModalCategoryMap.None)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={512}
      height={400}
      closeOnEsc={true}
    >
      <div className="-m-[15px] text-4xl w-[512px] h-[430px] bg-white color-white p-[60px]">
        <h2 className="text-center font-bold text-[48px] mb-[40px]">비밀번호 찾기</h2>
        <InputForm label="이메일" />
        <div className="flex justify-around">
          <ModalBtn text="이메일로 임시 비밀번호 받기" color="yellow" />
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
