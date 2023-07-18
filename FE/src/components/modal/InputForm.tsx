interface InputFormProps {
  label: string;
}

export const InputForm = ({ label }: InputFormProps) => {
  return (
    <>
      <div className="my-[10px] w-[100%]">
        <label className="text-[32px]">{label}</label>
        <br />
        <input className="h-[40px] border-solid border-black border-[1px] w-full " />
      </div>
    </>
  );
};
