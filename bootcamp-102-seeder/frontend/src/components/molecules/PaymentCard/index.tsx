import { Box } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { IconTypo } from "../IconTypo";
import { theme } from "../../../theme/theme";
import { AMOUNT_TEXT, DUE_TEXT } from "./PaymentCardConst";
import DueIcon from "../../../../public/assets/images/dueIcon.svg";
import InfoSVG from "../../../../public/assets/images/paymentinfo-circle.svg";
import { CircularProgressBar } from "../../atoms/CircularProgressBar";
import { separateNumberWithCommas } from "../../../../utils/helperFunctions";
import { useAppContext } from "../../../utils/constants";

export interface PaymentCardProps {
  card: "amount" | "due";
  dueAmount?: string;
  dueDate?: string;
  amount?: number;
}

export const PaymentCard = (props: PaymentCardProps) => {
  const { upcomingPayment } = useAppContext();
  return (
    <Box
      bgcolor={theme.palette.structural.elevation1}
      width="24.89vw"
      height="259px"
      display="flex"
      flexDirection={"column"}
      borderColor={theme.palette.textColor.lowEmphasis}
      borderRadius="12px"
      padding="32px"
    >
      <Box display="flex" justifyContent="flex-end">
        {props.card === "due" && (
          <Box
            display="flex"
            bgcolor="#E39AB2"
            width="123px"
            height="25px"
            align-items="center"
            padding="4px 8px"
            borderRadius="4px"
          >
            <TypographyComponent
              variant="body2"
              color={theme.palette.structural.elevation1}
            >
              {`Due in ${upcomingPayment?.days} day(s)`}
            </TypographyComponent>
          </Box>
        )}
      </Box>
      <Box paddingBottom="18px">
        {props.card === "due" && <img src={DueIcon} alt="Due" />}
        {props.card === "amount" && (
          <Box paddingTop="25px">
            <CircularProgressBar value={props.amount! / 8800} />
          </Box>
        )}
      </Box>
      <IconTypo
        text={props.card === "due" ? DUE_TEXT + props.dueDate : AMOUNT_TEXT}
        icon={InfoSVG}
        textVariant="body1"
        textColor={theme.palette.textColor.mediumEmphasis}
        iconAlt="PaymentCardIcon"
        direction="row"
        gap="8px"
        iconwidth="16px"
      />
      <TypographyComponent
        variant="h2"
        sx={{ color: theme.palette.textColor.highEmphasis, marginTop: "8px" }}
      >
        $
        {props.card === "due"
          ? props.dueAmount
          : `${separateNumberWithCommas(props.amount!.toFixed(2))}`}
      </TypographyComponent>
    </Box>
  );
};
