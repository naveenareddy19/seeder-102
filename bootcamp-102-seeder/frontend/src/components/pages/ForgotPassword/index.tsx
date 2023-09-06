import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import ForgotPasswordPane from "../../organisms/ForgotPassword";
import ResetPassword from "../../molecules/ResetPassword";
import MoreIcon from "../../../../public/assets/images/more.svg";
import MoreIconInActive from "../../../../public/assets/images/more-icon.svg";
import { validateCode } from "../../../../utils";
import ChangePassword from "../../organisms/ChangePassword";
import { LOGIN } from "../../../../routers/index";

const ForgotPasswordPage = () => {
  const [isResetEmail, setIsResetEmail] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [validCode, setValidCode] = useState(true);
  const [isChangePassword, setIsChangepassword] = useState(false);
  const navigate = useNavigate();

  const handleOnResetCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const code = event.target.value.replace(/[^\d]/g, "");
    setResetCode(code);
    setValidCode(validateCode(code));
  };

  const handleLoginButton = () => {
    navigate(LOGIN);
  };

  let componentToRender;

  if (!isResetEmail) {
    componentToRender = (
      <ForgotPasswordPane onClickContinueButton={() => setIsResetEmail(true)} />
    );
  } else if (!isChangePassword) {
    componentToRender = (
      <ResetPassword
        title="Enter Reset Code"
        description="Please enter reset code sent to your email to proceed further"
        inputIcon={resetCode.length !== 8 ? MoreIcon : MoreIconInActive}
        placeholder="Enter reset code"
        inputValue={resetCode}
        invalidInput={!validCode}
        invalidInputMessage="Enter 8 digit code"
        onClickResetPassword={() => setIsChangepassword(true)}
        onChange={handleOnResetCodeChange}
        onClickLoginButton={handleLoginButton}
        disableResetPasswordOnInvalidInput={resetCode.length !== 8}
      />
    );
  } else {
    componentToRender = <ChangePassword />;
  }

  return <Box margin="-18rem 0rem 0rem -8rem">{componentToRender}</Box>;
};

export default ForgotPasswordPage;
