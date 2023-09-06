import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Auth0Provider } from "@auth0/auth0-react";
import SocialSignInButton from ".";

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
  Auth0Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth0-provider-mock">{children}</div>
  ),
}));
const mockItem = {
  src: "SrcValue",
  alt: "Google",
};

test("renders SocialSignInButton", () => {
  const { getByAltText } = render(
    <Auth0Provider domain="your-auth0-domain" clientId="your-client-id">
      <SocialSignInButton item={mockItem} />
    </Auth0Provider>
  );
  const signInButton = getByAltText("Google");
  fireEvent.click(signInButton);
});
