import { LobbyListItem } from "./LobbyListItem";

export const LobbyListRoom = () => {
  const list = [...Array(8).keys()];
  return (
    <>
      <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[20px] text-[56px] font-bold bg-black">
        <div className="flex flex-wrap">
          {list.map((item, index) => {
            return <LobbyListItem index={item + 214} text={`자라 잡으러 가실분`} num={item + 1} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
