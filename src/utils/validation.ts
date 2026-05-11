export const nameRegex = /^[A-Za-z ]{2,30}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9]{10}$/;
export const passwordRegex = /^.{6,}$/;

export const getValidationError = (field: string, value: string) => {
  switch (field) {
    case 'name':
      if (!value) return 'Name is required';
      if (!nameRegex.test(value)) return 'Enter valid name';
      return '';

    case 'email':
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Enter valid email';
      return '';

    case 'phone':
      if (!value) return 'Phone is required';
      if (!phoneRegex.test(value)) return 'Enter 10 digit phone number';
      return '';

    case 'password':
      if (!value) return 'Password is required';
      if (!passwordRegex.test(value)) return 'Min 6 characters required';
      return '';

    default:
      return '';
  }
};
