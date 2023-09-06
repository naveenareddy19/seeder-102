import { Meta, StoryFn } from "@storybook/react";
import Button from ".";
import { theme } from "../../../theme/theme";

export default {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    color: {
      control: { type: "text" },
    },
    variant: {
      control: {
        type: "inline-radio",
        options: ["contained", "text", "outlined"],
      },
      disabled: {
        type: "inline-radio",
        options: ["true", "false"],
      },
    },
    onClick: { action: "clicked" },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  children: "New Cash Kick",
  style: {
    width: "276px",
    height: "59px",
    borderRadius: "12px",
  },
  variant: "contained",
};
export const Close = Template.bind({});
Close.args = {
  children: "Close",
  style: {
    width: "122px",
    height: "60px",
    borderRadius: "12px",
    background: theme.palette.structural.elevation2,
  },
  variant: "contained",
};
