import { ModalBtn } from "./ModalBtn";
import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  return (
    <Rodal
      visible={curModalType === ModalCategoryMap.SignUp}
      onClose={() => showModalHandler(ModalCategoryMap.None)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={600}
      height={700}
      closeOnEsc={true}
    >
      <div className="-m-[15px] text-4xl w-[600px] h-[730px] bg-white color-white p-[60px]">
        <h2 className="text-center font-bold text-[48px] mb-[40px]">회원가입</h2>

        <div className="flex items-end ">
          <div className="my-[10px]  w-[69%]">
            <label className="text-[32px]">이메일</label>
            <br />
            <input className="h-[40px] border-solid border-black border-[1px] w-full " />
          </div>
          <ModalBtn text="인증코드 발송" btnWidth={150} btnHeight={50} fontSize={20} />
        </div>

        <InputForm label="인증코드" />

        <InputForm label="비밀번호" />
        <InputForm label="비밀번호 확인" />
        <InputForm label="닉네임" />

        <div className="flex justify-around">
          <ModalBtn text="회원가입" btnWidth={300} btnHeight={60} isBold={true} />
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
