interface LobbyNumBtnProps {
  text: string;
  index: number;
  selectedNum: number;
  onSetSelectedNum: (num: number) => void;
}

export const LobbyNumBtn = ({ text, index, selectedNum, onSetSelectedNum }: LobbyNumBtnProps) => {
  return (
    <>
      <p
        className={`cursor-pointer px-[10px] ${index === selectedNum ? "text-yellow-200" : "text-white"}`}
        onClick={() => onSetSelectedNum(index)}
      >
        {text}
      </p>
    </>
  );
};
