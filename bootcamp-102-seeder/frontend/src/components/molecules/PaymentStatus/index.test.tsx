import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlankStateWidget from ".";
import EmptyPaymentStatus from "../../../../public/assets/images/cheque.svg";
import ErrorStatus from "../../../../public/assets/images/errorStatus.svg";

describe("BlankStateWidget", () => {
  const mockProps = {
    imageSrc: EmptyPaymentStatus,
    noContentText: "You don’t have any Cash Kick",
    noContentInfo: "No Payments yet",
    buttonText: "Launch A new cash kick",
  };
  const mockProps2 = {
    imageSrc: ErrorStatus,
    noContentText: "Failed to load contracts!",
    noContentInfo: "lease contact customer support if this problem persists",
    buttonText: "Retry",
    noContentTextColor: "#E8E7F0",
  };

  test("should render with correct props", () => {
    render(<BlankStateWidget {...mockProps} />);

    const image = screen.getByAltText("payment-status-image");
    const paymentStatus = screen.getByText("You don’t have any Cash Kick");
    const subtext = screen.getByText("No Payments yet");
    const button = screen.getByRole("button", {
      name: "Launch A new cash kick",
    });

    expect(image).toBeInTheDocument();
    expect(paymentStatus).toBeInTheDocument();
    expect(subtext).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should render with color prop", () => {
    render(<BlankStateWidget {...mockProps2} />);

    const patymentStatus = screen.getByText("Failed to load contracts!");
    expect(patymentStatus).toHaveStyle("color: #E8E7F0");
  });

  test("should render the button with the correct text and styles", () => {
    render(<BlankStateWidget {...mockProps2} />);

    const button = screen.getByRole("button", {
      name: "Retry",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Retry");
    expect(button).toHaveStyle("text-transform: none");
    expect(button).not.toHaveAttribute("disabled");
  });
});
