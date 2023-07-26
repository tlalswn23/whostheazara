import { BORDER_COLOR_MAP } from "../../constants/BorderColorMap";

interface GameCamListItemProps {
  item: {
    roomeNo: number;
    userNo: number;
    nickname: string;
    locNo: number;
    jobNo: number;
    jobName: string;
    isDie: boolean;
  };
}

export const GameCamListItem = ({ item }: GameCamListItemProps) => {
  return (
    <div
      className={`3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] bg-black border-solid 3xl:border-[15px] border-[12px] ${
        BORDER_COLOR_MAP[item.locNo]
      }`}
    >
      <p>Hi</p>
    </div>
  );
};
