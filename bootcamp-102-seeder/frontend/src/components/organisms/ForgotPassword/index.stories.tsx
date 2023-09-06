import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ForgotPasswordPane from ".";

export default {
  title: "organisms/ForgotPasswordPane",
  component: ForgotPasswordPane,
} as Meta<typeof ForgotPasswordPane>;

const Template: StoryFn<typeof ForgotPasswordPane> = (args) => (<ForgotPasswordPane {...args}/>);
export const ResetPassword = Template.bind({});

ResetPassword.args={
  onClickContinueButton:action("Continue button clicked")
}
