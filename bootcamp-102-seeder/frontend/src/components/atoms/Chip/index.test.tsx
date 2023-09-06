import { Chip } from "./index";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";

describe("CustomChip", () => {
  test("renders with expected label and size", () => {
    const { getByText } = render(<Chip label={"Pending"} size="medium" />);
    const chipElement = getByText("Pending");
    expect(chipElement).toBeInTheDocument();
  });
  test("onClick renders correctly", () => {
    const onClick = jest.fn();
    render(<Chip label={"Pending"} size="medium" onClick={onClick} />);
    const chip = screen.getByText("Pending");
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
