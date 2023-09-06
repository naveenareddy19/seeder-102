import React from "react";
import { Button, Card, Modal, ModalProps, Stack, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import CrossIcon from "../../../../public/assets/images/cross-icon.svg";
import { CASH_KICK_SUCCESS_MODAL } from "../../../../utils/constants";
import GIF from "../../../../public/assets/images/preloader.gif";

const SuccessModal = styled(Modal)((props: ModalProps) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledModal = styled(Card)({
  width: "640px",
  height: "584px",
  borderRadius: "12px",
  border: `1ps solid ${theme.palette.borderColor.borderLowEmphasis}`,
  background: `${theme.palette.structural.grey100}`,
  padding: "24px 40px 24px 40px",
});

const cancelButtonStyle = {
  textTransform: "none",
  width: "122px",
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

const viewCashKickButtonStyle = {
  textTransform: "none",
  width: "198px",
  height: "60px",
  borderRadius: "12px",
  backgroundColor: `${theme.palette.primary.primary500}`,
  color: `${theme.palette.primary.white500}`,
  ":hover": {
    backgroundColor: `${theme.palette.primary.primary500}`,
    color: `${theme.palette.primary.white500}`,
  },
};

const styleGIF = {
  display: "block",
  margin: "0 auto",
};
const ButtonsStack = styled(Stack)({
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: "54px",
});

const setModalBackground={
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(16, 15, 28, 0.72)",
}

interface CashKickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickViewCashKicks: () => void;
}

const CashKickSuccessModal = ({
  isOpen,
  onClose,
  onClickViewCashKicks,
}: CashKickModalProps) => {
  return (
    <SuccessModal
      open={isOpen}
      onClose={onClose}
      sx={setModalBackground}
    >
      <StyledModal>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"flex-start"}
        >
          <Stack>
            <TypographyComponent
              variant="h1"
              color={theme.palette.textColor.highEmphasis}
              children={CASH_KICK_SUCCESS_MODAL.title}
            />
            <TypographyComponent
              variant="h3"
              color={theme.palette.textColor.lowEmphasis}
              mt="4px"
              mb="42px"
              children={CASH_KICK_SUCCESS_MODAL.description}
            />
          </Stack>
          <img
            src={CrossIcon}
            alt="cross-icon"
            onClick={onClose}
            style={{ cursor: "pointer", marginTop: "10px" }}
          />
        </Stack>
        <img src={GIF} alt="review-gif" height="172px" style={styleGIF} />
        <TypographyComponent
          variant="h2"
          color={theme.palette.textColor.highEmphasis}
          align="center"
          mt="32px"
          children={CASH_KICK_SUCCESS_MODAL.info}
        />
        <TypographyComponent
          variant="body1"
          color={theme.palette.textColor.lowEmphasis}
          align="center"
          mt="8px"
          children={CASH_KICK_SUCCESS_MODAL.message}
        />
        <ButtonsStack direction="row" spacing={2}>
          <Button
            variant="outlined"
            children="Close"
            sx={cancelButtonStyle}
            onClick={onClose}
          />
          <Button
            variant="outlined"
            children="View Cash Kicks"
            sx={viewCashKickButtonStyle}
            onClick={onClickViewCashKicks}
          />
        </ButtonsStack>
      </StyledModal>
    </SuccessModal>
  );
};
export default CashKickSuccessModal;
