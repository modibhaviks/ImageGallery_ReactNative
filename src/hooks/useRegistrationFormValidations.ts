import { useState, useMemo } from 'react';
import { getValidationError } from '../utils/validation';

type Fields = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type Touched = {
  [K in keyof Fields]: boolean;
};

type Errors = {
  [K in keyof Fields]: string;
};

export const useRegistrationFormValidation = () => {
  const [values, setValues] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    phone: false,
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
    return (
      values.name &&
      values.email &&
      values.phone &&
      values.password &&
      !errors.name &&
      !errors.email &&
      !errors.phone &&
      !errors.password
    );
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
