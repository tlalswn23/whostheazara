import { useState } from "react";

interface returnUseFormField {
  value: string;
  isValid: boolean;
  handleChange: (newValue: string) => void;
  reset: () => void;
}

function useFormField(initialValue: string, validator: (value: string) => boolean): returnUseFormField {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(validator(initialValue));

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsValid(validator(newValue));
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    isValid,
    handleChange,
    reset,
  };
}

export default useFormField;
