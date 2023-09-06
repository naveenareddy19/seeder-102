import React from "react";
import { Box, Stack, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import Image from "../../atoms/Image";

const imageStyle = {
  height: "100vh",
  display: "flex",
};

interface AuthenticationTemplateProps {
  imageSrc: string;
  children: React.ReactNode;
}

const StyledStack = styled(Stack)(`
  background:${theme.palette.structural.elevation0};
`);

const ChildContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: -10rem;

  @media (max-width: 1150px) {
    margin-left: 0;
  }
`;

const AuthenticationTemplate = ({
  imageSrc,
  children,
}: AuthenticationTemplateProps) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{ background: theme.palette.structural.elevation0 }}
    >
      <StyledStack direction="row">
        <div style={imageStyle}>
          <Image src={imageSrc} height="100%" alt="image" />
        </div>
        <ChildContainer>{children}</ChildContainer>
      </StyledStack>
    </Box>
  );
};

export default AuthenticationTemplate;
