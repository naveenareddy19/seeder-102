import { InputAdornment, TextField, styled } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import React, { ReactNode } from "react";
import { theme } from "../../../theme/theme";
export interface InputFieldProps
  extends Omit<TextFieldProps, "startAdornment" | "endAdornment"> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const TextFieldStyled = styled(TextField)(`
  & .MuiOutlinedInput-root {
    color:${theme.palette.textColor.mediumEmphasis} !important;
    font-weight:${theme.typography.body1.fontWeight};
    background:${theme.palette.structural.grey100};
    & fieldset{
        border:1px solid ${theme.palette.borderColor.borderHighEmphasis};
    }
    &:hover fieldset {
      border:1px solid ${theme.palette.primary.primary400};
    }
    &.Mui-focused fieldset {
        border:1px solid ${theme.palette.primary.primary400};
    }
    border-radius:12px;
  }

`);

export const InputField = ({
  startAdornment,
  endAdornment,
  ...props
}: InputFieldProps) => {
  return (
    <TextFieldStyled
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginRight: "12px" }}>
            {startAdornment}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ marginLeft: "12px",cursor:"pointer" }}>
            {endAdornment}
          </InputAdornment>
        ),
      }}
      autoComplete="off"
    />
  );
};
