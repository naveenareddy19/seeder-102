import { Box, styled } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";
import Info from "../../../../public/assets/images/info-circle.svg";
import Image from "../../atoms/Image";
import Typography from "../../atoms/Typography";
import { accelerationCardItems } from "./cashAccelerationCardConstants";

const StyledBox = styled(Box)(`
  height:259px;
  width:51.24vw;
  background:${theme.palette.structural.elevation1};
  padding:32px;
  display:flex;
  justify-content:space-between;
  border:1px solid ${theme.palette.borderColor.borderLowEmphasis};
  border-radius:12px;
`);
const CashAccelerationItem = styled(Box)(`
  width:204px;
  height:168px;
`);
const InfoCard = styled(Box)(`
  display:flex;
  margin-top:24px;
  align-items:flex-start;
`);

export interface CashAccelerationCardProps {
  termCap: number;
  availableCredit: number;
  maxInterestRate: number;
}

const CashAccelerationCard = (props: CashAccelerationCardProps) => {
  const availableCredit= props.availableCredit<100 ?`$${props.availableCredit.toFixed(2)}`:`$${(props.availableCredit*0.0001).toFixed(2)}k`
  const values = [
    `${props.termCap} months`,
    availableCredit,
    `${props.maxInterestRate.toFixed(2)}%`,
  ];
  return (
    <StyledBox>
      {accelerationCardItems.map((item, idx) => (
        <CashAccelerationItem key={item.title}>
          <Image src={item.src} alt={item.alt} />
          <InfoCard>
            <Typography
              variant="body1"
              color={theme.palette.textColor.mediumEmphasis}
              marginRight={"8px"}
            >
              {item.title}
            </Typography>
            <Image src={Info} width="16px" height="16px" />
          </InfoCard>
          <Typography
            variant="h2"
            color={theme.palette.textColor.highEmphasis}
            marginTop={"8px"}
          >
            {values[idx]}
          </Typography>
        </CashAccelerationItem>
      ))}
    </StyledBox>
  );
};

export default CashAccelerationCard;
