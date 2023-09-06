import { fireEvent, render, screen } from "@testing-library/react";
import ResetPassword from ".";
import MoreIcon from "../../../../public/assets/images/more.svg";


describe("Reset password component", () => {
  const mockOnChange = jest.fn();
  const mockOnClickResetPassword = jest.fn();
  const mockOnClickLoginButton = jest.fn();
  beforeEach(() => {
    render(
      <ResetPassword
        title="Enter reset code"
        description="Please enter reset code sent to your email to proceed further"
        placeholder="enter reset code"
        inputIcon={MoreIcon}
        onChange={mockOnChange}
        onClickResetPassword={mockOnClickResetPassword}
        onClickLoginButton={mockOnClickLoginButton}
      />
    );
  });

  it("should render with correct props", () => {
    expect(screen.getByText("Enter reset code")).toBeInTheDocument;
    expect(
      screen.getByText(
        "Please enter reset code sent to your email to proceed further"
      )
    ).toBeInTheDocument;
    expect(screen.getByPlaceholderText("enter reset code")).toBeInTheDocument;
    expect(screen.getByAltText("start-icon")).toBeInTheDocument;
  });

  it("should call the onchange prop when the input value changes", () => {
    const inputField = screen.getByPlaceholderText("enter reset code");
    fireEvent.change(inputField, { target: { value: "new code" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call the onClickResetPassword prop when the button is clicked", () => {
    const button = screen.getByText("Reset Password");
    fireEvent.click(button);
    expect(mockOnClickResetPassword).toHaveBeenCalled();
  });

  it("should call the onClickLoginButton prop when login button is clicked", () => {
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    expect(mockOnClickLoginButton).toHaveBeenCalled();
  });
});
