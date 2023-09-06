import React from "react";
import { render, screen } from "@testing-library/react";
import DividerComponent from ".";

test("check divider component renders correctly", () => {
  render(<DividerComponent text="Or"/>);
  expect(screen.getByText("Or")).toBeInTheDocument;
});
