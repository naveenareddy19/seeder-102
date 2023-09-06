import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from ".";

describe("InputField", () => {
  test("renders input field with label and handles value change", () => {
    const handleChange = jest.fn((event) => {
      return {
        target: {
          value: event.target.value,
        },
      };
    });
    render(<InputField label="Test Input" onChange={handleChange} />);
    const inputElement = screen.getByLabelText("Test Input");
    const value = "test";
    fireEvent.change(inputElement, { target: { value: value } });
    expect(handleChange).toHaveBeenCalled();
  });
});
