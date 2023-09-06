import { InputField, InputFieldProps } from ".";
import { StoryFn, Meta } from "@storybook/react";

const meta: Meta = {
  title: "atoms/InputField",
  component: InputField,
};
export default meta;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;
export const Default = Template.bind({});
Default.args = {
  placeholder: "Your name",
};
export const TextHere = Template.bind({});
TextHere.args = {
  placeholder: "Text here",
};
