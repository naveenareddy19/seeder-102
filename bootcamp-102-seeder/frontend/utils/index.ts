export const validateEmail = (email: string) => {
  const regex =
    /^(?!.*\.\.)[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*@([a-z][a-z0-9]*\.[a-z]{2,})$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateCode = (code: string) => {
  const regex = /^\d{8}$/;
  return regex.test(code);
};
