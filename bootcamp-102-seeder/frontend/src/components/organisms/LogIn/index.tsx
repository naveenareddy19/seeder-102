import { useState } from "react";
import { Stack, styled } from "@mui/material";
import { InputField } from "../../atoms/inputfield";
import Button from "../../atoms/Button";
import TypographyComponent from "../../atoms/Typography";
import DividerComponent from "../../atoms/Divider";
import {
  LOGIN_CONSTANTS,
  INITIAL_LOGIN_FORM_STATE,
  validateEmail,
  validatePassword,
  useAppContext,
} from "../../../utils/constants";
import { useNavigate } from "react-router";
import { RESET_PASSWORD } from "../../../../routers";
import { theme } from "../../../theme/theme";
import LOCK from "../../../../public/assets/images/lock.svg";
import CLOSEEYE from "../../../../public/assets/images/closeEye.svg";
import DIRECTNOTIFICATION from "../../../../public/assets/images/direct-notification.svg";
import EYE from "../../../../public/assets/images/eye.svg";
import Image from "../../atoms/Image";
import SocialSignInButton from "../../molecules/SocialSignInButton";
import { ROUTES } from "../../../routes";
import { getToken, getUserByEmail } from "../../../services";

const StyledButton = styled(Button)({
  textTransform: "none",
  backgroundColor: theme.palette.primary.primary500,
  borderRadius: "12px",
  width: "100%",
  height: "3.68rem",
  marginBottom: "32px",
  "&:disabled": {
    backgroundColor: theme.palette.primary.primary600,
    color: theme.palette.primary.white500,
  },
});

const styleInput = {
  marginBottom: "20px",
};

const styleButtonTypo = {
  textTransform: "none",
  ":hover": { cursor: "pointer" },
};

const styleTypography = {
  cursor: "pointer",
  marginTop: "24px",
  marginBottom: "24px",
  color: theme.palette.primary.primary400,
};

export interface LoginFormState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
  showPassword: boolean;
  validCredentials: boolean;
}

const LoginCard = () => {
  const { setUserId } = useAppContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [LoginForm, setLoginForm] = useState<LoginFormState>(
    INITIAL_LOGIN_FORM_STATE
  );

  const handleFieldChange = (field: keyof LoginFormState, value: string) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "email") {
      setLoginForm((prevState) => ({
        ...prevState,
        validEmail: validateEmail(value),
      }));
    }
    if (field === "password") {
      setLoginForm((prevState) => ({
        ...prevState,
        validPassword: validatePassword(value),
      }));
    }
  };

  const handleTogglePassword = () => {
    setLoginForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const isEmailValid = (): boolean => {
    return LoginForm.validEmail;
  };

  const isPasswordValid = (): boolean => {
    return LoginForm.validPassword;
  };

  const isRequiredFieldsEmpty = (): boolean => {
    const { email, password } = LoginForm;
    return email === "" || password === "";
  };

  const handleSignUpButton = (): boolean => {
    return !isEmailValid() || !isPasswordValid() || isRequiredFieldsEmpty();
  };

  const handleLogin = () => {
    setLoader(true);
    const { email, password } = LoginForm;
    getUserByEmail(email)
      .then((res) => {
        setUserId(res.id);
        setLoader(false);
        console.log("inside handle if");
        if (res.password == password) {
          navigate(ROUTES.HOMEPAGE);
        } else {
          setLoginForm((prevState) => ({
            ...prevState,
            validCredentials: true,
          }));
        }
      })
      .catch(() =>
        setLoginForm((prevState) => ({
          ...prevState,
          validCredentials: true,
        }))
      );
    getToken({ email, password })
      ?.then((res) => {
        localStorage.setItem("token", res.token);
      })
      .catch(() => {});
  };

  return (
    <Stack display="flex" width="100%" maxWidth="434px">
      <Stack marginBottom="40px">
        <TypographyComponent
          variant="h1"
          color={theme.palette.textColor.highEmphasis}
        >
          {LOGIN_CONSTANTS.HEADER}
        </TypographyComponent>

        <TypographyComponent
          variant="h3"
          color={theme.palette.textColor.lowEmphasis}
        >
          {LOGIN_CONSTANTS.SUB_HEADER}
        </TypographyComponent>
      </Stack>

      {LoginForm.validCredentials && (
        <TypographyComponent variant="h3" color={"red"} ml="10px" mb="20px">
          Incorrect email or password
        </TypographyComponent>
      )}

      <InputField
        variant={"outlined"}
        value={LoginForm.email}
        startAdornment={<Image src={DIRECTNOTIFICATION} />}
        placeholder={LOGIN_CONSTANTS.EMAIL}
        onChange={(e) => handleFieldChange("email", e.target.value)}
        sx={styleInput}
      />

      <InputField
        type={LoginForm.showPassword ? "text" : "password"}
        variant={"outlined"}
        data-testid="password-textField"
        startAdornment={<Image src={LOCK} />}
        placeholder={LOGIN_CONSTANTS.PASSWORD}
        endAdornment={
          LoginForm.showPassword ? (
            <img src={EYE} alt="eye" onClick={handleTogglePassword} />
          ) : (
            <img src={CLOSEEYE} alt="closeeye" onClick={handleTogglePassword} />
          )
        }
        value={LoginForm.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
      />

      <TypographyComponent
        variant="button"
        textTransform="none"
        sx={styleTypography}
        onClick={() => {
          navigate(RESET_PASSWORD);
        }}
      >
        {LOGIN_CONSTANTS.FORGOT_PASSWORD}
      </TypographyComponent>

      <StyledButton
        variant="contained"
        data-testid="Button"
        disabled={handleSignUpButton()}
        onClick={handleLogin}
      >
        {loader
          ? LOGIN_CONSTANTS.CONT_BUTTON + "..."
          : LOGIN_CONSTANTS.CONT_BUTTON}
      </StyledButton>

      <DividerComponent text="Or" />

      <Stack
        direction="row"
        display="flex"
        justifyContent="space-around"
        marginTop="32px"
      >
        {LOGIN_CONSTANTS.NAV.map((item, index) => {
          return <SocialSignInButton key={item.alt} item={item} />;
        })}
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginTop="32px"
        gap={"6px"}
      >
        <TypographyComponent
          variant="h3"
          color={theme.palette.textColor.lowEmphasis}
        >
          {LOGIN_CONSTANTS.INFO}
        </TypographyComponent>

        <TypographyComponent
          variant="button"
          color={theme.palette.primary.primary400}
          sx={styleButtonTypo}
          onClick={() => navigate(ROUTES.SIGN_UP)}
        >
          {LOGIN_CONSTANTS.SIGN_UP}
        </TypographyComponent>
      </Stack>
    </Stack>
  );
};

export default LoginCard;
