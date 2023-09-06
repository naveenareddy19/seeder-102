import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTHCONNECTION, HOMEPAGE } from "../../../../routers";
import { SignInCard } from "../SignInCard";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

interface SocialSignInButtonProps {
  item: {
    src: any;
    alt: string;
  };
}

const StyleStack = styled(Stack)({
  ":nth-child(n+2)": {
    pointerEvents: "none",
  },
});

const SocialSignInButton: React.FC<SocialSignInButtonProps> = ({ item }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyleStack
      onClick={() => {
        loginWithRedirect({
          authorizationParams: {
            connection: AUTHCONNECTION,
            redirect_uri: window.location.origin + HOMEPAGE,
          },
          appState: {
            returnTo: HOMEPAGE,
          },
        });
      }}
    >
      <SignInCard title={item.alt} iconSrc={item.src} iconAlt={item.alt} />
    </StyleStack>
  );
};

export default SocialSignInButton;
