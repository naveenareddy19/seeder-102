import { Card, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import Button from "../../atoms/Button";
import {
  AVAILABLE_NEW_CASH_ADVANCE,
  HAVE_UPTO,
  LAUNCH_NEW_CASH_KICK,
  NEW_CASH_KICK,
  NO_CREDIT_LIMIT,
} from "./NewCashKickConstants";

const StyleCard = styled(Card)({
  width: "24.89vw",
  minWidth: "340px",
  height: "257px",
  border: `1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
  backgroundColor: theme.palette.structural.elevation1,
  borderRadius: "12px",
  padding: "32px",
});

const styleButton = {
  width: "100%",
  height: "59px",
  borderRadius: "12px",
  mt: "20px",
  textTransform: "none",
  ":disabled": {
    color: `${theme.palette.textColor.lowEmphasis}`,
    backgroundColor: `${theme.palette.primary.primary600}`,
  },
  ":hover": {
    cursor: "pointer",
  },
};

interface CashKickProps {
  totalAmount: string;
  onClick: () => void;
}

const NewCashKick = (props: CashKickProps) => {
  return (
    <StyleCard>
      <TypographyComponent
        variant="h2"
        color={theme.palette.textColor.highEmphasis}
        width="200px"
      >
        {props.totalAmount == "$0.00" ? NO_CREDIT_LIMIT : LAUNCH_NEW_CASH_KICK}
      </TypographyComponent>
      <TypographyComponent
        variant="body1"
        color={theme.palette.textColor.lowEmphasis}
        width="279px"
        marginTop="12px"
      >
        {`${HAVE_UPTO} `}
        <span style={{ color: theme.palette.textColor.highEmphasis }}>
          {props.totalAmount == "$0.00" ? "$0.00" : props.totalAmount}
        </span>
        {` ${AVAILABLE_NEW_CASH_ADVANCE}`}
      </TypographyComponent>
      {props.totalAmount == "$0.00" ? (
        <Button
          children={"Request Credit increase"}
          sx={styleButton}
          variant="contained"
        />
      ) : (
        <Button
          children={NEW_CASH_KICK}
          sx={styleButton}
          variant="contained"
          onClick={props.onClick}
        />
      )}
    </StyleCard>
  );
};
export default NewCashKick;
