import React, { CSSProperties } from "react";
import { Chip as MuiChip } from "@mui/material";

interface ChipProp {
  label: string;
  size?: "medium" | "small";
  style?: CSSProperties;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProp> = ({ label, size, ...props }) => {
  return <MuiChip label={label} size={size} {...props} />;
};
