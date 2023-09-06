import { StoryFn, Meta } from "@storybook/react";
import { PaymentCard } from ".";

export default {
  title: "molecules/PaymentCard",
  component: PaymentCard,
} as Meta<typeof PaymentCard>;

const Template: StoryFn<typeof PaymentCard> = (args: any) => (
  <PaymentCard {...args} />
);

export const DueCard = Template.bind({});
DueCard.args = {
  card: "due",
  dueAmount: "14,204.55",
  dueDate: "May 03, 2021",
};

export const AmountCard = Template.bind({});
AmountCard.args = {
  card: "amount",
  amount: "170,454.55",
};
