import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../../../theme/theme";
import { IconTypo } from "../../molecules/IconTypo";
import Logo from "../../../../public/assets/images/logo.svg";
import { CONSTANTS, NavBarProps } from "./NavigationBarConstants";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";

const StyledWrapper = styled(Box)(`
    height:100vh;
    width:18.30vw;
    padding:20px;
    padding-top:40px;
    background:${theme.palette.structural.elevation1};
    & .active{
      background:${theme.palette.structural.elevation2};
    }
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`);

const NavItems = styled(Box)(`
    margin-top:40px;
`);

const IconTypoStyled = styled(Box)(`
    padding:16px;
    & .MuiTypography-root{
      padding-top:5px;
    }
    border-radius:12px;
    cursor:pointer;
`);

const LogoStyled = styled(Box)(`
  padding:2px 4px;
  height:40px;
  .MuiTypography-root{
    margin-top:5px;
  }
`);

const WatchNowTab = styled(Box)(`
    padding:16px;
    & .MuiTypography-root{
      padding-top:5px;
    }
`);

const NavigationBar = (props: NavBarProps) => {
  const { switchNavTab } = props;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(switchNavTab);

  const handleNavigation = (id: number) => {
    setActiveTab(id);
    switch (id) {
      case 1:
        navigate(ROUTES.CASH_ACCN);
        break;
      case 0:
        navigate(ROUTES.HOMEPAGE);
        break;
    }
  };

  return (
    <StyledWrapper>
      <Box>
        <LogoStyled>
          <IconTypo
            icon={Logo}
            text={CONSTANTS.title}
            iconAlt={CONSTANTS.logoAltText}
            direction="row-reverse"
            gap="8px"
            textVariant="h2"
            textColor={theme.palette.textColor.highEmphasis}
          />
        </LogoStyled>
        <NavItems>
          {CONSTANTS.navItemsData.map((item, idx) => (
            <IconTypoStyled
              key={item.alt}
              className={activeTab === idx ? "active" : ""}
              onClick={() => {
                handleNavigation(idx);
              }}
            >
              <IconTypo
                icon={activeTab === idx ? item.srcActive : item.src}
                text={item.text}
                iconAlt={item.alt}
                direction="row-reverse"
                gap="12px"
                textVariant="body2"
                textColor={
                  activeTab === idx
                    ? theme.palette.textColor.highEmphasis
                    : theme.palette.textColor.lowEmphasis
                }
              />
            </IconTypoStyled>
          ))}
        </NavItems>
      </Box>
      <WatchNowTab>
        <IconTypo
          icon={CONSTANTS.navItemWatch.src}
          text={CONSTANTS.navItemWatch.text}
          iconAlt={CONSTANTS.navItemWatch.alt}
          direction="row-reverse"
          gap="12px"
          textVariant="body2"
          textColor={theme.palette.textColor.lowEmphasis}
        />
      </WatchNowTab>
    </StyledWrapper>
  );
};

export default NavigationBar;
