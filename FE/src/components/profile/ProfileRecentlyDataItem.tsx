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
      <ul className="flex text-center my-[20px]">
        <li className={`${result === "승" ? "text-blue-400" : "text-red-400"} w-[200px]`}>{result}</li>
        <li className="w-[240px]">{role}</li>
        <li className="w-[240px]">{playtime}</li>
        <li className="w-[340px]">{date}</li>
      </ul>
      <hr className="bg-white" />
    </>
  );
};
