import { screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom/extend-expect";
import SignupCard from ".";
import { EMAIL, NAME, PASSWORD, SIGN_UP } from "../../../utils/constants";
import { render } from "../../../test-setup";
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
  getUserByEmail: jest.fn(),
  postUser: jest.fn().mockImplementationOnce(() => Promise.resolve(user)),
}));
jest.mock("@auth0/auth0-react");
describe("Signup Card", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
  });
  test("should render signup text correctly", () => {
    render(<SignupCard />);
    const signupTextElement = screen.getByText(SIGN_UP);
    expect(signupTextElement).toBeInTheDocument();
  });

  test("should render with valid credentials", () => {
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(user)
    );

    render(<SignupCard />);
    const passwordInputElement = screen.getByPlaceholderText(
      PASSWORD
    ) as HTMLInputElement;
    const button = screen.getByTestId("Button");
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(NAME), {
      target: { value: "mario" },
    });
    fireEvent.change(screen.getByPlaceholderText(EMAIL), {
      target: { value: "mario@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(passwordInputElement);
    fireEvent.click(screen.getByText("Google"));
    fireEvent.click(button);
  });

  test("should have name inputfield changing correctly", () => {
    render(<SignupCard />);
    const nameInputElement = screen.getByPlaceholderText(
      NAME
    ) as HTMLInputElement;
    expect(nameInputElement).toBeInTheDocument();
  });

  test("Should have email inputfield changing correctly", () => {
    render(<SignupCard />);

    const emailInputElement = screen.getByPlaceholderText(
      EMAIL
    ) as HTMLInputElement;
    expect(emailInputElement).toBeInTheDocument();

    fireEvent.change(emailInputElement, { target: { value: EMAIL } });
    expect(emailInputElement.value).toBe(EMAIL);
  });

  test("should have password inputfield changing correctly", () => {
    render(<SignupCard />);
    const passwordInputElement = screen.getByPlaceholderText(
      PASSWORD
    ) as HTMLInputElement;
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.change(passwordInputElement, { target: { value: PASSWORD } });
    expect(passwordInputElement.value).toBe(PASSWORD);

    expect(screen.queryByAltText("eye")).not.toBeInTheDocument();
    const displayPassword = screen.getByAltText("closeeye");
    fireEvent.click(displayPassword);
    expect(screen.getByAltText("eye")).toBeInTheDocument();
    const passwordTextF = screen.getByTestId("password-textField");
    expect(passwordTextF).toBeInTheDocument();
    fireEvent.click(passwordTextF);
  });

  test("should navigate to login page", () => {
    render(<SignupCard />);
    fireEvent.click(screen.getByText("Login"));
  });

  test("should check when user is not found", () => {
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("User not found"))
    );
    render(<SignupCard />);
    const passwordInputElement = screen.getByPlaceholderText(
      PASSWORD
    ) as HTMLInputElement;
    const button = screen.getByTestId("Button");
    expect(passwordInputElement).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(NAME), {
      target: { value: "mario" },
    });
    fireEvent.change(screen.getByPlaceholderText(EMAIL), {
      target: { value: "mario@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PASSWORD), {
      target: { value: "Password@12345" },
    });
    fireEvent.click(passwordInputElement);
    fireEvent.click(button);
  });
});
