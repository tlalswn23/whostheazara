import btnImg from "../../assets/img/btnImg.png";

interface LobbyBtnProps {
  text: string;
}

export const LobbyBtn = ({ text }: LobbyBtnProps) => {
  return (
    <>
      {/* <div
        className={`w-[200px] h-[200px] bg-contain bg-black bg-no-repeat bg-center relative`}
        style={{ backgroundImage: `url(${btnImg})` }}
      > */}
      <p className="text-white text-[48px]">{text}</p>
      {/* </div> */}
    </>
  );
};
