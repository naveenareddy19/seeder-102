import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { SignInCard } from ".";
import { STRIPE } from "./SigninCardConstants";
import StripeLogo from "../../../../public/assets/images/stripe.svg";

describe("Social Card component", () => {
  beforeEach(() => {
    render(<SignInCard title={STRIPE} iconSrc={StripeLogo} iconAlt={STRIPE} />);
  });
  test("rendering the component", () => {
    expect(screen.getByText(STRIPE)).toBeInTheDocument();
  });
  test("rendering the disabled component", () => {
    const iconElement = screen.getByAltText("Stripe");
    expect(iconElement).toBeInTheDocument();
  });
});
