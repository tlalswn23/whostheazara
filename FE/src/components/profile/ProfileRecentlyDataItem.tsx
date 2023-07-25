interface ProfileRecentlyDataItemProps {
  item: {
    result: string;
    role: string;
    date: string;
    playtime: string;
  };
}

export const ProfileRecentlyDataItem = ({ item }: ProfileRecentlyDataItemProps) => {
  const { result, role, date, playtime } = item;
  return (
    <>
      <ul className="flex text-center 3xl:my-[20px] my-[16px]">
        <li className={`3xl:w-[200px] w-[160px] ${result === "승" ? "text-blue-400" : "text-red-400"}`}>{result}</li>
        <li className="3xl:w-[240px] w-[192px]">{role}</li>
        <li className="3xl:w-[240px] w-[192px]">{playtime}</li>
        <li className="3xl:w-[340px] w-[272px]">{date}</li>
      </ul>
      <hr className="bg-white" />
    </>
  );
};
