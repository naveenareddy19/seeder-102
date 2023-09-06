import { AvatarProps } from "@mui/material";
import { StoryFn, Meta } from "@storybook/react";
import AvatarImg from "../../../../public/images/avatar.svg";
import { Avatar } from ".";

const meta: Meta = {
  title: "atoms/Avatar",
  component: Avatar,
};
export default meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;
export const Default = Template.bind({});
Default.args = {
  src: AvatarImg,
  variant: "rounded",
  sx: {
    width: "32px",
    height: "32px",
  },
};
