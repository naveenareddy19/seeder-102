import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from ".";
import { LOGIN_CONSTANTS } from "../../../utils/constants";

describe("LoginPage", () => {
  it("should render LoginCard", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const loginCardElement = screen.getByText(LOGIN_CONSTANTS.SUB_HEADER);
    expect(loginCardElement).toBeInTheDocument();
  });

  test("should redirect with valid credentials to HOMEPAGE", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const passwordInputElement = screen.getByPlaceholderText(
      LOGIN_CONSTANTS.PASSWORD
    ) as HTMLInputElement;
    const button = screen.getByText(LOGIN_CONSTANTS.CONT_BUTTON);
    expect(passwordInputElement).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.EMAIL), {
      target: { value: "gmail@exam.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(button);
  });
});
