import { calculateMinutesBetweenDates, formatDateTime } from "../../utils/calculateDate";

interface RecentlyGameDataItemProps {
  jobSeq: number;
  startAt: string;
  endAt: string;
  win: boolean;
}

export const ProfileRecentlyDataItem = ({ jobSeq, startAt, endAt, win }: RecentlyGameDataItemProps) => {
  return (
    <>
      <ul className="flex text-center 3xl:my-[20px] my-[16px]">
        {win ? (
          <li className="3xl:w-[200px] w-[160px] text-blue-400">승</li>
        ) : (
          <li className="3xl:w-[200px] w-[160px] text-red-400">패</li>
        )}

        <li className="3xl:w-[240px] w-[192px]">{jobSeq}</li>
        <li className="3xl:w-[240px] w-[192px]">{calculateMinutesBetweenDates(startAt, endAt)} 분</li>
        <li className="3xl:w-[340px] w-[272px]">{formatDateTime(startAt)}</li>
      </ul>
      <hr className="bg-white" />
    </>
  );
};
