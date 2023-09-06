import { StoryFn, Meta } from "@storybook/react";
import SummaryCard, { SummaryCardProps } from ".";

export default {
  title: "Organisms/SummaryCard",
  component: SummaryCard,
} as Meta;

const Template: StoryFn<SummaryCardProps> = (args) => <SummaryCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    term: "12 months",
    contracts: "2",
    payback: "$170,454.55",
    rate: "$20,454.55",
    payout: "$150,000.00"
  },
};
