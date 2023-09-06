import { createTheme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
    button: React.CSSProperties;
    title: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    body1?: React.CSSProperties;
    body2?: React.CSSProperties;
    caption?: React.CSSProperties;
    button?: React.CSSProperties;
    title?: React.CSSProperties;
  }
  interface Palette {
    textColor: Palette["primary"];
    borderColor: Palette["primary"];
    structural: Palette["primary"];
    iconColors: Palette["primary"];
  }
  interface PaletteOptions {
    textColor?: PaletteOptions["primary"];
    borderColor?: PaletteOptions["primary"];
    structural?: PaletteOptions["primary"];
    iconColors?: PaletteOptions["primary"];
  }
  interface Color {
    primary400?: string;
    primary500?: string;
    primary600?: string;
    white500?: string;
    lowEmphasis?: string;
    mediumEmphasis?: string;
    highEmphasis?: string;
    elevation0?: string;
    elevation1?: string;
    elevation2?: string;
    grey100?: string;
    grey200?: string;
    boxShadow1?: string;
    borderHighEmphasis?: string;
    borderLowEmphasis?: string;
    iconLowEmphasis?: string;
    iconHighEmphasis?: string;
    aquaBlue?: string;
    redOrange?: string;
  }
  interface PaletteColor extends Color {}
  interface SimplePaletteColorOptions extends Color {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    body1: true;
    body2: true;
    caption: true;
    button: true;
    title: true;
  }
}

export const theme = createTheme({
  spacing: 4,
  typography: {
    h1: {
      fontFamily: "Gilroy",
      fontSize: "28px",
      lineHeight: "34.3px",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "Gilroy",
      fontSize: "24px",
      lineHeight: "29.4px",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Gilroy",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Gilroy",
      fontSize: "16px",
      lineHeight: "22.4px",
      fontWeight: 500,
    },
    body2: {
      fontFamily: "Gilroy",
      fontSize: "14px",
      lineHeight: "17.15px",
      fontWeight: 600,
    },
    button: {
      fontFamily: "Gilroy",
      fontSize: "16px",
      lineHeight: "19px",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    caption: {
      fontFamily: "Gilroy",
      fontSize: "12px",
      lineHeight: "14.56px",
      fontWeight: 500,
    },
    title: {
      fontFamily: "Gilroy",
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "42px",
    },
  },
  palette: {
    primary: {
      main: "#7633FF",
      primary400: "#B4A9FF",
      primary500: "#6C5DD3",
      primary600: "#393552",
      white500: "#E8E8E9",
    },
    textColor: {
      main: "#FFFFFF",
      lowEmphasis: "#A5A5A6",
      mediumEmphasis: "#C9C8CC",
      highEmphasis: "#E8E7F0",
    },
    structural: {
      main: "#0052FF",
      elevation0: "#19181C",
      elevation1: "#201F24",
      elevation2: "#2D2D30",
      grey100: "#262529",
      grey200: "#3A3A3D",
      redOrange: "#EC977D",
      aquaBlue: "#A0D7E7",
    },
    borderColor: {
      main: "",
      borderLowEmphasis: "#28272B",
      borderHighEmphasis: "#413F4D",
    },
    iconColors: {
      main: "",
      iconHighEmphasis: "#D4D2DE",
      iconLowEmphasis: "#727080",
      boxShadow1: "#100c2e99",
    },
  },
});
