import React from "react";
import { render, screen } from "@testing-library/react";
import TypographyComponent from "./index";
import "@testing-library/jest-dom";

describe("Typography renders", () => {
  test("Text Content", () => {
    render(<TypographyComponent>Hey</TypographyComponent>);
    const text = screen.getByText(/Hey/i);
    expect(text).toBeInTheDocument();
  });
  test("heading tags", () => {
    render(<TypographyComponent variant="h1">Hello</TypographyComponent>);
    const text = screen.getByRole("heading", { level: 1 });
    expect(text).toBeInTheDocument();
  });
});
