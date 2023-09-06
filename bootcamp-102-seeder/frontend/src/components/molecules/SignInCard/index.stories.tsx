import { StoryFn, Meta } from "@storybook/react";
import { SignInCard } from ".";
import { GOOGLE } from "./SigninCardConstants";
import { XERO } from "./SigninCardConstants";
import { STRIPE } from "./SigninCardConstants";
import GoogleLogo from "../../../../public/assets/images/google.svg";
import StripeLogo from "../../../../public/assets/images/stripe.svg";
import XeroLogo from "../../../../public/assets/images/xero.svg";

export default {
  title: "molecules/SignInCard",
  component: SignInCard,
} as Meta<typeof SignInCard>;

const template: StoryFn<typeof SignInCard> = (args: any) => (
  <SignInCard {...args} />
);

export const GoogleCard = template.bind({});
GoogleCard.args = {
  title: GOOGLE,
  iconSrc: GoogleLogo,
  iconAlt: GOOGLE,
};

export const StripeCard = template.bind({});
StripeCard.args = {
  title: STRIPE,
  iconSrc: StripeLogo,
  iconAlt: STRIPE,
};

export const XeroCard = template.bind({});
XeroCard.args = {
  title: XERO,
  iconSrc: XeroLogo,
  iconAlt: XERO,
};
