import { Typography, TypographyProps } from "@mui/material";

interface PropsType extends TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "body1"
    | "body2"
    | "title"
    | "caption"
    | "button";
}

const TypographyComponent = (props: PropsType) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export default TypographyComponent;
