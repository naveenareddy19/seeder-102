import { StoryFn, Meta } from "@storybook/react";
import ReviewSummary, { ReviewSummaryProps } from ".";

const meta: Meta = {
  title: "organisms/ReviewSummary",
  component: ReviewSummary,
  parameters: {
    layout: "centered",
  },
};
export default meta;

const Template: StoryFn<ReviewSummaryProps> = (args) => (
  <ReviewSummary {...args} />
);

export const Default = Template.bind({});
Default.args = {
  term: 12,
  selectedContracts: 2,
  selectedAmount: 164542.45,
  disableSlider: false,
};
