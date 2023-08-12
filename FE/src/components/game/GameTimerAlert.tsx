import { useEffect, useState } from "react";

interface GameTimerAlertProps {
  nowTime: string;
  myJobSeq: number;
  deathByVoteOrderNo: number | null;
  deathByZaraOrderNo: number | null;
}

const GameTimerAlert = ({ nowTime, myJobSeq, deathByVoteOrderNo, deathByZaraOrderNo }: GameTimerAlertProps) => {
  const [timeIndex, setTimeIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [content, setContent] = useState("");
  useEffect(() => {
    switch (nowTime) {
      case "DAY":
        setTimeIndex(0);
        break;
      case "VOTE":
        setTimeIndex(1);
        break;
      case "VOTE_RESULT":
        setTimeIndex(2);
        break;
      case "NIGHT":
        setTimeIndex(3);
        break;
      case "NIGHT_RESULT":
        setTimeIndex(4);
        break;
    }
  }, []);

  useEffect(() => {
    switch (timeIndex) {
      case 0:
      case 1:
        setTextIndex(0);
        break;
      case 2:
        if (deathByVoteOrderNo !== null) {
          setTextIndex(0);
        } else {
          setTextIndex(1);
        }
        break;
      case 3:
        if (myJobSeq === 2) {
          setTextIndex(0);
        } else if (myJobSeq === 3) {
          setTextIndex(1);
        } else if (myJobSeq === 4) {
          setTextIndex(2);
        } else if (myJobSeq === 7) {
          setTextIndex(3);
        }
        break;
      case 4:
        if (deathByZaraOrderNo !== null) {
          setTextIndex(0);
        } else {
          setTextIndex(1);
        }
        break;
    }
  }, [timeIndex]);
  const text = [
    { content: ["낮입니다. 누구를 처형 할 것인지 논의해주세요."] },
    { content: ["투표 시간입니다. 처형 할 사람을 투표해주세요."] },
    { content: ["과반수 투표로 처형당했습니다.", "투표 결과가 동표로 처형이 진행되지 않습니다."] },
    {
      content: [
        "밤입니다. 죽일 토끼를 선택해주세요.",
        "밤입니다. 자라의 공격으로부터 치료해줄 대상을 선택하세요.",
        "밤입니다. 자라인지 확인 할 대상을 선택하세요.",
        "밤입니다. 선택한 대상을 협박하여, 다음 날 투표를 못하게 합니다.",
      ],
    },
    {
      content: [
        "밤 중에 살인이 일어났습니다. 끔찍한 일입니다.",
        "날이 밝아오고 있습니다. 아무일도 일어나지 않았습니다.",
      ],
    },
  ];

  useEffect(() => {
    setContent(text[timeIndex].content[textIndex]);
  }, [textIndex]);

  return (
    <div className="absolute 3xl:top-[250px] top-[200px] animate-time-fade-out 3xl:border-[10px] border-[8px] border-green-200 w-[90%] text-center rounded-xl text-white shadow-black opacity-0">
      <p className="3xl:text-[70px] text-[56px] font-bold drop-shadow-stroke-black">{content}</p>
    </div>
  );
};

export default GameTimerAlert;
