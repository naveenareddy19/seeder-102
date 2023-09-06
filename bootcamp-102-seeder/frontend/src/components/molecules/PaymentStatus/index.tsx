import React from "react";
import { Stack } from "@mui/material";
import Image from "../../atoms/Image";
import TypographyComponent from "../../atoms/Typography";
import Button from "../../atoms/Button";
import { theme } from "../../../theme/theme";

interface PaymentStatusProps {
  imageSrc: string;
  noContentText: string;
  noContentInfo?: string;
  buttonText: string;
  noContentTextColor?: string;
}

const BlankStateWidget = (props: PaymentStatusProps) => {
  return (
    <Stack alignItems="center">
      <Image
        src={props.imageSrc}
        alt="payment-status-image"
        width="232px"
        height="160px"
      />
      <TypographyComponent
        variant="h3"
        color={
          props.noContentTextColor
            ? props.noContentTextColor
            : theme.palette.textColor.lowEmphasis
        }
        marginTop="20px"
      >
        {props.noContentText}
      </TypographyComponent>
      <TypographyComponent
        variant="caption"
        color={theme.palette.textColor.lowEmphasis}
        mt="4px"
      >
        {props.noContentInfo}
      </TypographyComponent>
      <Button
        children={props.buttonText}
        sx={{
          textTransform: "none",
          mt: "12px",
          color: theme.palette.primary.primary400,
        }}
        disableTouchRipple
      />
    </Stack>
  );
};
export default BlankStateWidget;
