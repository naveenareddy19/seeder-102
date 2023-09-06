import { StoryFn, Meta } from "@storybook/react";
import { Chip } from ".";
import { theme } from "../../../theme/theme";

export default {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: {
    onClick: { action: "clicked" },
    size: {
      options: ["small", "medium"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  style: {
    backgroundColor: theme.palette.structural.elevation2,
    color: theme.palette.textColor.mediumEmphasis,
    borderRadius: "4px",
    justifyContent: "center",
  },
  label: "Pending",
  size: "small",
};
