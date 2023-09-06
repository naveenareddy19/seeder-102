import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CashKickSuccessModal from ".";

export default {
  title: "organisms/CashKickSuccessModal",
  component: CashKickSuccessModal,
} as Meta<typeof CashKickSuccessModal>;

const template: StoryFn<typeof CashKickSuccessModal> = (args) => {
  const [open, setOpen] = React.useState(args.isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return <CashKickSuccessModal {...args} isOpen={open} onClose={handleClose} />;
};

export const Modal = template.bind({});
Modal.args = {
  isOpen: true,
  onClose: () => false,
  onClickViewCashKicks: action("View cash kick button clicked")
};
