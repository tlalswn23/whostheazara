interface MyInfo {
  id: number;
  email: string;
  nickname: string;
}

const ProfileBasic = ({ id, email, nickname }: MyInfo) => {
  return (
    <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[40px] font-bold bg-black text-white">
      <div className="flex flex-col text-[42px] px-[36px]">
        <p className="mb-[80px]">아이디 : {id}</p>
        <p className="mb-[80px]">이메일 : {email}</p>
        <p className="mb-[80px]">닉네임 : {nickname}</p>
      </div>
    </div>
  );
};
export default ProfileBasic;
