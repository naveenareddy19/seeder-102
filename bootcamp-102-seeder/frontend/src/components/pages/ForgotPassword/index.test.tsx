import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPasswordPage from ".";
import { getUserByEmail } from "../../../services";
import * as constants from "../../../utils/constants";

const user = {
  id: 1,
  name: "username",
  emai: "user@gmail.com",
  password: "User@1234",
};
jest.mock("../../../services", () => ({
  getUserByEmail: jest.fn(),
}));
jest.mock("../../../utils/constants", () => {
  return {
    ...jest.requireActual("../../../utils/constants"),
    useAppContext: jest.fn(),
  };
});
describe("ForgotPasswordPage", () => {
  beforeEach(()=>{
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(user)
  );
  (constants.useAppContext as jest.Mock).mockImplementation(() => ({
    setUserId: jest.fn(),
  }));

  render(
    <BrowserRouter>
      <ForgotPasswordPage />
    </BrowserRouter>
  );
  })
  test("should render forgotpasswordpane component correctly", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });
    expect(resetPasswordButton).toBeDisabled;
    fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled;
    fireEvent.click(resetPasswordButton);
  });

  test("should render resetpassword component correctly", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });
    expect(resetPasswordButton).toBeDisabled;
    fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled;
    fireEvent.click(resetPasswordButton);
    const button = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(button);
    const resetCode = screen.getByPlaceholderText("Enter reset code");
    fireEvent.change(resetCode, { target: { value: "12345678" } });
    fireEvent.click(screen.getByText("Login"));
  });

  test("should render changepassword component correctly", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email id");
    const resetPasswordButton = screen.getByRole("button", {
      name: "Reset Password",
    });
    expect(resetPasswordButton).toBeDisabled;
    fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled;
    fireEvent.click(resetPasswordButton);
    const button = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(button);
    const resetCode = screen.getByPlaceholderText("Enter reset code");
    fireEvent.change(resetCode, { target: { value: "12345678" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));
  });
});
