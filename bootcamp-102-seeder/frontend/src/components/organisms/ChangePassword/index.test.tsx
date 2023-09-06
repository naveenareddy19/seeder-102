import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangePassword from ".";
import { render } from "../../../test-setup";

const user = {
  id: 1,
  name: "username",
  emai: "user@gmail.com",
  password: "User@1234",
};

jest.mock("../../../services", () => ({
  getUserById: jest.fn().mockImplementationOnce(() => Promise.resolve(user)),
  updateUserPassword: jest.fn(() => Promise.resolve(user)),
}));

describe("ChangePassword component", () => {
  beforeEach(()=>{
    render(<ChangePassword/>)
  })
  test("should render component correctly when changePasswordSuccessful is false", () => {
    const titleElement = screen.getByTestId("title-change-password");
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByTestId("new-password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Change Password" })
    ).toBeDisabled();
  });

  test("should show error message for invalid new password", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    fireEvent.change(newPasswordInput, { target: { value: "invalid" } });
  });

  test("should toggle showPassword on eye icon click", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    expect(newPasswordInput).toBeInTheDocument();
    fireEvent.change(newPasswordInput, { target: { value: "password1" } });
    expect(newPasswordInput).toHaveAttribute("type", "password");
    const showPassword = screen.getByAltText("closeeye");
    fireEvent.click(showPassword);
    expect(newPasswordInput).toHaveAttribute("type", "text");
    expect(screen.getByAltText("eye")).toBeInTheDocument();
  });

  test("should show error message for password mismatch", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(newPasswordInput, { target: { value: "ValidPassword1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "DifferentPassword1" },
    });
    const mismatchErrorMessage = screen.getByText("Password do not match");
    expect(mismatchErrorMessage).toBeInTheDocument();
  });

  test("should render error message when confirm password is invalid", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(newPasswordInput, { target: { value: "ValidPassword1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "valid1" },
    });
    const mismatchErrorMessage = screen.getByText(
      "Password must contain at least 7 letters and 1 number"
    );
    expect(mismatchErrorMessage).toBeInTheDocument();
  });

  test("should enable the Change Password button when passwords match", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(newPasswordInput, { target: { value: "ValidPassword1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword1" },
    });
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });
    expect(changePasswordButton).toBeEnabled();
  });

  test("should disables the Change Password button when passwords do not match", () => {
    const newPasswordInput = screen.getByTestId("new-password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(newPasswordInput, { target: { value: "ValidPassword1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "DifferentPassword1" },
    });
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });
    expect(changePasswordButton).toBeDisabled();
  });

  test("should render component correctly when changePasswordSuccessful is true", () => {
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });
    expect(changePasswordButton).toBeDisabled();
    const newPasswordInput = screen.getByTestId("new-password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(newPasswordInput, { target: { value: "ValidPassword1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword1" },
    });
    expect(changePasswordButton).toBeEnabled();
    fireEvent.click(changePasswordButton);

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: "Login Now" });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
  });
});
