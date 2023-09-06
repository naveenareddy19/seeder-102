import { Box, Grid, Stack, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import Button from "../../atoms/Button";
import TypographyComponent from "../../atoms/Typography";
import { SummaryCardConstants } from "../../../../utils/constants";
import { IconTypo } from "../../molecules/IconTypo";
import info from "./../../../../public/assets/images/info-circle.svg";

export interface SummaryCardType {
  term: string;
  contracts: string;
  payback: string;
  rate: string;
  payout: string;
  [key: string]: string;
}

export interface SummaryCardProps {
  data: SummaryCardType;
}

const StyledRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const styleStack = {
  width: "340px",
  height: "385px",
  border: `1px solid ${theme.palette.structural.elevation1}`,
};

const styleDivider = {
  height: "1px",
  width: "100%",
  background: theme.palette.borderColor.borderHighEmphasis,
};
const styleButton = {
  width: "100%",
  height: "59px",
  borderRadius: "12px",
};

const SummaryCard = (props: SummaryCardProps) => {
  return (
    <>
      <Stack
        spacing="20px"
        style={styleStack}
        borderRadius="12px"
        padding="32px"
        direction="column"
      >
        <IconTypo
          icon={info}
          text={SummaryCardConstants.heading}
          iconAlt={SummaryCardConstants.heading}
          direction="row"
          gap="8px"
          textColor={theme.palette.textColor.highEmphasis}
          textVariant="h2"
          iconwidth="22px"
        />

        <Box>
          {SummaryCardConstants.SummaryDetails.map((item) => {
            return (
              <StyledRow key={item.label}>
                <TypographyComponent
                  variant="body1"
                  color={theme.palette.textColor.lowEmphasis}
                  paddingBottom="6px"
                >
                  {item.label}
                </TypographyComponent>

                <Stack direction="row" spacing="4px">
                  {item.label === "Rate %" && (
                    <TypographyComponent
                      variant="caption"
                      color={theme.palette.textColor.lowEmphasis}
                      paddingTop="5px"
                    >
                      {SummaryCardConstants.RatePercent}
                    </TypographyComponent>
                  )}

                  <TypographyComponent
                    variant="body1"
                    color={theme.palette.textColor.highEmphasis}
                  >
                    {props.data[item.id]}
                  </TypographyComponent>
                </Stack>
              </StyledRow>
            );
          })}
        </Box>
        <div style={styleDivider} />
        <StyledRow>
          <TypographyComponent
            variant="h3"
            color={theme.palette.textColor.lowEmphasis}
          >
            {SummaryCardConstants.Payout}
          </TypographyComponent>
          <TypographyComponent
            variant="h2"
            color={theme.palette.textColor.highEmphasis}
          >
            {props.data.payout}
          </TypographyComponent>
        </StyledRow>

        <Grid container alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            sx={styleButton}
            onClick={() => {
              // Onclick open name cash kick model
            }}
          >
            <TypographyComponent
              variant="button"
              sx={{ textTransform: "none" }}
            >
              {SummaryCardConstants.Button}
            </TypographyComponent>
          </Button>
        </Grid>
      </Stack>
    </>
  );
};

export default SummaryCard;
