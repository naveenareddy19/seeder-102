import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Image from ".";


describe("Image component", () => {
  test("renders with a source prop", () => {
    const { getByRole } = render(<Image src="assets/images/cheque.svg" />);
    expect(getByRole("img")).toHaveAttribute("src", "assets/images/cheque.svg");
  });

  test("renders with a width and height prop", () => {
    const { getByRole } = render(
      <Image src="assets/images/cheque.svg" width="100" height="100" />
    );
    expect(getByRole("img")).toHaveAttribute("width", "100");
    expect(getByRole("img")).toHaveAttribute("height", "100");
  });

  test("renders with a alt prop", () => {
    const { getByAltText } = render(
      <Image src="assets/images/cheque.svg" alt="cheque" />
    );
    expect(getByAltText("cheque")).toBeInTheDocument();
  });
});
