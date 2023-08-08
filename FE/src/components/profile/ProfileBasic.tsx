import { motion } from "framer-motion";

interface MyInfo {
  email: string;
  nickname: string;
  onSetViewMain: (num: number) => void;
}

const ProfileBasic = ({ email, nickname, onSetViewMain }: MyInfo) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-wrap 3xl:text-[40px] text-[32px] text-white"
    >
      <div className="3xl:px-[200px] px-[160px] 3xl:pt-[100px] pt-[80px]">
        <p className="3xl:mb-[50px] mb-[40px]">이메일 : {email}</p>
        <p className="3xl:mb-[50px] mb-[40px]">닉네임 : {nickname}</p>
      </div>
      <div className="flex justify-around w-[100%] 3xl:pt-[20px] pt-[16px] px-[10%]">
        <p
          className="text-green-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px] cursor-pointer hover:text-green-300"
          onClick={() => onSetViewMain(1)}
        >
          비밀번호 변경
        </p>
        <p
          className="text-red-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px] cursor-pointer hover:text-red-300"
          onClick={() => onSetViewMain(4)}
        >
          회원 탈퇴
        </p>
      </div>
    </motion.div>
  );
};
export default ProfileBasic;
