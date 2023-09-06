import { Meta } from "@storybook/react";
import NavigationBar from ".";

const meta: Meta = {
  title: "organisms/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const Template = () => <NavigationBar />;
export const Default = Template.bind({});
