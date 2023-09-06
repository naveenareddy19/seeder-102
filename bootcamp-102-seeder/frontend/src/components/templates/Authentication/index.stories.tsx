import { Meta, StoryFn } from "@storybook/react";
import AuthenticationTemplate from ".";
import LoginPanel from "../../../../public/assets/images/singin.svg";
import { Box } from "@mui/material";
import { theme } from "../../../theme/theme";

export default {
  title: "templates/Authentication",
  component: AuthenticationTemplate,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof AuthenticationTemplate>;

const Template: StoryFn<typeof AuthenticationTemplate> = (args) => (
  <AuthenticationTemplate {...args} />
);

const boxStyles = {
  width: "500px",
  background: theme.palette.structural.elevation1,
  border: `1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
  borderRadius: "8px",
  height: "80vh",
  display: "grid",
  placeItems: "center",
  color: theme.palette.textColor.highEmphasis,
  ...theme.typography.h1,
};

export const Default = Template.bind({});
Default.args = {
  imageSrc: LoginPanel,
  children: <Box sx={boxStyles}>Content</Box>,
};
