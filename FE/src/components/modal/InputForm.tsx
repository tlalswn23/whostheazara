interface InputFormProps {
  label: string;
  value: string;
  handleChange: (newValue: string) => void;
}

export const InputForm = ({ label, value, handleChange }: InputFormProps) => {
  return (
    <>
      <div className="my-[8px] w-[100%]">
        <label className="text-[24px]">{label}</label>
        <br />
        <input
          className="h-[40px] border-solid border-black border-[1px] w-full text-xl "
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
      </div>
    </>
  );
};
