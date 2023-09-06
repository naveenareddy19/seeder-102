import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../test-setup";
import NewCashKickPage from ".";
import { REVIEW_SUMMARY_CONSTANTS } from "../../../../utils/constants";
import * as constants from "../../../utils/constants";

const cashKick = [
  {
    name: "My first cashkick",
    status: "pending",
    maturity: "2023-08-08T03:25:47.240Z",
    totalReceived: 253445.28,
    totalFinanced: 223031.85,
    userId: 1,
    id: 6,
  },
];
jest.mock("../../../utils/constants", () => {
  return {
    ...jest.requireActual("../../../utils/constants"),
    useAppContext: jest.fn(),
  };
});
jest.mock("../../../services", () => ({
  getCashKicks: jest.fn(() => Promise.resolve(cashKick)),
  postCashKick: jest.fn(() => Promise.resolve({ id: 1 })),
  postContracts: jest.fn(),
  postPayment: jest.fn(),
}));
jest.mock("../../../../utils/helperFunctions.tsx", () => ({
  generateGreeting: jest.fn(),
  formatDate: jest.fn(),
  separateNumberWithCommas: jest.fn(),
}));
describe("NewCashKickPage", () => {
  beforeEach(() => {
    (constants.useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
    render(<NewCashKickPage />);
  });

  test("should render the table and reviewSummary card", () => {
    expect(screen.getByText("Your Contracts")).toBeInTheDocument;
    expect(screen.getByText(REVIEW_SUMMARY_CONSTANTS.title)).toBeInTheDocument;
    expect(screen.getByAltText(REVIEW_SUMMARY_CONSTANTS.iconAlt))
      .toBeInTheDocument;
  });

  test("should render the selected rows", () => {
    const tableRows = screen.getAllByRole("row");
    fireEvent.click(tableRows[1]);
    expect(tableRows[1]).toHaveAriaSelected;
    fireEvent.click(tableRows[2]);
    expect(tableRows[2]).toHaveAriaSelected;
  });

  test("should disable the reset button when slider value is not 0", () => {
    const resetButton = screen.getByText("Reset");
    expect(resetButton).toBeDisabled;
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 100000 } });
    expect(resetButton).toBeEnabled;
    fireEvent.click(resetButton);
  });

  test("should render the modals", () => {
    expect(screen.queryByText("Selected contracts")).not.toBeInTheDocument;
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 10000000 } });
    const tableRows = screen.getAllByRole("row");
    fireEvent.click(tableRows[1]);
    expect(tableRows[1]).toHaveAriaSelected;
    fireEvent.click(tableRows[2]);
    expect(tableRows[2]).toHaveAriaSelected;
    const reviewButton = screen.getByText(
      REVIEW_SUMMARY_CONSTANTS.reviewCredit
    );
    fireEvent.click(reviewButton);
    const submitButton = screen.getByText("Submit Your Credit");
    expect(submitButton).toBeInTheDocument;
    fireEvent.click(submitButton);
    expect(screen.getByText("Name your cash kick")).toBeInTheDocument;
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(submitButton);
    const inputField = screen.getByPlaceholderText("Ex: marketing expenses");
    const testInputValue = "Test Cash Kick Name";
    fireEvent.change(inputField, { target: { value: testInputValue } });
    const createCashkick = screen.getByRole("button", {
      name: "Create Cash Kick",
    });
    fireEvent.click(createCashkick);
    expect(screen.getByText("Cash kick launched successfully!"))
      .toBeInTheDocument;
    fireEvent.click(screen.getByText("View Cash Kicks"));
  });

  test("should render homepage when back button is clicked", () => {
    expect(screen.queryByText("Home")).toBeInTheDocument;
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);
    expect(screen.getByText("Home")).toBeInTheDocument;
  });

  test("should render homepage when close button is clicked in caskkicksuccessmodal", () => {
    expect(screen.queryByText("Home")).toBeInTheDocument;
    const tableRows = screen.getAllByRole("row");
    fireEvent.click(tableRows[1]);
    expect(tableRows[1]).toHaveAriaSelected;
    const reviewButton = screen.getByText(
      REVIEW_SUMMARY_CONSTANTS.reviewCredit
    );
    fireEvent.click(reviewButton);
    const submitButton = screen.getByText("Submit Your Credit");
    expect(submitButton).toBeInTheDocument;
    fireEvent.click(submitButton);
    expect(screen.getByText("Name your cash kick")).toBeInTheDocument;
    const inputField = screen.getByPlaceholderText("Ex: marketing expenses");
    const testInputValue = "Test Cash Kick Name";
    fireEvent.change(inputField, { target: { value: testInputValue } });
    const createCashkick = screen.getByRole("button", {
      name: "Create Cash Kick",
    });
    fireEvent.click(createCashkick);
    expect(screen.getByText("Cash kick launched successfully!"))
      .toBeInTheDocument;
    fireEvent.click(screen.getByAltText("cross-icon"));
    expect(screen.getByText("Home")).toBeInTheDocument;
  });
});
