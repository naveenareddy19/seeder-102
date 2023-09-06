import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import YourContracts from ".";
import { MY_CONTRACT_ROWS } from "../../../../utils/constants";

export default {
  title: "organisms/YourContracts",
  component: YourContracts,
  argTypes:{
    areContractsSelected:{control:{type:"boolean"}}
  }
} as Meta<typeof YourContracts>;

const template: StoryFn<typeof YourContracts> = (args) => <YourContracts {...args} />;

export const SelectContracts = template.bind({});
SelectContracts.args = {
 contractsData:MY_CONTRACT_ROWS,
 areContractsSelected:false
};
