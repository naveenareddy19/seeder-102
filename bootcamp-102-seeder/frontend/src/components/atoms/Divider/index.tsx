import React from "react";
import Divider from "@mui/material/Divider";
import TypographyComponent from "../Typography";
import { theme } from "../../../theme/theme";

const divStyle = {
  display: "flex",
  alignItems: "center",
  color: theme.palette.textColor.mediumEmphasis,
  padding: "0 16px",
};

const styleDivider = {
  backgroundColor: theme.palette.borderColor.borderHighEmphasis,
  height: "1px",
};

interface DividerProps {
  text?: string;
}

const DividerComponent = (props: DividerProps) => {
  return (
    <div style={divStyle} className="custom-divider">
      <div style={{ flexGrow: 1 }}>
        <Divider sx={styleDivider} />
      </div>
      {props.text && (
        <TypographyComponent variant="body1" sx={{ p: "4px 8px 4px 8px" }}>
          {props.text}
        </TypographyComponent>
      )}
      <div style={{ flexGrow: 1 }}>
        <Divider sx={styleDivider} />
      </div>
    </div>
  );
};
export default DividerComponent;
