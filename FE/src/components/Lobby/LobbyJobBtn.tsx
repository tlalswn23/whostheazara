import { useState } from "react";

interface LobbyJobBtnProps {
  img: string;
}
const LobbyJobBtn = ({ img }: LobbyJobBtnProps) => {
  const [selected, setSelected] = useState(false);
  const onToggleSelected = () => {
    setSelected((prev) => !prev);
  };
  return (
    <div className=" relative mx-6 mt-12" onClick={onToggleSelected}>
      <img src={img} />
      {selected && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-8xl">
          X
        </span>
      )}
    </div>
  );
};
export default LobbyJobBtn;
