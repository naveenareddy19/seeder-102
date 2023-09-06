import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PaymentsTable, { myContractsColumns } from ".";
import { paymentsData } from "../../../../utils/constants";
import { useAppContext } from "../../../utils/constants";
import { getPayments } from "../../../services";

jest.mock("../../../utils/constants", () => ({
  ...jest.requireActual("../../../utils/constants"),
  useAppContext: jest.fn(),
}));

jest.mock("../../../services", () => ({
  getPayments: jest.fn(),
}));

describe("PaymentsTable", () => {
  const mockPayments = [
    {
      userId: 2,
      dueDate: "2026-08-23",
      status: "UpComing",
      expectedAmount: 56245.28,
      outstanding: 4687.11,
      id: 1,
    },
    {
      userId: 3,
      dueDate: "2023-02-23",
      status: "UpComing",
      expectedAmount: 42537.6,
      outstanding: 3544.8,
      id: 2,
    },
  ];
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      userId: "user123",
      setUpcomingPayment: jest.fn(),
    });

    (getPayments as jest.Mock).mockResolvedValue(mockPayments);
  });
  it("renders table with no rows and BlankStateWidget when isEmpty is true", () => {
    const { getByText } = render(<PaymentsTable isEmpty={true} />);
    expect(getByText("Your payments")).toBeInTheDocument();
    expect(getByText("You don’t have any Cash Kick")).toBeInTheDocument();
    expect(getByText("Launch A new cash kick")).toBeInTheDocument();
  });

  it("renders table with rows when isEmpty is false", () => {
    render(<PaymentsTable isEmpty={false} />);
    myContractsColumns.forEach((item) => {
      expect(
        screen.getByRole("columnheader", { name: item.headerName })
      ).toBeInTheDocument();
    });
    paymentsData.forEach((item) => {
      expect(screen.getByText(item.outstanding)).toBeInTheDocument();
    });
  });
});
