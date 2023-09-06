import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResetCard } from ".";
import Tick from "../../../../public/assets/images/circleTick.svg";
import { CONSTANTS } from "./resetCardConstants";

describe("Reset card", () => {
  test("should contain alt", () => {
    render(<ResetCard email={CONSTANTS.subTitle[1]} />);
    expect(screen.getByAltText("tick")).toBeInTheDocument();
  });

  test("should contain src", () => {
    render(<ResetCard email={CONSTANTS.subTitle[1]} />);
    expect(screen.getByAltText("tick")).toHaveAttribute("src", Tick);
  });

  test("should render title", () => {
    render(<ResetCard email={CONSTANTS.subTitle[1]} />);
    expect(screen.getByText(CONSTANTS.title)).toBeInTheDocument();
  });

  test("should render email", () => {
    render(<ResetCard email="abc@gmail.com" />);
    expect(screen.getByText("abc@gmail.com")).toBeInTheDocument();
  });
});
