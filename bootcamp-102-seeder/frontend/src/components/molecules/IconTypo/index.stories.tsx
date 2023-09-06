import { StoryFn } from "@storybook/react";
import { IconTypo, IconTypoProps } from ".";
import info from "./../../../../public/assets/images/info-circle.svg";
import cashicon from "./../../../../public/assets/images/cashaccelerationicon.svg";
import { theme } from "../../../theme/theme";

export default {
  title: "Molecules/IconTypo",
  component: IconTypo,
};

const Template: StoryFn<IconTypoProps> = (args) => <IconTypo {...args} />;

export const Summary = Template.bind({});
Summary.args = {
  icon: info,
  text: "Summary",
  gap: "8px",
  textColor: theme.palette.textColor.highEmphasis,
  textVariant: "heading2",
  iconAlt: "Info",
  iconwidth: "20px",
  iconheight: "20px",
  direction: "row",
};

export const Accleration = Template.bind({});
Accleration.args = {
  icon: cashicon,
  text: "Cash Accleration",
  gap: "12px",
  textColor: theme.palette.textColor.highEmphasis,
  textVariant: "button",
  iconAlt: "Info",
  iconwidth: "16px",
  direction: "row-reverse",
};
