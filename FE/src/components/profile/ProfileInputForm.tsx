import { useState } from "react";

interface ProfileInputFormProps {
  text: string;
  handleChange: (newValue: string) => void;
  value: string;
}

export const ProfileInputForm = ({ text, handleChange, value }: ProfileInputFormProps) => {
  return (
    <>
      <div className="w-full h-[80px] flex justify-between text-white">
        <p className="w-[360px] text-center">{text}</p>
        <input
          type="text"
          className="w-[520px] text-black p-[20px]"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          minLength={2}
          maxLength={16}
        />
      </div>
    </>
  );
};
