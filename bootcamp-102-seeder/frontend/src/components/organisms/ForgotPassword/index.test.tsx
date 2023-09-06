import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ForgotPasswordPane from ".";
import * as constants from "../../../utils/constants";
import { getUserByEmail } from "../../../services";

const user = {
  id: 1,
  name: "username",
  emai: "user@gmail.com",
  password: "User@1234",
};
jest.mock("../../../utils/constants", () => {
  return {
    ...jest.requireActual("../../../utils/constants"),
    useAppContext: jest.fn(),
  };
});
jest.mock("../../../services", () => ({
  getUserByEmail: jest.fn().mockImplementationOnce(() => Promise.resolve(user)),
}));

describe("ForgotPaswword", () => {
  const mockOnClickContinueButton = jest.fn();
  beforeEach(() => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(user)
    );
    render(
      <BrowserRouter>
        <ForgotPasswordPane onClickContinueButton={mockOnClickContinueButton} />
      </BrowserRouter>
    );
  });
  it("should render with correct props when email is not sent", () => {
    expect(screen.getByText("Forgot Password")).toBeInTheDocument;
    expect(screen.getByAltText("start-icon")).toBeInTheDocument;
    expect(screen.getByPlaceholderText("Enter your email id"))
      .toBeInTheDocument;
    expect(screen.getByRole("button", { name: "Reset Password" })).toBeDisabled;
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
  });

  it("should validate the email input when email is invalid", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });

    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });

    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    expect(resetPasswordButton).toBeDisabled();
  });

  it("should render the ResetEmailSuccessful component when valid email is sent", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });
    expect(resetPasswordButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled();
    fireEvent.click(resetPasswordButton);

    expect(screen.queryByText("Reset Password")).not.toBeInTheDocument();
    expect(screen.getByText("Reset email sent")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  it("should call the onClickContinueButton callback when the Continue button is clicked", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });
    expect(resetPasswordButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled();
    fireEvent.click(resetPasswordButton);
  });
});
