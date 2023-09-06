import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { validateEmail } from "../../../../utils/index";
import EmailIcon from "../../../../public/assets/images/email-icon.svg";
import ResetPassword from "../../molecules/ResetPassword";
import { ResetCard } from "../../molecules/ResetCard";
import TypographyComponent from "../../atoms/Typography";
import Button from "../../atoms/Button";
import { theme } from "../../../theme/theme";
import { LOGIN } from "../../../../routers/index";
import { getUserByEmail } from "../../../services";
import { useAppContext } from "../../../utils/constants";

const styleButton = {
  width: "434px",
  height: "59px",
  borderRadius: "12px",
  mt: "24px",
  textTransform: "none",
};

interface ForgotPaswordProps {
  onClickContinueButton: () => void;
}

const ForgotPasswordPane = (props: ForgotPaswordProps) => {
  const {setUserId}=useAppContext();
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setValidEmail(validateEmail(newEmail));
  };

  const handleResetPasswordButton = () => {
    getUserByEmail(email).then((res) => {
     setUserId(res.id);
    });
    setIsEmailSent(true);
  };
  const handleLoginButton = () => {
    navigate(LOGIN);
  };

  return (
    <>
      {!isEmailSent ? (
        <ResetPassword
          title="Forgot Password"
          description="No worries, we’ll send you link to your email id to reset your password"
          inputIcon={EmailIcon}
          placeholder="Enter your email id"
          inputValue={email}
          invalidInput={!validEmail}
          invalidInputMessage="Enter a valid email address"
          onChange={handleOnEmailChange}
          onClickResetPassword={handleResetPasswordButton}
          disableResetPasswordOnInvalidInput={!validateEmail(email)}
          onClickLoginButton={handleLoginButton}
        />
      ) : (
        <Stack>
          <TypographyComponent
            variant="title"
            color={theme.palette.textColor.highEmphasis}
          >
            Forgot Password
          </TypographyComponent>
          <TypographyComponent
            variant="h3"
            color={theme.palette.textColor.lowEmphasis}
            sx={{ width: "434px", mt: "4px", mb: "40px" }}
          >
            No worries, we’ll send you link to your email id to reset your
            password
          </TypographyComponent>
          <ResetCard email={email} />
          <Button
            children="Continue"
            variant="contained"
            sx={styleButton}
            onClick={props.onClickContinueButton}
          />
        </Stack>
      )}
    </>
  );
};
export default ForgotPasswordPane;
