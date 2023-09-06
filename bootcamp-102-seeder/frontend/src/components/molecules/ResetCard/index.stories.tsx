import { StoryFn, Meta } from "@storybook/react";
import { ResetCard, ResetCardProps } from ".";
import { CONSTANTS } from "./resetCardConstants";

const meta: Meta = {
  title: "molecules/ResetCard",
  component: ResetCard,
};
export default meta;

const Template: StoryFn<ResetCardProps> = (args) => <ResetCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  email: CONSTANTS.subTitle[1],
};
