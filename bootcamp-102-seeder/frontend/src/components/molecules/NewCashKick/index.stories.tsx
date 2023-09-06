import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import NewCashKick from ".";

export default {
  title: "Molecules/NewCashKick",
  component: NewCashKick,
  argTypes: {
    totalAmount: {
      control: { type: "text" },
    },
  },
} as Meta<typeof NewCashKick>;

const template: StoryFn<typeof NewCashKick> = (args) => (
  <NewCashKick {...args} />
);

export const NewCashCard = template.bind({});
NewCashCard.args = {
  totalAmount: "$880,000.00",
  onClick: action("Button Clicked"),
};
