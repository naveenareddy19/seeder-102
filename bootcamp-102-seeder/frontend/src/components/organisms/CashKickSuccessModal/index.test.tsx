import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CashKickSuccessModal from ".";

describe("CashKickSuccessModal", () => {
  const mockOnClickViewCashKicks = jest.fn();

  test(" should render modal correctly when open", () => {
    const onCloseMock = jest.fn();
    render(
      <CashKickSuccessModal
        isOpen={true}
        onClose={onCloseMock}
        onClickViewCashKicks={mockOnClickViewCashKicks}
      />
    );
    expect(
      screen.getByText("Cash kick launched successfully!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("We are reviewing your cash kick")
    ).toBeInTheDocument();
    expect(screen.getByAltText("cross-icon")).toBeInTheDocument();
    expect(screen.getByAltText("review-gif")).toBeInTheDocument();
    expect(
      screen.getByText("Your cash kick is under review")
    ).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("View Cash Kicks")).toBeInTheDocument();
  });

  test("should modal does not render when closed", () => {
    const onCloseMock = jest.fn();
    render(
      <CashKickSuccessModal
        isOpen={false}
        onClose={onCloseMock}
        onClickViewCashKicks={mockOnClickViewCashKicks}
      />
    );
    expect(
      screen.queryByText("Cash kick launched successfully!")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("We are reviewing your cash kick")
    ).not.toBeInTheDocument();
  });

  test("should call onClose function on click on cancel button", () => {
    const onCloseMock = jest.fn();
    render(
      <CashKickSuccessModal
        isOpen={true}
        onClose={onCloseMock}
        onClickViewCashKicks={mockOnClickViewCashKicks}
      />
    );
    const cancelButton = screen.getByText("Close");
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
