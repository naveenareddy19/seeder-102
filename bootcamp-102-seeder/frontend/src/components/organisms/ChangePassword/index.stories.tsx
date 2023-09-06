import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ChangePassword from ".";

export default {
  title: "organisms/ChangePassword",
  component: ChangePassword,
} as Meta<typeof ChangePassword>;

const template: StoryFn<typeof ChangePassword> = () => <ChangePassword />;

export const ResetPassword = template.bind({});
