import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TypographyComponent from "../Typography";
import { theme } from "../../../theme/theme";

export const CircularProgressBar = (props: { value: number }) => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <CircularProgress
      variant="determinate"
      size="5rem"
      thickness={4}
      sx={{ color: theme.palette.structural.grey200, position: "absolute" }}
      value={100}
    />
    <CircularProgress
      variant="determinate"
      size="5rem"
      thickness={4}
      sx={{ color: theme.palette.structural.aquaBlue }}
      value={props.value}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TypographyComponent variant="body2" color="#A0D7E7">{`${Math.round(
        props.value
      )}%`}</TypographyComponent>
    </Box>
  </Box>
);
