import { FormState } from "../components/organisms/SignUp";
import { LoginFormState } from "../components/organisms/LogIn/index";
import google from "./../../public/assets/images/google.svg";
import stripe from "./../../public/assets/images/stripe.svg";
import xexo from "./../../public/assets/images/xero.svg";
import React, { useContext } from "react";
import { PaymentRow } from "../../utils/constants";

export const EMAIL = "Email Address";
export const PASSWORD = "Password";
export const NAME = "Your Name";
export const SIGN_UP = "Sign Up ✨";
export const SIGN_UP_BUTTON = "Sign Up";
export const ALREADY_HAS_ACCOUNT = "Already have an account?";
export const OR = "Or";
export const LOGIN = "Login";
export const VALID_EMAIL = "Enter valid email address";
export const VALID_PASSWORD =
  "Password must contain at least an uppercase and lowercase and number, of atleast length 8";
export const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  validPassword: true,
  validEmail: true,
  userAlreadyExists: false,
};

export const LOGIN_CONSTANTS = {
  HEADER: "Login to Seeder ✨",
  SUB_HEADER: "Enter your mail id and password to login",
  EMAIL: "Enter your email id",
  PASSWORD: "Enter your password",
  FORGOT_PASSWORD: "Forgot Password?",
  CONT_BUTTON: "Continue",
  INFO: "Don't have an account?",
  SIGN_UP: "Sign Up",
  VALID_EMAIL: "Enter valid email address",
  VALID_PASSWORD:
    "Password must contain at least an uppercase and lowercase and number, of atleast length 8",
  NAV: [
    { src: google, alt: "Google" },
    { src: stripe, alt: "Stripe" },
    { src: xexo, alt: "Xexo" },
  ],
};

export const INITIAL_LOGIN_FORM_STATE: LoginFormState = {
  email: "",
  validEmail: true,
  password: "",
  validPassword: true,
  showPassword: false,
  validCredentials: false,
};

export const SIGN_UP_CONSTANTS = {
  NAV: [
    { src: google, alt: "Google" },
    { src: stripe, alt: "Stripe" },
    { src: xexo, alt: "Xexo" },
  ],
};

export const validateEmail = (email: string) => {
  const regex =
    /^(?!.*\.\.)[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*@([a-z][a-z0-9]*\.[a-z]{2,})$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

interface ContextValue {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  upcomingPayment: PaymentRow;
  setUpcomingPayment: React.Dispatch<React.SetStateAction<PaymentRow>>;
}
export const AppContext = React.createContext<any>({});
export const useAppContext = () => {
  return useContext<ContextValue>(AppContext);
};
export const user = {
  id: 1,
  name: "username",
  emai: "user@gmail.com",
  password: "User@1234",
};
