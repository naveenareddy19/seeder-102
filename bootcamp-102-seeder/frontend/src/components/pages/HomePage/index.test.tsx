import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test-setup";
import HomePage from ".";
import * as constants from "../../../utils/constants";
import { getCashKicks, getUserByEmail } from "../../../services";
import data from "../../../../db.json";

const user = {
  id: 1,
  name: "username",
  emai: "user@gmail.com",
  password: "User@1234",
};

const cashKicks = [
  {
    name: "Second cashkick",
    status: "pending",
    maturity: "2023-08-08T05:36:57.933Z",
    totalReceived: 84480,
    totalFinanced: 880000,
    userId: 1,
    id: 7,
  },
];
jest.mock("../../../utils/constants", () => {
  return {
    ...jest.requireActual("../../../utils/constants"),
    useAppContext: jest.fn(),
  };
});
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(() => ({
    isAuthenticated: true,
    user: {
      name: "John",
      email: "john.doe@example.com",
    },
  })),
}));
jest.mock("../../../services", () => ({
  getContracts: jest.fn(),
  getCashKicks: jest.fn(),
  getUserByEmail: jest.fn(),
  postUser: jest.fn().mockImplementationOnce(() => Promise.resolve(user)),
  getToken: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve({ token: "newToken" })),
}));
describe("HomePage Component", () => {
  it("should render New Cash Kick Button", () => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getCashKicks as jest.Mock).mockResolvedValueOnce([...cashKicks]);
    render(<HomePage />);
  });

  it("should render funding image", () => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getCashKicks as jest.Mock).mockResolvedValueOnce([]);
    const { container } = render(<HomePage />);
    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
  });

  test("should check when user is found", () => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(user)
    );
    (getCashKicks as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve([])
    );
    render(<HomePage />);
  });
  test("should check when user is not found", () => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    (getUserByEmail as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(user)
    );
    (getCashKicks as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve([])
    );
    render(<HomePage />);
  });
});
