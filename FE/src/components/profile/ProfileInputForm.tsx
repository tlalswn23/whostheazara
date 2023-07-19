import { useState } from "react";

interface ProfileInputFormProps {
  text: string;
}

export const ProfileInputForm = ({ text }: ProfileInputFormProps) => {
  const [info, setInfo] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  return (
    <>
      <div className="w-full h-[80px] flex justify-between text-white">
        <p className="w-[360px] text-center">{text}</p>
        <input type="text" className="w-[520px] text-black p-[20px]" onChange={onChange} minLength={2} maxLength={16} />
      </div>
    </>
  );
};
