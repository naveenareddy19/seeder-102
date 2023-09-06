import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CashAccelerationPage from ".";
import { getCashKicks, getContracts } from "../../../services";
import { render } from "../../../test-setup";

jest.mock("../../../services", () => ({
  getContracts: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(mockContracts)),
  getCashKicks: jest.fn(),
}));

const mockCashKicks = [
  {
    name: "My first cashkick",
    status: "pending",
    maturity: "2023-08-08T03:25:47.240Z",
    totalReceived: 253445.28,
    totalFinanced: 223031.85,
    userId: 1,
    id: 6,
  },
  {
    name: "Second cashkick",
    status: "pending",
    maturity: "2023-08-08T05:36:57.933Z",
    totalReceived: 84480,
    totalFinanced: 74342.4,
    userId: 1,
    id: 7,
  },
];
const cashKicks=[
  {
    name: "Second cashkick",
    status: "pending",
    maturity: "2023-08-08T05:36:57.933Z",
    totalReceived: 84480,
    totalFinanced: 880000,
    userId: 1,
    id: 7,
  },
]
const cashKicks2=[
  {
    name: "Second cashkick",
    status: "pending",
    maturity: "2023-08-08T05:36:57.933Z",
    totalReceived: 84480,
    totalFinanced: 8800,
    userId: 1,
    id: 7,
  },
]

const mockContracts = [
  {
    userId: 1,
    contractId: 1,
    cashKickId: 6,
    selectedAmount: 0,
    id: 5,
  },
  {
    userId: 1,
    contractId: 2,
    cashKickId: 6,
    selectedAmount: 0,
    id: 6,
  },
];

describe("Cash acceleration page", () => {
  test("should render title", () => {
    render(<CashAccelerationPage />);
    expect(screen.getAllByText("Cash accleration")).toHaveLength(2);
  });

  test("displays myContractsColumns when no contracts are selected", () => {
    const { getByText } = render(<CashAccelerationPage />);
    const columnName = getByText("Name");
    const columnPerPayment = getByText("Per payment");
    expect(columnName).toBeInTheDocument();
    expect(columnPerPayment).toBeInTheDocument();
  });

  test("should make api calls", () => {
    (getContracts as jest.Mock).mockResolvedValueOnce([mockContracts]);
    (getCashKicks as jest.Mock).mockResolvedValueOnce([mockCashKicks]);
    waitFor(() => render(<CashAccelerationPage />));
  });

  test("should navigate to cash kick page", () => {
    (getCashKicks as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(cashKicks)
    );
    render(<CashAccelerationPage />);
  });
});
