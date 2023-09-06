import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SummaryCard from ".";
import { SummaryCardConstants } from "../../../../utils/constants";

describe("SummaryCard component", () => {
  const sampleData = {
    term: "12 months",
    contracts: "2",
    payback: "$170,454.55",
    rate: "$20,454.55",
    payout: "$150,000.00",
  };

  it("should render the SummaryCard component", () => {
    render(<SummaryCard data={sampleData} />);
    expect(screen.getByText(SummaryCardConstants.heading)).toBeInTheDocument();
    expect(screen.getByText(SummaryCardConstants.Payout)).toBeInTheDocument();
    expect(screen.getByText(SummaryCardConstants.Payout)).toBeInTheDocument();
  });

  it("should display the correct data in the component", () => {
    render(<SummaryCard data={sampleData} />);

    expect(screen.getByText("12 months")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$170,454.55")).toBeInTheDocument();
    expect(screen.getByText("$20,454.55")).toBeInTheDocument();
    expect(screen.getByText("$150,000.00")).toBeInTheDocument();
  });

  it("should call the onClick function when the button is clicked", () => {
    render(<SummaryCard data={sampleData} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });
});
