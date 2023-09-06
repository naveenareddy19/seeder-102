import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Fade, Menu } from "@mui/material";
import React, { useState } from "react";
import TypographyComponent from "../../atoms/Typography";
import { theme } from "../../../theme/theme";
import { Avatar } from "../../atoms/Avatar";
import AvatarImg from "../../../../public/images/avatar.svg";
import DownArrow from "../../../../public/assets/images/arrow-bottom.svg";
import Image from "../../atoms/Image";
import { APP_HEADER_CONSTANTS } from "../../../../utils/constants";
import DividerComponent from "../../atoms/Divider";
import { IconTypo } from "../../molecules/IconTypo";

const Wrapper = styled(Box)(`
    width:77.60vw;
    height:71px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    & .avatar{
      display:flex;
      cursor:pointer;
      align-items:center;
      & .avatar-img{
        margin-right:8px;
        width:32px;
        height:32px;
      }
    }
`);

const MenuStyled = styled(Menu)(`
      & .MuiPaper-root{
        margin-top:50px;
        background:${theme.palette.structural.grey100};
        width:250px;
        padding:20px;
        border-radius:12px;
        border: 1px solid ${theme.palette.borderColor.borderLowEmphasis};
     }
     & .avatar-img-popup{
        margin-right:12px;
        width:40px;
        height:40px;
      }
      & .MuiList-root {
        padding:0px !important;
      }
`);

const AvatarInfo = styled(Box)(`
  padding:16px;
  display:flex;
`);

const IconTypoContainer = styled(Box)(`
  padding:16px;
`);

export interface ApplicationHeaderProps {
  title: string;
  subtitle: string;
  emoji?: string;
}

export const ApplicationHeader = (props: ApplicationHeaderProps) => {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleAvatarClick = (event: {
    currentTarget: React.SetStateAction<null | HTMLElement>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const [settings, popupLogout] = APP_HEADER_CONSTANTS.popupIconTypos;
  return (
    <Wrapper>
      <Box className="text-content">
        <TypographyComponent
          variant="title"
          color={theme.palette.textColor.highEmphasis}
        >
          {props.title}
        </TypographyComponent>
        {props.emoji && (
          <TypographyComponent variant="h2" display="inline-block">
            {props.emoji}
          </TypographyComponent>
        )}
        <TypographyComponent
          variant="h3"
          color={theme.palette.textColor.lowEmphasis}
        >
          {props.subtitle}
        </TypographyComponent>
      </Box>
      <Box className="avatar" onClick={handleAvatarClick}>
        <Avatar
          src={AvatarImg}
          alt={APP_HEADER_CONSTANTS.avatarAlt}
          variant="rounded"
          className="avatar-img"
        />
        <Image src={DownArrow} alt="dropdown" />
      </Box>
      <MenuStyled
        elevation={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleAvatarClose}
        TransitionComponent={Fade}
      >
        <AvatarInfo>
          <Avatar
            src={AvatarImg}
            alt={APP_HEADER_CONSTANTS.avatarAlt}
            variant="rounded"
            className="avatar-img-popup"
          />
          <Box display="flex" flexDirection="column">
            <TypographyComponent
              variant="h3"
              color={theme.palette.textColor.highEmphasis}
            >
              {APP_HEADER_CONSTANTS.name}
            </TypographyComponent>
            <TypographyComponent
              variant="caption"
              color={theme.palette.primary.primary400}
            >
              {APP_HEADER_CONSTANTS.editProfile}
            </TypographyComponent>
          </Box>
        </AvatarInfo>
        <DividerComponent />
        {APP_HEADER_CONSTANTS.popupItems.map((item) => (
          <Box key={item} padding={"16px"}>
            <TypographyComponent
              variant="button"
              color={theme.palette.textColor.lowEmphasis}
            >
              {item}
            </TypographyComponent>
          </Box>
        ))}
        <DividerComponent />
        <IconTypoContainer>
          <IconTypo
            icon={settings.src}
            text={settings.text}
            iconAlt={settings.alt}
            direction="row-reverse"
            gap="12px"
            textVariant="button"
            textColor={settings.color}
          />
        </IconTypoContainer>
        <IconTypoContainer
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleAvatarClose();
          }}
        >
          <Box
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            <IconTypo
              icon={popupLogout.src}
              text={popupLogout.text}
              iconAlt={popupLogout.alt}
              direction="row-reverse"
              gap="12px"
              textVariant="button"
              textColor={popupLogout.color}
            />
          </Box>
        </IconTypoContainer>
      </MenuStyled>
    </Wrapper>
  );
};
