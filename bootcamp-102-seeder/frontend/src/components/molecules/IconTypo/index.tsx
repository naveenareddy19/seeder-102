import { Stack } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";

export interface IconTypoProps {
  icon: string;
  text: string;
  textVariant?: any;
  textColor?: string;
  iconAlt: string;
  iconwidth?: string;
  iconheight?: string;
  direction: "row" | "row-reverse";
  gap: string;
}

export const IconTypo = (props: IconTypoProps) => {
  const reversed = props.direction === "row-reverse";

  return (
    <Stack
      direction={reversed ? "row-reverse" : "row"}
      gap={props.gap}
      justifyContent={reversed ? "flex-end" : "flex-start"}
      alignItems="center"

    >
      <TypographyComponent variant={props.textVariant} color={props.textColor}>
        {props.text}
      </TypographyComponent>
      <img
        alt={props.iconAlt}
        src={props.icon}
        style={{ height: props.iconheight, width: props.iconwidth }}
      />
    </Stack>
  );
};
