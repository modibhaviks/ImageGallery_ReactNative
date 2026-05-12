import { useState, useMemo } from 'react';
import { getValidationError } from '../utils/validation';

type Fields = {
  email: string;
  password: string;
};

type Touched = {
  [K in keyof Fields]: boolean;
};

type Errors = {
  [K in keyof Fields]: string;
};

export const useLoginFormValidation = () => {
  const [values, setValues] = useState<Fields>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState<Touched>({
    email: false,
    password: false,
  });

  // ===== update value =====
  const setFieldValue = (field: keyof Fields, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: getValidationError(field, value),
      }));
    }
  };

  // ===== blur handler =====
  const handleBlur = (field: keyof Fields) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    setErrors(prev => ({
      ...prev,
      [field]: getValidationError(field, values[field]),
    }));
  };

  // ===== form validity =====
  const isValid = useMemo(() => {
    return values.email && values.password && !errors.email && !errors.password;
  }, [values, errors]);

  return {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    isValid,
  };
};
