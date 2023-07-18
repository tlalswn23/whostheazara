interface InputFormProps {
  label: string;
  handleChange: (newValue: string) => void;
}

export const InputForm = ({ label, handleChange }: InputFormProps) => {
  return (
    <>
      <div className="my-[10px] w-[100%]">
        <label className="text-[32px]">{label}</label>
        <br />
        <input
          className="h-[40px] border-solid border-black border-[1px] w-full "
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
};
