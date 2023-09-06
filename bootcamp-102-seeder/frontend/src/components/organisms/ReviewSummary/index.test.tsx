import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReviewSummary from ".";
import { separateNumberWithCommas } from "../../../../utils/helperFunctions";
import { REVIEW_SUMMARY_CONSTANTS } from "../../../../utils/constants";

jest.mock("../../../../utils/helperFunctions.tsx", () => ({
  generateGreeting: jest.fn(),
  formatDate: jest.fn(),
  separateNumberWithCommas: jest.fn(),
}));
describe("Review summary component", () => {
  test("should render title and info icon", () => {
    render(
      <ReviewSummary
        term={12}
        selectedContracts={2}
        selectedAmount={164542.45}
        maxValue={88000}
      />
    );
    expect(
      screen.getByText(REVIEW_SUMMARY_CONSTANTS.title)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(REVIEW_SUMMARY_CONSTANTS.iconAlt)
    ).toBeInTheDocument();
  });

  test("should display selectedAmount", () => {
    (separateNumberWithCommas as jest.Mock).mockReturnValue("164,542.45");
    render(
      <ReviewSummary
        term={12}
        selectedContracts={2}
        selectedAmount={164542.45}
        maxValue={88000}
      />
    );
    expect(screen.getAllByText("$164,542.45")).toHaveLength(5);
  });

  test("should not render slider when disabled", () => {
    render(
      <ReviewSummary
        term={12}
        selectedContracts={2}
        selectedAmount={164542.45}
        maxValue={88000}
        disableSlider
      />
    );
    expect(
      screen.queryByText(REVIEW_SUMMARY_CONSTANTS.slide)
    ).not.toBeInTheDocument();
  });

  test("should disable buttons when no contracts selected", () => {
    render(
      <ReviewSummary
        term={12}
        selectedContracts={0}
        selectedAmount={164542.45}
        maxValue={88000}
      />
    );
    expect(
      screen.getByText(REVIEW_SUMMARY_CONSTANTS.reset)
    ).not.toHaveAttribute("class", "disable-reset");
    expect(
      screen.getByText(REVIEW_SUMMARY_CONSTANTS.reviewCredit)
    ).not.toHaveAttribute("class", "disable-review");
  });

  test("check separate number with commas function", () => {
    (separateNumberWithCommas as jest.Mock).mockReturnValue("164,542.45");
    const commaSeparatedNumber = separateNumberWithCommas(164542.45);
    expect(commaSeparatedNumber).toBe("164,542.45");
  });

  it("renders Submit Your Credit button when areContractsSelected is true", () => {
    const mockOpenNameCashKickModal=jest.fn();
    render(
      <ReviewSummary
        term={12}
        selectedContracts={2}
        selectedAmount={164542.45}
        maxValue={88000}
        areContractsSelected={true}
        openNamecashKickModal={mockOpenNameCashKickModal}
      />
    );
    const submitButton = screen.getByRole("button", {
      name: "Submit Your Credit",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);
    expect(mockOpenNameCashKickModal).toHaveBeenCalledTimes(1);
  });
});
