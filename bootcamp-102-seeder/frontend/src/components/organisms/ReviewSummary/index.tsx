import styled from "@emotion/styled";
import { Box, Divider, Slider } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";
import InfoCircle from "../../../../public/assets/images/info-circle.svg";
import { IconTypo } from "../../molecules/IconTypo";
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import { separateNumberWithCommas } from "../../../../utils/helperFunctions";
import { REVIEW_SUMMARY_CONSTANTS } from "../../../../utils/constants";

export interface ReviewSummaryProps {
  term: number;
  selectedContracts: number;
  selectedAmount: number;
  disableSlider?: boolean;
  onSliderChange?: (event: Event, newValue: any) => void;
  handleResetButton?: () => void;
  handleReviewCreditButton?: () => void;
  areContractsSelected?: boolean;
  openNamecashKickModal?: () => void;
  maxValue:number;
}

const StyledWrapper = styled(Box)(`
    width:24.9vw;
    padding:32px;
    border-radius:12px;
    border:1px solid ${theme.palette.borderColor.borderLowEmphasis};
    background:${theme.palette.structural.elevation1};
    & .MuiButton-root{
        text-transform:capitalize;
    }
    & .MuiButton-text:hover{
        background:${theme.palette.structural.elevation2};
    }
    & .MuiButton-contained:hover{
        background:${theme.palette.primary.primary500};
    }
    & .disable-reset{
        pointer-events:none;
        span{color:${theme.palette.borderColor.borderHighEmphasis} !important}
    }
    & .disable-review{
      pointer-events:none;
      opacity:0.56;
    }
    & .selected-amt{
        color:${theme.palette.primary.primary400};
    }
    & .total-amt{
        color:${theme.palette.textColor.highEmphasis};
    }
    & .MuiDivider-root{
      height:1px;
      margin:20px 0;
      background:${theme.palette.borderColor.borderHighEmphasis};
    }
`);

const buttonStyles = {
  borderRadius: "12px",
  background: theme.palette.structural.elevation2,
  marginRight: "-8px",
};

const reviewButtonStyles = {
  borderRadius: "12px",
  background: theme.palette.primary.primary500,
  padding: "20px 40px",
};

const RowStyled = styled(Box)(`
    display:flex;
    justify-content:space-between;
    align-items:center;
`);

const SliderStyled = styled(Slider)(`
    padding:19.5px 0;
    & .MuiSlider-track {
        background:${theme.palette.primary.primary500};
        border:none;
        border-radius:8px;
        height:8px;
    }
    & .MuiSlider-thumb {
        width:23px;
        height:23px;
        border-radius:8px;
        border:3px solid ${theme.palette.primary.primary400};
        background:${theme.palette.primary.primary500};
        box-shadow: 0px 4px 4px 0px ${theme.palette.iconColors.boxShadow1};
    }
    & .MuiSlider-rail {
        background:${theme.palette.structural.grey200};
        border:none;
        border-radius:8px;
        height:8px;
    }
    & .MuiSlider-thumb:hover,& .MuiSlider-thumb:focus {
        box-shadow:none;
    }
`);

const ReviewSummary = (props: ReviewSummaryProps) => {
  const interestAmt = separateNumberWithCommas(
    (props.selectedAmount * 0.12).toFixed(2)
  );
  const selectedAmt = separateNumberWithCommas(props.selectedAmount.toFixed(2));
  const totalPayoutAmt = separateNumberWithCommas(
    (props.selectedAmount * 0.88).toFixed(2)
  );

  return (
    <StyledWrapper>
      <IconTypo
        text={REVIEW_SUMMARY_CONSTANTS.title}
        textVariant="h2"
        textColor={theme.palette.textColor.highEmphasis}
        icon={InfoCircle}
        iconAlt={REVIEW_SUMMARY_CONSTANTS.iconAlt}
        direction={"row"}
        gap={"8px"}
      />
      {REVIEW_SUMMARY_CONSTANTS.info.map((item, idx) => (
        <RowStyled key={item} marginTop={idx === 0 ? "20px" : "12px"}>
          <Typography
            variant="body1"
            color={theme.palette.textColor.lowEmphasis}
          >
            {item}
          </Typography>
          <Typography
            variant="body1"
            color={theme.palette.textColor.highEmphasis}
          >
            {idx === 0 ? `${props.term} months` : props.selectedContracts}
          </Typography>
        </RowStyled>
      ))}
      {!props.disableSlider && (
        <>
          <RowStyled marginTop={"20px"}>
            <Typography
              variant="body1"
              color={theme.palette.textColor.lowEmphasis}
            >
              {REVIEW_SUMMARY_CONSTANTS.slide}
            </Typography>
            <Button
              variant="text"
              sx={buttonStyles}
              disableRipple
              className={props.selectedContracts > 0 ? "" : "disable-reset"}
              onClick={props.handleResetButton}
            >
              <Typography
                variant="button"
                color={theme.palette.textColor.mediumEmphasis}
                textTransform={"capitalize"}
              >
                {REVIEW_SUMMARY_CONSTANTS.reset}
              </Typography>
            </Button>
          </RowStyled>
          <SliderStyled
            max={props.maxValue+0.0001}
            value={props.selectedAmount}
            onChange={props.onSliderChange}
          />
          <Typography
            variant="body1"
            color={theme.palette.textColor.lowEmphasis}
          >
            <span className="selected-amt">
              {`$${separateNumberWithCommas(props.selectedAmount.toFixed(2))}`}
            </span>
            {REVIEW_SUMMARY_CONSTANTS.selectedOf}
            <span className="total-amt">
              {`$${separateNumberWithCommas(
                props.maxValue.toFixed(2)
              )}`}
            </span>
          </Typography>
        </>
      )}
      <RowStyled marginTop={props.disableSlider ? "12px" : "20px"}>
        <Typography variant="body1" color={theme.palette.textColor.lowEmphasis}>
          {REVIEW_SUMMARY_CONSTANTS.paybackAmt}
        </Typography>
        <Typography
          variant="body1"
          color={theme.palette.textColor.highEmphasis}
        >
          {`$${selectedAmt}`}
        </Typography>
      </RowStyled>
      <RowStyled marginTop={"12px"}>
        <Typography variant="body1" color={theme.palette.textColor.lowEmphasis}>
          {REVIEW_SUMMARY_CONSTANTS.rate}
        </Typography>
        <Box>
          <Typography
            variant="caption"
            color={theme.palette.textColor.lowEmphasis}
          >
            {`(${REVIEW_SUMMARY_CONSTANTS.rateValue.toFixed(2)}%) `}
          </Typography>
          <Typography
            variant="body1"
            color={theme.palette.textColor.highEmphasis}
            display={"inline-block"}
          >
            {`$${interestAmt}`}
          </Typography>
        </Box>
      </RowStyled>
      <Divider />
      <RowStyled margin={"20px 0"}>
        <Typography variant="h3" color={theme.palette.textColor.lowEmphasis}>
          {REVIEW_SUMMARY_CONSTANTS.totalPayout}
        </Typography>
        <Typography variant="h2" color={theme.palette.textColor.highEmphasis}>
          {`$${totalPayoutAmt}`}
        </Typography>
      </RowStyled>
      <Button
        variant="contained"
        fullWidth
        sx={reviewButtonStyles}
        disableRipple
        className={props.selectedContracts > 0 ? "" : "disable-review"}
        onClick={
          props.areContractsSelected
            ? props.openNamecashKickModal
            : props.handleReviewCreditButton
        }
      >
        <Typography
          variant="button"
          color={theme.palette.textColor.mediumEmphasis}
          textTransform={"capitalize"}
        >
          {props.areContractsSelected
            ? "Submit Your Credit"
            : REVIEW_SUMMARY_CONSTANTS.reviewCredit}
        </Typography>
      </Button>
    </StyledWrapper>
  );
};

export default ReviewSummary;
