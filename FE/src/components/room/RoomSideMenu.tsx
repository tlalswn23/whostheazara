import roomChat from "../../assets/img/roomChat.png";
import { useState } from "react";

export const RoomSideMenu = () => {
  const [inputChat, setInputChat] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.target.value);
  };
  const chatData = [
    {
      userNo: 0,
      userOrder: 0,
      nickname: "감자",
      content: "안녕하세요",
    },
    {
      userNo: 1,
      userOrder: 1,
      nickname: "달서구개미",
      content: "반갑습니다.",
    },
    {
      userNo: 2,
      userOrder: 2,
      nickname: "개미햝기",
      content: "하이요.",
    },
    {
      userNo: 3,
      userOrder: 3,
      nickname: "슈퍼자라",
      content: "자라 고수 왔습니다.",
    },
    {
      userNo: 4,
      userOrder: 4,
      nickname: "토끼",
      content: "토끼는 아주 빠르고 귀여운 아이에요.",
    },
    {
      userNo: 5,
      userOrder: 5,
      nickname: "말달리자",
      content: "고고",
    },
    {
      userNo: 6,
      userOrder: 6,
      nickname: "하모니카",
      content: "빰빰",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 7,
      userOrder: 7,
      nickname: "좋으면짖는개",
      content: "왈왈왈왈",
    },
    {
      userNo: 1,
      userOrder: 1,
      nickname: "달서구개미",
      content: "도배 하지마세요",
    },
  ];
  const itemColor = [
    "text-sky-300",
    "text-yellow-100",
    "text-pink-200",
    "text-green-300",
    "text-fuchsia-400",
    "text-orange-300",
    "text-red-300",
    "text-gray-200",
  ];

  return (
    <aside className="relative 3xl:mb-[30px] mb-[24px] 3xl:w-[550px] w-[440px] 3xl:h-[720px] h-[576px] text-white">
      <img src={roomChat} className="absolute left-[0px] top-[0px] w-[full]" />
      <div className="absolute top-[60px] left-[40px] text-[28px] pr-[10px] overflow-y-scroll 3xl:h-[540px] h-[432px] 3xl:w-[490px] w-[392px]">
        {chatData.map((item, index) => (
          <p className={`${itemColor[item.userOrder]}`} key={index}>
            {item.nickname} : {item.content}
          </p>
        ))}
      </div>
      <input
        className="absolute 3xl:w-[510px] w-[408px] 3xl:h-[60px] h-[48px] left-[20px] bottom-[20px] text-black 3xl:px-[20px] px-[16px] 3xl:text-[28px] text-[22.4px]"
        value={inputChat}
        onChange={onChange}
      />
    </aside>
  );
};
