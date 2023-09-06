import { StoryFn, Meta } from "@storybook/react";
import PaymentsTable, { PaymentsTableProps } from ".";

export default {
  title: "Organisms/PaymentsTable",
  component: PaymentsTable,
} as Meta;

const Template: StoryFn<PaymentsTableProps> = (args) => (
  <PaymentsTable {...args} />
);

export const EmptyData = Template.bind({});
EmptyData.args = {
  isEmpty: true,
};

export const TableData = Template.bind({});
TableData.args = {
  isEmpty: false,
};
