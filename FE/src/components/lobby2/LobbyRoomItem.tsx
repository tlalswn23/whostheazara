interface LobbyListItemProps {
  index: number;
  text: string;
  num: number;
}

export const LobbyRoomItem = ({ index, text, num }: LobbyListItemProps) => {
  return (
    <>
      <div className="3xl:w-[500px] w-[400px] 3xl:h-[130px] h-[104px] bg-black 3xl:my-[12px] my-[10px] 3xl:border-[10px] border-[8px] border-solid border-white flex items-center 3xl:text-[24px] text-[20px] text-white hover:text-yellow-200 cursor-pointer">
        <div className="flex">
          <p className="3xl:w-[64px] w-[54px] 3xl:ml-[20px] ml-[16px]">{index}.</p>
          <p className="3xl:w-[300px] w-[230px]">{text}</p>
        </div>
        <p className="w-[72px] text-center">{num}/8</p>
      </div>
    </>
  );
};
