interface LobbyListItemProps {
  index: number;
  text: string;
  num: number;
}

export const LobbyRoomItem = ({ index, text, num }: LobbyListItemProps) => {
  return (
    <>
      <div
        className={`w-[50%] h-[25%] 3xl:border-[10px] border-[8px] border-solid border-black flex items-center 3xl:text-[24px] text-[20px] text-white hover:text-yellow-200 cursor-pointer shadow-inner shadow-white`}
      >
        <div className="flex">
          <p className="3xl:w-[64px] w-[54px] 3xl:ml-[40px] ml-[32px]">{index}.</p>
          <p className="3xl:w-[300px] w-[250px]">{text}</p>
        </div>
        <p className={`w-full text-center ${num === 8 ? "text-red-300" : "text-green-200"}`}>{num}/8</p>
      </div>
    </>
  );
};
