import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "./index";

test("renders Banner component with all props", () => {
  const title = "Welcome to My Website";
  const description = "Explore the amazing features";
  const uptoAmount = "$100";
  const buttonName = "Get Started";
  const buttonOnClick = jest.fn();

  render(
    <Banner
      title={title}
      description={description}
      uptoAmount={uptoAmount}
      buttonName={buttonName}
      buttonOnClick={buttonOnClick}
    />
  );

  const titleElement = screen.getByText(title);
  const descriptionElement = screen.getByText(description);
  const uptoAmountElement = screen.getByText(uptoAmount);
  const buttonElement = screen.getByRole("button", { name: buttonName });

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(uptoAmountElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  expect(buttonOnClick).toHaveBeenCalled();
});
