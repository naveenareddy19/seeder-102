import { Box } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import Image from "../../atoms/Image";
import { theme } from "../../../theme/theme";

interface SignInCardProps {
  title: string;
  iconSrc: string;
  iconAlt: string;
  handleClick?: () => void;
}

export const SignInCard = (props: SignInCardProps) => {
  return (
    <Box
      bgcolor={theme.palette.structural.elevation1}
      width="129px"
      height="96px"
      display="flex"
      flexDirection={"column"}
      gap="8px"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius="12px"
      onClick={props.handleClick}
      sx={{
        cursor: "pointer",
      }}
    >
      <Image src={props.iconSrc} alt={props.iconAlt} width="20px" />
      <TypographyComponent
        variant="button"
        color={theme.palette.textColor.mediumEmphasis}
        sx={{ textTransform: "none" }}
      >
        {props.title}
      </TypographyComponent>
    </Box>
  );
};
