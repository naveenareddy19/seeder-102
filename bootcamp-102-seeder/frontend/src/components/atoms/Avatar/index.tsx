import React from "react";
import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";

export const Avatar = (props: AvatarProps) => {
  return <MuiAvatar {...props} />;
};
