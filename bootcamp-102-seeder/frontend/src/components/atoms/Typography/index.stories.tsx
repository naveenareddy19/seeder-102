import { StoryFn, Meta } from "@storybook/react";
import TypographyComponent from ".";
import { theme } from "./../../../theme/theme";

const meta: Meta = {
  title: "atoms/Typography",
  component: TypographyComponent,
  argTypes: {
    variant: {
      options: [
        "h1",
        "h2",
        "h3",
        "body1",
        "body2",
        "title",
        "caption",
        "button",
      ],
      control: { type: "radio" },
    },
  },
};
export default meta;

const Template: StoryFn<typeof TypographyComponent> = (args) => (
  <TypographyComponent {...args} />
);

export const SampleData = Template.bind({});

SampleData.args = {
  children: "Place to create new cash kicks to run your business",
  variant: "h1",
  sx: { color: theme.palette.textColor.highEmphasis },
};
