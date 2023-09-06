import { Box, styled } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";
import Image from "../../atoms/Image";
import Tick from "../../../../public/assets/images/circleTick.svg";
import { CONSTANTS } from "./resetCardConstants";
import Typography from "../../atoms/Typography";

export interface ResetCardProps {
  email: string;
}

const Wrapper = styled(Box)(`
  height:111px;
  width:434px;
  padding:24px;
  background:${theme.palette.structural.elevation1};
  border-radius:12px;
  border:1px solid ${theme.palette.borderColor.borderLowEmphasis};
  & .content{
    display: flex;
    align-items:flex-start;
  }
  & img{
    margin-right: 12px;
  }
  & .email{
    color:${theme.palette.primary.primary400};
  }
`);

export const ResetCard = (props: ResetCardProps) => {
  return (
    <Wrapper>
      <Box className="content">
        <Image src={Tick} alt="tick" />
        <Box>
          <Typography variant="h3" color={theme.palette.textColor.highEmphasis}>
            {CONSTANTS.title}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.textColor.lowEmphasis}
          >
            {CONSTANTS.subTitle[0]} <span className="email">{props.email}</span>
            <br /> {CONSTANTS.subTitle[2]}
          </Typography>
        </Box>
      </Box>
    </Wrapper>
  );
};
