import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SignupCard from ".";

export default {
  title: "organisms/SignUp",
  component: SignupCard,
} as Meta<typeof SignupCard>;

const Template: StoryFn<typeof SignupCard> = (args) => <SignupCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: action("clicked"),
};
