import { useState } from "react";

interface returnUseFormField<T> {
  value: T;
  isValid: boolean;
  handleChange: (newValue: T) => void;
}

function useFormField<T>(initialValue: T, validator: (value: T) => boolean): returnUseFormField<T> {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(validator(initialValue));

  const handleChange = (newValue: T) => {
    setValue(newValue);
    setIsValid(validator(newValue));
  };

  return {
    value,
    isValid,
    handleChange,
  };
}

export default useFormField;
