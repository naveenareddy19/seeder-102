import React from "react";
import { Stack } from "@mui/material";
import { theme } from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import { InputField } from "../../atoms/inputfield";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";

const styleButton = {
  width: "434px",
  height: "60px",
  mt: "24px",
  borderRadius: "12px",
  textTransform: "none",
  ":disabled": {
    backgroundColor: `${theme.palette.primary.primary600}`,
    color:`${theme.palette.textColor.lowEmphasis}`
  },
};

const styleInputField = { width: "434px", height: "56px", mt: "40px" };

interface CardProps {
  title: string;
  description: string;
  inputIcon: string;
  placeholder: string;
  onClickResetPassword: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickLoginButton: () => void;
  disableResetPasswordOnInvalidInput?: boolean;
  inputValue?: string;
  invalidInput?:boolean;
  invalidInputMessage?: string;
}

const ResetPassword = (props: CardProps) => {
  return (
    <Stack>
      <TypographyComponent
        variant="title"
        color={theme.palette.textColor.highEmphasis}
      >
        {props.title}
      </TypographyComponent>
      <TypographyComponent
        variant="h3"
        color={theme.palette.textColor.lowEmphasis}
        sx={{ width: "434px", mt: "4px" }}
      >
        {props.description}
      </TypographyComponent>
      <InputField
        placeholder={props.placeholder}
        startAdornment={<Image src={props.inputIcon} alt="start-icon" />}
        sx={styleInputField}
        onChange={props.onChange}
        value={props.inputValue}
        error={props.invalidInput}
        helperText={props.invalidInput?props.invalidInputMessage:""}
      />
      <Button
        children="Reset Password"
        variant="contained"
        sx={styleButton}
        onClick={props.onClickResetPassword}
        disabled={props.disableResetPasswordOnInvalidInput}
      />
      <Stack direction="row">
        <TypographyComponent
          variant="h3"
          color={theme.palette.textColor.lowEmphasis}
          marginTop="32px"
        >
          Go back to
        </TypographyComponent>
        <Button
          children="Login"
          disableRipple
          sx={{
            mt: "30px",
            textTransform: "none",
            color: theme.palette.primary.primary400,
          }}
          onClick={props.onClickLoginButton}
        />
      </Stack>
    </Stack>
  );
};
export default ResetPassword;
