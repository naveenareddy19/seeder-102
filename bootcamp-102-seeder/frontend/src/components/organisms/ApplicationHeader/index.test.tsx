import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "@auth0/auth0-react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationHeader } from ".";
import { APP_HEADER_CONSTANTS } from "../../../../utils/constants";
import { generateGreeting } from "../../../../utils/helperFunctions";
import { render } from "../../../test-setup";

jest.mock("../../../../utils/helperFunctions.tsx", () => ({
  generateGreeting: jest.fn(),
  formatDate: jest.fn(),
  separateNumberWithCommas: jest.fn(),
}));
jest.mock("@auth0/auth0-react");
describe("Application header component", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });
  test("should render title", () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good morning");
    render(
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[0].title}
        subtitle={APP_HEADER_CONSTANTS.data[0].subtitle}
      />
    );
    expect(
      screen.getByText(APP_HEADER_CONSTANTS.data[0].title)
    ).toBeInTheDocument();
  });

  test("should render subtitle", () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good afternoon");
    render(
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[1].title}
        subtitle={APP_HEADER_CONSTANTS.data[1].subtitle}
      />
    );
    expect(
      screen.getByText(APP_HEADER_CONSTANTS.data[1].subtitle)
    ).toBeInTheDocument();
  });

  test("should render image", () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good afternoon");
    render(
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[2].title}
        subtitle={APP_HEADER_CONSTANTS.data[2].subtitle}
        emoji=" ✋"
      />
    );
    expect(
      screen.getByAltText(APP_HEADER_CONSTANTS.avatarAlt)
    ).toBeInTheDocument();
  });

  test("should render popup when avatar dropdown is clicked", () => {
    render(
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[1].title}
        subtitle={APP_HEADER_CONSTANTS.data[1].subtitle}
      />
    );
    const avatarDropdown = screen.getByAltText(APP_HEADER_CONSTANTS.avatarAlt);
    fireEvent.click(avatarDropdown);
    expect(screen.getByText(APP_HEADER_CONSTANTS.name)).toBeInTheDocument();
    fireEvent.click(avatarDropdown);
  });

  test("popup should be closed when avatar logout is clicked", () => {
    render(
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[1].title}
        subtitle={APP_HEADER_CONSTANTS.data[1].subtitle}
      />
    );
    const avatarDropdown = screen.getByAltText(APP_HEADER_CONSTANTS.avatarAlt);
    fireEvent.click(avatarDropdown);
    const logout = screen.getByText(
      APP_HEADER_CONSTANTS.popupIconTypos[1].text
    );
    expect(logout).toBeInTheDocument();
    fireEvent.click(logout);
  });
});
