import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxAtom from ".";

describe("CheckboxAtom", () => {
  test("handles click events correctly", () => {
    const label = "Custom Label";
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <CheckboxAtom handleClick={handleClick} label={label} />
    );
    const checkbox = getByLabelText(label);
    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
