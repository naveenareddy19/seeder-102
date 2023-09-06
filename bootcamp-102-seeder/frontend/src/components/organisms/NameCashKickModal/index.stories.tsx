import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NameCashKickModal from ".";

export default {
  title: "organisms/NameCashKickModal",
  component: NameCashKickModal,
  argTypes: {
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
  },
} as Meta<typeof NameCashKickModal>;

const template: StoryFn<typeof NameCashKickModal> = (args) => {
  const [open, setOpen] = React.useState(args.open);

  const handleClose = () => {
    setOpen(false);
  };

  return <NameCashKickModal {...args} open={open} onClose={handleClose} />;
};

export const Modal = template.bind({});
Modal.args = {
  open: true,
  onClose: () => false,
  title: "Name your cash kick",
  description: "Add a name to identify your cash kick",
};
