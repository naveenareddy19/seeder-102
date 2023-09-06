import React from "react";
import { Box, styled } from "@mui/material";
import Button from "../../atoms/Button";
import BannerImage from "../../../../public/assets/images/banner1.svg";
import Money from "../../../../public/assets/images/money1.svg";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import Image from "../../atoms/Image/index";

interface PropsType {
  title: string;
  description: string;
  uptoAmount: string;
  buttonName: string;
  buttonOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledParentDivProps {
  backgroundImg: string;
}

const StyledParentDiv = styled("div")<StyledParentDivProps>(
  ({ backgroundImg }) => ({
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
  })
);

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.primary.primary500,
  backgroundSize: "100%",
  borderRadius: "12px",
  paddingLeft: "15px",
});

const StyledContentDiv = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "28px",
  width: "49%",
  [theme.breakpoints.between("md", "lg")]: {
    maxWidth: "80%",
  },
}));

const StyledHeading = styled(Typography)(() => ({
  color: theme.palette.textColor.main,
  width: "15rem",
  padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(
    0.3125
  )} ${theme.spacing(1.5)}`,
}));

const StyledDescriptionContainer = styled("div")({
  width: "19rem",
  padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(
    2.25
  )} ${theme.spacing(1.5)}`,
  fontWeight: "700",
});

const StyledDescription = styled(Typography)(() => ({
  color: theme.palette.textColor.highEmphasis,
}));

const StyledUptoAmount = styled(Typography)(() => ({
  color: theme.palette.textColor.highEmphasis,
  fontWeight: theme.typography.title.fontWeight,
}));

const styledButton = {
  borderRadius: "12px",
  padding: `${theme.spacing(5)} ${theme.spacing(10)} ${theme.spacing(
    5
  )} ${theme.spacing(10)}`,
  color: theme.palette.primary.white500,
  border: `1px solid ${theme.palette.primary.white500}`,
  width: "11.1875rem",
  height: "4.185rem",
  "&:hover": {
    border: `1px solid ${theme.palette.primary.white500}`,
  },
  "&:focus": {
    border: `1px solid ${theme.palette.primary.white500}`,
  },
};

const Banner = (props: PropsType) => {
  const { title, description, uptoAmount, buttonName, buttonOnClick } = props;
  return (
    <StyledBox height={"100%"}>
      <StyledParentDiv backgroundImg={Money} data-testid="banner">
        <StyledContentDiv>
          {title && <StyledHeading variant="h2">{title}</StyledHeading>}
          <p>
            <StyledDescriptionContainer>
              {description && (
                <StyledDescription variant="body1" as={"span"}>
                  {description}
                </StyledDescription>
              )}
              {uptoAmount && (
                <StyledUptoAmount variant="body1" as={"span"}>
                  {" " + uptoAmount}
                </StyledUptoAmount>
              )}
            </StyledDescriptionContainer>
          </p>
          <Button variant="outlined" onClick={buttonOnClick} sx={styledButton}>
            <Typography
              variant="button"
              color={theme.palette.textColor.highEmphasis}
            >
              {buttonName}
            </Typography>
          </Button>
        </StyledContentDiv>
      </StyledParentDiv>
      <Image
        src={BannerImage}
        alt="banner"
        width="390px"
        height="275px"
      ></Image>
    </StyledBox>
  );
};

export default Banner;
