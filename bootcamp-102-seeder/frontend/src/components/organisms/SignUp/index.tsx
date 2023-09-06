import { useState } from "react";
import { Stack, styled } from "@mui/material";
import { InputField } from "../../atoms/inputfield";
import Button from "../../atoms/Button";
import TypographyComponent from "../../atoms/Typography";
import DividerComponent from "../../atoms/Divider";
import { theme } from "../../../theme/theme";
import {
  EMAIL,
  PASSWORD,
  NAME,
  SIGN_UP,
  SIGN_UP_BUTTON,
  ALREADY_HAS_ACCOUNT,
  SIGN_UP_CONSTANTS,
  LOGIN,
  VALID_EMAIL,
  VALID_PASSWORD,
  INITIAL_FORM_STATE,
  useAppContext,
} from "../../../utils/constants";
import LOCK from "../../../../public/assets/images/lock.svg";
import CLOSEEYE from "../../../../public/assets/images/closeEye.svg";
import DIRECTNOTIFICATION from "../../../../public/assets/images/direct-notification.svg";
import EYE from "../../../../public/assets/images/eye.svg";
import SmileLogo from "../../../../public/images/smile.svg";
import Image from "../../atoms/Image";
import { validateEmail, validatePassword } from "../../../../utils/index";
import SocialSignInButton from "../../molecules/SocialSignInButton";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import { getUserByEmail, postUser } from "../../../services";

const StyledButton = styled(Button)({
  textTransform: "none",
  width: "100%",
  height: "3.68rem",
  marginBottom: "32px",
  marginTop: "46px",
  backgroundColor: theme.palette.primary.primary500,
  borderRadius: "12px",
  "&:disabled": {
    backgroundColor: theme.palette.primary.primary600,
    color: theme.palette.primary.white500,
  },
});

const styleInput = {
  marginBottom: "20px",
};

const styleTypography = {
  textTransform: "none",
  ":hover": { cursor: "pointer" },
};

export interface FormState {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  validPassword: boolean;
  validEmail: boolean;
  userAlreadyExists: boolean;
}

const SignupCard = () => {
  const { setUserId } = useAppContext();
  const [signUpForm, setSignUpForm] = useState<FormState>(INITIAL_FORM_STATE);
  const navigate = useNavigate();

  const handleFieldChange = (field: keyof FormState, value: string) => {
    if (field === "name") {
      value = value.replace(/[^a-zA-Z]/g, "");
    }
    setSignUpForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "email") {
      setSignUpForm((prevState) => ({
        ...prevState,
        validEmail: validateEmail(value),
      }));
    } else if (field === "password") {
      setSignUpForm((prevState) => ({
        ...prevState,
        validPassword: validatePassword(value),
      }));
    }
  };

  const handleTogglePassword = () => {
    setSignUpForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const isEmailValid = (): boolean => {
    return signUpForm.validEmail;
  };

  const isPasswordValid = (): boolean => {
    return signUpForm.validPassword;
  };

  const isRequiredFieldsEmpty = (): boolean => {
    const { email, password } = signUpForm;
    return email === "" || password === "";
  };

  const handleSignUpButton = (): boolean => {
    return !isEmailValid() || !isPasswordValid() || isRequiredFieldsEmpty();
  };

  const handleSignUp = async () => {
    const { name, email, password } = signUpForm;
    getUserByEmail(email)
      ?.then(() => {
        setSignUpForm((prevState) => ({
          ...prevState,
          userAlreadyExists: true,
        }));
      })
      .catch(() => {
        postUser({ name, email, password })
          .then((res) => {
            navigate(ROUTES.LOGIN);
            setUserId(res.id);
          })
          .catch(() => {});
      });
  };
  console.log("post user inside catch")

  return (
    <Stack display="flex" width="100%" maxWidth="434px">
      <TypographyComponent
        variant="h1"
        marginBottom="40px"
        color={theme.palette.textColor.highEmphasis}
      >
        {SIGN_UP}
      </TypographyComponent>

      <InputField
        type={"text"}
        value={signUpForm.name}
        variant={"outlined"}
        startAdornment={<Image src={SmileLogo} />}
        placeholder={NAME}
        onChange={(e) => handleFieldChange("name", e.target.value)}
        sx={styleInput}
      />

      <InputField
        variant={"outlined"}
        value={signUpForm.email}
        startAdornment={<Image src={DIRECTNOTIFICATION} />}
        placeholder={EMAIL}
        onChange={(e) => handleFieldChange("email", e.target.value)}
        error={!signUpForm.validEmail}
        helperText={!signUpForm.validEmail ? VALID_EMAIL : ""}
        sx={styleInput}
      />

      <InputField
        type={signUpForm.showPassword ? "text" : "password"}
        variant={"outlined"}
        data-testid="password-textField"
        startAdornment={<Image src={LOCK} />}
        placeholder={PASSWORD}
        endAdornment={
          signUpForm.showPassword ? (
            <img src={EYE} alt="eye" onClick={handleTogglePassword} />
          ) : (
            <img src={CLOSEEYE} alt="closeeye" onClick={handleTogglePassword} />
          )
        }
        value={signUpForm.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
        error={!signUpForm.validPassword}
        helperText={!signUpForm.validPassword ? VALID_PASSWORD : ""}
      />

      {signUpForm.userAlreadyExists && (
        <TypographyComponent variant="h3" color={"red"} m="20px 0px 0px 10px">
          User already exists
        </TypographyComponent>
      )}

      <StyledButton
        variant="contained"
        data-testid="Button"
        disabled={handleSignUpButton()}
        onClick={handleSignUp}
      >
        {SIGN_UP_BUTTON}
      </StyledButton>

      <DividerComponent text="Or" />

      <Stack
        direction="row"
        display="flex"
        justifyContent="space-around"
        marginTop="32px"
      >
        {SIGN_UP_CONSTANTS.NAV.map((item, index) => {
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
          {ALREADY_HAS_ACCOUNT}
        </TypographyComponent>

        <TypographyComponent
          variant="button"
          color={theme.palette.primary.primary400}
          sx={styleTypography}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          {LOGIN}
        </TypographyComponent>
      </Stack>
    </Stack>
  );
};

export default SignupCard;
