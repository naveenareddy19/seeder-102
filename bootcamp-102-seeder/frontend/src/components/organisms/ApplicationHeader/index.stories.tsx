import { StoryFn, Meta } from "@storybook/react";
import { APP_HEADER_CONSTANTS } from "../../../../utils/constants";
import { ApplicationHeader, ApplicationHeaderProps } from ".";

const meta: Meta = {
  title: "organisms/ApplicationHeader",
  component: ApplicationHeader,
};
export default meta;

const Template: StoryFn<ApplicationHeaderProps> = (args) => (
  <ApplicationHeader {...args} />
);
export const Greeting = Template.bind({});
Greeting.args = {
  title: APP_HEADER_CONSTANTS.data[2].title,
  emoji: " ✋",
  subtitle: APP_HEADER_CONSTANTS.data[2].subtitle,
};
export const Acceleration = Template.bind({});
Acceleration.args = {
  title: APP_HEADER_CONSTANTS.data[0].title,
  subtitle: APP_HEADER_CONSTANTS.data[0].subtitle,
};
export const CashKick = Template.bind({});
CashKick.args = {
  title: APP_HEADER_CONSTANTS.data[1].title,
  subtitle: APP_HEADER_CONSTANTS.data[1].subtitle,
};
