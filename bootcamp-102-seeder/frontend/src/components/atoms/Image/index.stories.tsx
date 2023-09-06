import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Image from ".";
import Cheque from "../../../../public/assets/images/cheque.svg";
export default {
  title: "atoms/Image",
  component: Image,
  argTypes: {
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
  },
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args: any) => <Image {...args} />;

export const Image1 = Template.bind({});
Image1.args = {
  src: Cheque,
  width: "720px",
  height: "768px",
};
