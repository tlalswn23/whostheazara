import { LobbyListItem } from "./LobbyListItem";

export const LobbyListRoom = () => {
  const list = [...Array(8).keys()];
  return (
    <>
      <div className="flex flex-wrap">
        {list.map((item, index) => {
          return <LobbyListItem index={item + 214} text={`자라 잡으러 가실분`} num={item + 1} key={index} />;
        })}
      </div>
    </>
  );
};
