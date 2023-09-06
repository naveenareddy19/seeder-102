import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LoginCard from ".";

export default {
  title: "organisms/LoginCard",
  component: LoginCard,
} as Meta<typeof LoginCard>;

const Template: StoryFn<typeof LoginCard> = (args) => <LoginCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: action("clicked"),
};
