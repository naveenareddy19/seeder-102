import { screen, render, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom/extend-expect";
import LoginCard from ".";
import { LOGIN_CONSTANTS } from "../../../utils/constants";
import { BrowserRouter } from "react-router-dom";
import * as constants from "../../../utils/constants";
import { getToken, getUserByEmail } from "../../../services";

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
  getUserByEmail: jest.fn(),
  getToken: jest.fn(),
}));

jest.mock("@auth0/auth0-react");
describe("Login Card", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getToken as jest.Mock).mockImplementationOnce(() => Promise.resolve(user));
  });
  test("should render with valid credentials", () => {
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(user)
    );
    render(
      <BrowserRouter>
        <LoginCard />
      </BrowserRouter>
    );
    const passwordInputElement = screen.getByPlaceholderText(
      LOGIN_CONSTANTS.PASSWORD
    ) as HTMLInputElement;
    const button = screen.getByTestId("Button");
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.click(screen.getByText(LOGIN_CONSTANTS.FORGOT_PASSWORD));

    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.EMAIL), {
      target: { value: "gmail@exam.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(passwordInputElement);
    fireEvent.click(screen.getByText("Google"));
    fireEvent.click(button);
  });

  test("should have email inputfield changing correctly", () => {
    render(
      <BrowserRouter>
        <LoginCard />
      </BrowserRouter>
    );

    const emailInputElement = screen.getByPlaceholderText(
      LOGIN_CONSTANTS.EMAIL
    ) as HTMLInputElement;
    expect(emailInputElement).toBeInTheDocument();

    fireEvent.change(emailInputElement, {
      target: { value: LOGIN_CONSTANTS.EMAIL },
    });
    expect(emailInputElement.value).toBe(LOGIN_CONSTANTS.EMAIL);
  });

  test("should have password inputfield changing correctly", () => {
    render(
      <BrowserRouter>
        <LoginCard />
      </BrowserRouter>
    );
    const passwordInputElement = screen.getByPlaceholderText(
      LOGIN_CONSTANTS.PASSWORD
    ) as HTMLInputElement;
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.change(passwordInputElement, {
      target: { value: LOGIN_CONSTANTS.PASSWORD },
    });
    expect(passwordInputElement.value).toBe(LOGIN_CONSTANTS.PASSWORD);

    expect(screen.queryByAltText("eye")).not.toBeInTheDocument();
    const displayPassword = screen.getByAltText("closeeye");
    fireEvent.click(displayPassword);
    expect(screen.getByAltText("eye")).toBeInTheDocument();
    const passwordTextF = screen.getByTestId("password-textField");
    expect(passwordTextF).toBeInTheDocument();
    fireEvent.click(passwordTextF);
  });
  test("should check when user is not found", () => {
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("User not found"))
    );
    render(
      <BrowserRouter>
        <LoginCard />
      </BrowserRouter>
    );
    const passwordInputElement = screen.getByPlaceholderText(
      LOGIN_CONSTANTS.PASSWORD
    ) as HTMLInputElement;
    const button = screen.getByTestId("Button");
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.click(screen.getByText(LOGIN_CONSTANTS.FORGOT_PASSWORD));

    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.EMAIL), {
      target: { value: "gmail@exam.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(LOGIN_CONSTANTS.PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(passwordInputElement);
    fireEvent.click(button);
  });

  test("should navigate to signup page when signup text is clicked", () => {
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(user)
    );
    render(
      <BrowserRouter>
        <LoginCard />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Sign Up"));
  });
});
