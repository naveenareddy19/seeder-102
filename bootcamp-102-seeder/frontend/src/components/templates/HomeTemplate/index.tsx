import { ReactNode } from "react";
import { Stack, Box, styled } from "@mui/material";
import NavigationBar from "../../organisms/NavigationBar";
import { theme } from "../../../theme/theme";

export interface HomeTemplateProps {
  header: ReactNode;
  children: ReactNode;
  switchNavTabTo?: number;
}

const StyledStack = styled(Stack)(`
  margin-left:28px;
  padding-top:40px;
  overflow:auto;
  height:100vh;
  ::-webkit-scrollbar {
      display: none;
    }
`);

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <Stack
      direction="row"
      sx={{ background: theme.palette.structural.elevation0 }}
    >
      <Box height="100vh">
        <NavigationBar switchNavTab={props.switchNavTabTo} />
      </Box>
      <StyledStack direction="column" spacing="32px">
        {props.header}
        {props.children}
      </StyledStack>
    </Stack>
  );
};
