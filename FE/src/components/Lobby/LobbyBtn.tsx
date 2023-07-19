import btnImg from "../../assets/img/lobbyBlackBtnImg.png";

interface LobbyBtnProps {
  text: string;
}

export const LobbyBtn = ({ text }: LobbyBtnProps) => {
  return (
    <>
      <div
        className={`w-[400px] h-[200px] bg-contain bg-no-repeat bg-center relative flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url(${btnImg})` }}
      >
        <p className="text-white text-[48px] w-full ">{text}</p>
      </div>
    </>
  );
};
