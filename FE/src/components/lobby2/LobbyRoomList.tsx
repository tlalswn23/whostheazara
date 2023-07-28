import { LobbyRoomItem } from "./LobbyRoomItem";

export const LobbyRoomList = () => {
  const list = [...Array(8).keys()];
  return (
    <>
      <div className="flex flex-wrap justify-around 3xl:mt-[20px] mt-[15px]">
        {list.map((item, index) => {
          return <LobbyRoomItem index={item + 214} text={`자라 잡으러 가실분`} num={item + 1} key={index} />;
        })}
      </div>
    </>
  );
};
