import { useState } from "react";

interface returnUseFormField {
  value: string;
  isValid: boolean;
  handleChange: (newValue: string) => void;
  clear: () => void;
}

function useFormField(initialValue: string, validator: (value: string) => boolean): returnUseFormField {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsValid(validator(newValue));
  };

  const clear = () => {
    setValue("");
    setIsValid(false);
  };

  return {
    value,
    isValid,
    handleChange,
    clear,
  };
}

export default useFormField;
