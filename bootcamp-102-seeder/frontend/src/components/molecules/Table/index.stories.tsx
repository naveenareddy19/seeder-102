import { StoryFn, Meta } from "@storybook/react";
import Table, { TableProps } from ".";
import { MY_CONTRACT_ROWS } from "../../../../utils/constants";
import { myContractsColumns } from "../../../../utils/helperFunctions";

const meta: Meta = {
  title: "molecules/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
};
export default meta;

const Template: StoryFn<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "auto",
  columns: myContractsColumns,
  rows: MY_CONTRACT_ROWS,
  disableRowSelectionOnClick: true,
  checkboxSelection: true,
};
