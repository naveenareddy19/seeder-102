import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationBar from ".";
import { CONSTANTS } from "./NavigationBarConstants";
import { render } from "../../../test-setup";

describe("Navigation bar component", () => {
  test("should render title", () => {
    render(<NavigationBar />);
    expect(screen.getByText(CONSTANTS.title)).toBeInTheDocument();
  });

  test("should nav items", () => {
    render(<NavigationBar />);
    CONSTANTS.navItemsData.forEach((item) => {
      expect(screen.getByAltText(item.alt)).toBeInTheDocument();
    });
  });

  test("should change state to active when nav tabs are clicked", () => {
    render(<NavigationBar />);
    const coin = screen.getByAltText(CONSTANTS.navItemsData[0].alt);
    fireEvent.click(coin);
    expect(screen.getByText(/cash accleration/i)).toBeInTheDocument();
  });

  test("should change state  home to active when nav tabs are clicked", () => {
    render(<NavigationBar />);
    const coin = screen.getByAltText(CONSTANTS.navItemsData[1].alt);
    fireEvent.click(coin);
    expect(screen.getByText(/cash accleration/i)).toBeInTheDocument();
  });
});
