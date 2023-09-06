import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { PaymentCard, PaymentCardProps } from ".";
import { DUE_IN, AMOUNT_TEXT } from "./PaymentCardConst";
import { useAppContext } from "../../../utils/constants";
import { PaymentRow } from "../../../../utils/constants";

const defaultProps1: PaymentCardProps = {
  card: "due",
  dueAmount: "14,204.55",
  dueDate: "May 03, 2021",
};

const defaultProps2: PaymentCardProps = {
  card: "amount",
  amount: 170454.55,
};
const mockUpcomingPayment: PaymentRow = {
  dueDate: {
    date: "May 03, 2021",
    time: "31 day(s) from now",
  },
  status: "Upcoming",
  expectedAmount: "-$14,204.55",
  outstanding: "$156,250.05",
  days: 30,
};

jest.mock("../../../../utils/helperFunctions.tsx", () => ({
  generateGreeting: jest.fn(),
  formatDate: jest.fn(),
  separateNumberWithCommas: jest.fn(),
}));
jest.mock("../../../utils/constants", () => ({
  ...jest.requireActual("../../../utils/constants"),
  useAppContext: jest.fn(),
}));

describe("PaymentCard renders", () => {
  test("amount card prop and displays amount information", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      upcomingPayment: mockUpcomingPayment,
    });
    render(<PaymentCard {...defaultProps2} />);
    const amounttext = screen.getByText(AMOUNT_TEXT);
    const dueIntext = screen.queryByText("Due");
    const dueIconElement = screen.queryByAltText("Due");
    expect(amounttext).toBeInTheDocument();
    expect(dueIntext).not.toBeInTheDocument();
    expect(dueIconElement).not.toBeInTheDocument();
  });

  test("due card prop and displays due information", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      upcomingPayment: mockUpcomingPayment,
    });
    render(<PaymentCard {...defaultProps1} />);
    const dueIntext = screen.getByText(DUE_IN);
    const dueIconElement = screen.getByAltText("Due");
    expect(dueIntext).toBeInTheDocument();
    expect(dueIconElement).toBeInTheDocument();
  });

  test("renders amount and due information when card prop is due", () => {
    render(<PaymentCard {...defaultProps1} />);
    const amountInfo = screen.getByText("$14,204.55");
    const dueInfo = screen.getByText("Due - May 03, 2021");
    expect(amountInfo).toBeInTheDocument();
    expect(dueInfo).toBeInTheDocument();
  });
});
