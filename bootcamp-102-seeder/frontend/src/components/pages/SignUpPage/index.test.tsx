import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpPage from ".";
import { render } from "../../../test-setup";
import { EMAIL, NAME, PASSWORD } from "../../../utils/constants";

describe("sign up page", () => {
  test("should render title", () => {
    render(<SignUpPage />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("should render login button", () => {
    render(<SignUpPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should navigate to homepage", () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByPlaceholderText(NAME), {
      target: { value: "mario" },
    });
    fireEvent.change(screen.getByPlaceholderText(EMAIL), {
      target: { value: "mario@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
  });
});
