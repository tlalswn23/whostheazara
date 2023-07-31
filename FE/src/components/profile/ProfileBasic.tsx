interface MyInfo {
  id: number;
  email: string;
  nickname: string;
}

const ProfileBasic = ({ id, email, nickname }: MyInfo) => {
  return (
    <div className="flex flex-col 3xl:text-[42px] text-[33px] 3xl:px-[36px] px-[28px] text-white">
      <p className="mb-[80px]">아이디 : {id}</p>
      <p className="mb-[80px]">이메일 : {email}</p>
      <p className="mb-[80px]">닉네임 : {nickname}</p>
    </div>
  );
};
export default ProfileBasic;
