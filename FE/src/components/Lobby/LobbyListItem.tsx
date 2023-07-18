interface LobbyListItemProps {
  index: number;
  text: string;
  num: number;
}

export const LobbyListItem = ({ index, text, num }: LobbyListItemProps) => {
  return (
    <>
      <div className="w-[490px] h-[130px] bg-black my-[12px] mx-[20px] border-[10px] border-solid border-white flex items-center text-[24px] text-white">
        <div className="flex">
          <p className="w-[64px] ml-[20px]">{index}.</p>
          <p className="w-[300px]">{text}</p>
        </div>
        <p className="w-[72px] text-center">{num}/8</p>
      </div>
    </>
  );
};
