import { StoryFn, Meta } from "@storybook/react";
import { HomeTemplate, HomeTemplateProps } from ".";
import { ApplicationHeader } from "../../organisms/ApplicationHeader";
import { APP_HEADER_CONSTANTS } from "../../../../utils/constants";
import { theme } from "../../../theme/theme";
import { Box } from "@mui/material";

export default {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn<HomeTemplateProps> = (args) => (
  <HomeTemplate {...args} />
);
const boxStyles = {
  width: "100%",
  background: theme.palette.structural.elevation1,
  border: `1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
  borderRadius: "8px",
  height: "100%",
  display: "grid",
  placeItems: "center",
  color: theme.palette.textColor.highEmphasis,
  ...theme.typography.h1,
};

export const Default = Template.bind({});
Default.args = {
  header: (
    <ApplicationHeader
      title={APP_HEADER_CONSTANTS.data[0].title}
      subtitle={APP_HEADER_CONSTANTS.data[0].subtitle}
    />
  ),
  children: <Box sx={boxStyles}>Content</Box>,
};
