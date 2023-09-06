import { render, screen } from "@testing-library/react";
import { IconTypo, IconTypoProps } from ".";
import "@testing-library/jest-dom/extend-expect";

const defaultProps: IconTypoProps = {
  icon: "path/to/icon",
  iconAlt: "icon alt text",
  text: "example text",
  direction: "row",
  gap: "8px",
};

const defaultProps2: IconTypoProps = {
  icon: "path/to/icon",
  iconAlt: "icon alt text",
  text: "example text",
  direction: "row-reverse",
  gap: "8px",
};

describe("IconTypo", () => {
  it("renders the correct icon", () => {
    render(<IconTypo {...defaultProps} />);
    const iconElement = screen.getByAltText("icon alt text");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("src", "path/to/icon");
  });

  it("renders the correct text", () => {
    render(<IconTypo {...defaultProps} />);
    const textElement = screen.getByText("example text");
    expect(textElement).toBeInTheDocument();
  });

  it("passes the correct prop to Typography component", () => {
    const textColor = "red";
    render(<IconTypo {...defaultProps2} textColor={textColor} />);
    const typographyElement = screen.getByText("example text");
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveStyle(`color: ${textColor}`);
  });
});
