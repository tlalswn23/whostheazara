interface InputFormProps {
  label: string;
  value: string;
  handleChange: (newValue: string) => void;
}

export const InputForm = ({ label, value, handleChange }: InputFormProps) => {
  return (
    <>
      <div className="my-[8px] w-[100%]">
        <label className="ml-[4px] text-[24px]">{label}</label>
        <br />
        <input
          className="h-[36px] border-solid border-black border-[1px] w-full text-[24px] p-[10px]"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
      </div>
    </>
  );
};
