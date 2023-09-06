import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { CircularProgressBar } from ".";

describe("CircularProgressBar", () => {
  it("renders with the correct value", () => {
    const { getByText } = render(<CircularProgressBar value={50} />);
    const progressText = getByText("50%");
    expect(progressText).toBeInTheDocument();
  });

  it("displays the progress bar", () => {
    const { getByRole } = render(<CircularProgressBar value={75} />);
    const progressBar = screen.getAllByRole("progressbar");
    expect(progressBar).toHaveLength(2);
  });
});
