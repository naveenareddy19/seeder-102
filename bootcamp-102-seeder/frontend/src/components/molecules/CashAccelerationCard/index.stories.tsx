import { StoryFn, Meta } from "@storybook/react";
import CashAccelerationCard, { CashAccelerationCardProps } from ".";

const meta: Meta = {
  title: "Molecules/CashAccelerationCard",
  component: CashAccelerationCard,
  parameters: {
    layout: "centered",
  },
};
export default meta;

const Template: StoryFn<CashAccelerationCardProps> = (args) => (
  <CashAccelerationCard {...args} />
);
export const Default = Template.bind({});
Default.args = {
  termCap: 12,
  availableCredit: 880.0,
  maxInterestRate: 12.0,
};
