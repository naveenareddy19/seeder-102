import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { theme } from "../../../theme/theme";
import { InputField } from "../../atoms/inputfield";
import Image from "../../atoms/Image";
import Button from "../../atoms/Button";
import LockIcon from "../../../../public/assets/images/lock-password.svg";
import EyeIcon from "../../../../public/assets/images/eye-icon.svg";
import Tick from "../../../../public/assets/images/circleTick.svg";
import EyeClose from "../../../../public/assets/images/eyeclose.svg";
import { validatePassword } from "../../../../utils/index";
import {
  CHANGE_PASSWORD,
  INVALID_PASSWORD_MSG,
  PASSWORD_MISMATCH_MSG,
  PROCEDD_LOGIN,
  PASSWORD_RESET_SUCCESSFUL,
  FORGOT_PASSWORD,
  LOGIN_NOW,
} from "./ChangePasswordConstants";
import { useAppContext } from "../../../utils/constants";
import { getUserById, updateUserPassword } from "../../../services";
import { ROUTES } from "../../../routes";

const styleChangePasswordButton = {
  width: "434px",
  mt: "2.63vw",
  textTransform: "none",
  height: "60px",
  ":disabled": {
    color: `${theme.palette.textColor.lowEmphasis}`,
    backgroundColor: `${theme.palette.primary.primary600}`,
  },
  borderRadius: "12px",
};

const styleLoginButton = {
  width: "434px",
  mt: "24px",
  textTransform: "none",
  height: "60px",
  borderRadius: "12px",
};

const Wrapper = styled(Box)(`
  height:94px;
  width:434px;
  padding:24px;
  background:${theme.palette.structural.elevation1};
  border-radius:12px;
  border:1px solid ${theme.palette.borderColor.borderLowEmphasis};
  & .content{
    display: flex;
    align-items:flex-start;
  }
  margin-top:40px;
`);

const ChangePassword = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    validNewPassword: true,
    confirmPassword: "",
    validConfirmPassword: true,
    isPasswordMatching: true,
    showPassword: false,
    changePasswordSuccessful: false,
  });

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    const validNewPassword = validatePassword(newPassword);
    setPasswordData((prevData) => ({
      ...prevData,
      newPassword,
      validNewPassword,
    }));
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = event.target.value;
    const validConfirmPassword = validatePassword(confirmPassword);
    const isPasswordMatching = confirmPassword === passwordData.newPassword;
    setPasswordData((prevData) => ({
      ...prevData,
      confirmPassword,
      validConfirmPassword,
      isPasswordMatching,
    }));
  };

  const handleShowPassword = () => {
    setPasswordData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleChangePasswordButton = () => {
    getUserById(userId).then((res) => {
      const user = {
        id: res.id,
        name: res.name,
        email: res.email,
        password: newPassword,
      };
      updateUserPassword(user);
    });
    setPasswordData((prevData) => ({
      ...prevData,
      changePasswordSuccessful: true,
    }));
  };

  const handleLoginNow = () => {
    navigate(ROUTES.LOGIN);
  };

  const {
    newPassword,
    confirmPassword,
    validConfirmPassword,
    isPasswordMatching,
    showPassword,
    changePasswordSuccessful,
  } = passwordData;

  return (
    <>
      {!changePasswordSuccessful ? (
        <Stack>
          <TypographyComponent
            variant="title"
            color={theme.palette.textColor.highEmphasis}
            data-testid="title-change-password"
          >
            {CHANGE_PASSWORD}
          </TypographyComponent>
          <InputField
            type={!showPassword ? "password" : "text"}
            startAdornment={<Image src={LockIcon} alt="lock-icon" />}
            endAdornment={
              showPassword ? (
                <img src={EyeIcon} alt="eye" onClick={handleShowPassword} />
              ) : (
                <img
                  src={EyeClose}
                  alt="closeeye"
                  onClick={handleShowPassword}
                />
              )
            }
            sx={{ width: "434px", height: "56px", mt: "40px" }}
            value={newPassword}
            onChange={handlePassword}
            inputProps={{ "data-testid": "new-password" }}
          />
          <InputField
            type="password"
            startAdornment={<Image src={LockIcon} alt="lock-icon" />}
            sx={{ width: "434px", height: "56px", mt: "20px" }}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            inputProps={{ "data-testid": "confirm-password" }}
          />
          {(!validConfirmPassword || !isPasswordMatching) && (
            <TypographyComponent
              marginTop={"16px"}
              variant="body2"
              color={theme.palette.textColor.lowEmphasis}
            >
              {!validConfirmPassword
                ? INVALID_PASSWORD_MSG
                : PASSWORD_MISMATCH_MSG}
            </TypographyComponent>
          )}
          <Button
            variant="contained"
            children={CHANGE_PASSWORD}
            sx={styleChangePasswordButton}
            disabled={!isPasswordMatching || confirmPassword === ""}
            onClick={handleChangePasswordButton}
          />
        </Stack>
      ) : (
        <Stack>
          <TypographyComponent
            variant="title"
            color={theme.palette.textColor.highEmphasis}
          >
            {FORGOT_PASSWORD}
          </TypographyComponent>
          <Wrapper>
            <Box className="content">
              <img src={Tick} alt="tick" style={{ marginRight: "12px" }} />
              <Box>
                <TypographyComponent
                  variant="h3"
                  color={theme.palette.textColor.highEmphasis}
                >
                  {PASSWORD_RESET_SUCCESSFUL}
                </TypographyComponent>
                <TypographyComponent
                  variant="body2"
                  color={theme.palette.textColor.lowEmphasis}
                >
                  {PROCEDD_LOGIN}
                </TypographyComponent>
              </Box>
            </Box>
          </Wrapper>
          <Button
            variant="contained"
            children={LOGIN_NOW}
            sx={styleLoginButton}
            onClick={handleLoginNow}
          />
        </Stack>
      )}
    </>
  );
};

export default ChangePassword;
