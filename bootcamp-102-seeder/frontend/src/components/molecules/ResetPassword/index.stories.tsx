import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ResetPassword from ".";
import MoreIcon from "../../../../public/assets/images/more.svg";
import EmailIcon from "../../../../public/assets/images/email-icon.svg";

export default {
  title: "Molecules/ResetPassword",
  component: ResetPassword,
  argTypes: {
    header: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
  },
} as Meta<typeof ResetPassword>;

const template: StoryFn<typeof ResetPassword> = (args) => (
  <ResetPassword {...args} />
);

export const ResetCode = template.bind({});
ResetCode.args = {
  title: "Enter Reset Code",
  description: "Please enter reset code sent to your email to proceed further",
  placeholder: "Enter reset code",
  inputIcon: MoreIcon,
  onClickResetPassword: action("Button clicked"),
  onChange: action("reset code is changed"),
  onClickLoginButton: action("Login button is clicked"),
};

export const ForgotPassword = template.bind({});
ForgotPassword.args = {
  title: "Forgot Password",
  description:
    "No worries, we’ll send you link to your email id to reset your password",
  placeholder: "Enter your email id",
  inputIcon: EmailIcon,
  onClickResetPassword: action("Reset password button clicked"),
  onChange: action("email is changed"),
  onClickLoginButton: action("Login button is clicked"),
};
