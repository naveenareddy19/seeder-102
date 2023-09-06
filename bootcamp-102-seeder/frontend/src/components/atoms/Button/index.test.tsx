import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./index";

describe("Button atom renders", () => {
  test("should contain buttontext", () => {
    render(<Button variant="contained">New Cash Kick</Button>);
    const buttontext = screen.getByText("New Cash Kick");
    expect(buttontext).toBeInTheDocument();
  });

  test("should fire onclickMock event when back button clicked", () => {
    const onClickMock = jest.fn();
    render(
      <Button color="primary" variant="contained" onClick={onClickMock}>
        back
      </Button>
    );
    const image = screen.getByRole("button");
    fireEvent.click(image);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
