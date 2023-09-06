import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import BlankStateWidget from ".";
import EmptyPayment from "../../../../public/assets/images/cheque.svg";
import ErrorStatus from "../../../../public/assets/images/errorStatus.svg";
import { theme } from "../../../theme/theme";

export default {
  title: "Molecules/BlankStateWidget",
  component: BlankStateWidget,
  argTypes: {
    onContentText: {
      control: { type: "text" },
    },
    noContentInfo: {
      control: { type: "text" },
    },
    buttonText: {
      control: { type: "text" },
    },
  },
} as Meta<typeof BlankStateWidget>;

const template: StoryFn<typeof BlankStateWidget> = (args: any) => (
  <BlankStateWidget {...args} />
);

export const EmptyPaymentStatus = template.bind({});
EmptyPaymentStatus.args = {
  imageSrc: EmptyPayment,
  noContentText: "You don’t have any Cash Kick",
  buttonText: "Launch A new cash kick",
};

export const ErrorPaymentStatus = template.bind({});
ErrorPaymentStatus.args = {
  imageSrc: ErrorStatus,
  noContentText: "Failed to load contracts!",
  buttonText: "Retry",
  noContentInfo: "Please contact customer support if this problem persists",
  noContentTextColor: theme.palette.textColor.highEmphasis,
};
