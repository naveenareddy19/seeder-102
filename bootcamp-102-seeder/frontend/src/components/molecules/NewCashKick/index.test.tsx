import { render, screen, fireEvent } from "@testing-library/react";
import NewCashKick from ".";

describe("New Cash Kick component", () => {
  it("should contain text and amount", () => {
    const mockOnClick = jest.fn();
    render(<NewCashKick totalAmount="$880,000.00" onClick={mockOnClick} />);
    const totalAmount = screen.getByText("$880,000.00");
    expect(screen.getByText("Launch a new Cash Kick")).toBeInTheDocument;
    expect(totalAmount).toBeInTheDocument;
  });

  it("should call the onClick callback when the button is clicked", () => {
    const mockOnClick = jest.fn();
    render(<NewCashKick totalAmount="$880,000.00" onClick={mockOnClick} />);
    const button = screen.getByText("New Cash Kick");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should render the no credit available button when amount is zero", () => {
    render(<NewCashKick totalAmount="$0.00" onClick={()=>{}} />);
    const button = screen.getByText("Request Credit increase");
    expect(button).toBeDisabled;
  });
});
