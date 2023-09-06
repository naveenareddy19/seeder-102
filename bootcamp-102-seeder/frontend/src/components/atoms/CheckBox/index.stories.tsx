import { Meta, StoryFn } from "@storybook/react";
import CheckboxAtom, { CheckboxAtomProps } from ".";
import { theme } from "../../../theme/theme";

export default {
  title: "Atoms/CheckboxAtom",
  component: CheckboxAtom,
} as Meta;

const Template: StoryFn<CheckboxAtomProps> = (args) => (
  <CheckboxAtom {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sx: {
    color: theme.palette.iconColors.iconLowEmphasis,
    "&.Mui-checked": {
      color: theme.palette.primary.primary400,
    },
  },
  label: "Checkbox",
};

export const Checked = Template.bind({});
Checked.args = {
  sx: {
    color: theme.palette.iconColors.iconLowEmphasis,
    "&.Mui-checked": {
      color: theme.palette.primary.primary400,
    },
  },
  label: "Checkbox",
  checked: true,
};
