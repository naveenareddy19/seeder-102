import React from "react";
import { styled, Card, Stack, Modal, ModalProps } from "@mui/material";
import { theme } from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import { InputField } from "../../atoms/inputfield";
import Button from "../../atoms/Button";
import CrossIcon from "../../../../public/assets/images/cross-icon.svg";

const StyleCard = styled(Card)({
  width: "640px",
  height: "363px",
  borderRadius: "12px",
  border: `1ps solid ${theme.palette.borderColor.borderLowEmphasis}`,
  background: `${theme.palette.structural.grey100}`,
  padding: "24px 40px 24px 40px",
});

const styleCancelButton = {
  textTransform: "none",
  width: "133px",
  height: "60px",
  borderRadius: "12px",
  color: `${theme.palette.textColor.mediumEmphasis}`,
  backgroundColor: `${theme.palette.structural.elevation2}`,
  border: "none",
  ":hover": {
    color: `${theme.palette.textColor.mediumEmphasis}`,
    backgroundColor: `${theme.palette.structural.elevation2}`,
    border: "none",
  },
};

const styleCreateCashKickButton = {
  textTransform: "none",
  width: "208px",
  height: "60px",
  borderRadius: "12px",
  backgroundColor: `${theme.palette.primary.primary500}`,
  color: `${theme.palette.primary.white500}`,
  ":hover": {
    backgroundColor: `${theme.palette.primary.primary500}`,
    color: `${theme.palette.primary.white500}`,
  },
  ":disabled": {
    color: `${theme.palette.textColor.lowEmphasis}`,
    backgroundColor: `${theme.palette.primary.primary600}`,
  },
};

export const CashKickModal = styled(Modal)((props: ModalProps) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const setModalBackgroundColor = {
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(16, 15, 28, 0.72)",
};

interface NameCashKickModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  handleCreateCashKick?: () => void;
  cashKickName?: string;
  handleCashKickName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameCashKickModal = (props: NameCashKickModalProps) => {
  return (
    <CashKickModal
      open={props.open}
      onClose={props.onClose}
      sx={setModalBackgroundColor}
    >
      <StyleCard>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <TypographyComponent
              variant="h1"
              color={theme.palette.textColor.highEmphasis}
            >
              {props.title}
            </TypographyComponent>
            <TypographyComponent
              variant="h3"
              color={theme.palette.textColor.lowEmphasis}
              mt="4px"
            >
              {props.description}
            </TypographyComponent>
          </Stack>
          <img
            src={CrossIcon}
            alt="cross-icon"
            onClick={props.onClose}
            style={{ cursor: "pointer" }}
          />
        </Stack>
        <TypographyComponent
          variant="body1"
          color={theme.palette.textColor.lowEmphasis}
          mt="48px"
        >
          Cash kick name
        </TypographyComponent>
        <InputField
          sx={{
            width: "560px",
            height: "56px",
            " & .MuiOutlinedInput-root": { backgroundColor: "#3A3A3D" },
            mt: "8px",
          }}
          placeholder="Ex: marketing expenses"
          value={props.cashKickName}
          onChange={props.handleCashKickName}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          sx={{ marginTop: "56px" }}
        >
          <Button
            variant="outlined"
            children="Cancel"
            sx={styleCancelButton}
            onClick={props.onClose}
          />
          <Button
            variant="outlined"
            children="Create Cash Kick"
            sx={styleCreateCashKickButton}
            disabled={props.cashKickName == ""}
            onClick={props.handleCreateCashKick}
          />
        </Stack>
      </StyleCard>
    </CashKickModal>
  );
};
export default NameCashKickModal;
