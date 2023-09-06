import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MY_CONTRACT_ROWS } from "../../../../utils/constants";
import YourContractsTable from "./index";

const mockIsContractsSelected = false;
const MY_CONTRACTS = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    status: "Available",
    perPayment: 12000.25,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 126722.64,
    partialAmount: 0,
  },
  {
    id: 2,
    name: "Contract 6",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 126722.64,
    partialAmount: 12323.44,
  },
];

describe("YourContrcatsTable", () => {
  const mockOnSelectionContractsChange = jest.fn();
  test("should have contracts data ", () => {
    render(
      <YourContractsTable
        contractsData={MY_CONTRACT_ROWS}
        areContractsSelected={mockIsContractsSelected}
        onSelectedContractsChange={mockOnSelectionContractsChange}
      />
    );

    const contractsTable = screen.getByText("Your Contracts");
    expect(contractsTable).toBeInTheDocument();
    const contract1Name = screen.getByText("Contract 1");
    expect(contract1Name).toBeInTheDocument();
  });

  test("should have all the row items in the dataGrid", () => {
    render(
      <YourContractsTable
        contractsData={MY_CONTRACT_ROWS}
        areContractsSelected={false}
        onSelectedContractsChange={mockOnSelectionContractsChange}
      />
    );
    MY_CONTRACT_ROWS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("should selects and deselects a contract on click", () => {
    render(
      <YourContractsTable
        contractsData={MY_CONTRACT_ROWS}
        areContractsSelected={mockIsContractsSelected}
        onSelectedContractsChange={mockOnSelectionContractsChange}
      />
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    expect(gridItems[1]).toHaveAriaSelected;
    fireEvent.click(gridItems[1]);
    expect(gridItems[1]).not.toHaveAriaSelected;
  });

  test("should have the selected contracts table when areContractsSelected is set to true", () => {
    render(
      <YourContractsTable
        contractsData={MY_CONTRACT_ROWS}
        areContractsSelected={true}
        onSelectedContractsChange={mockOnSelectionContractsChange}
      />
    );
    expect(screen.getByText("Selected contracts")).toBeInTheDocument;
  });

  test("should render the partial amount", () => {
    render(
      <YourContractsTable
        contractsData={MY_CONTRACTS}
        areContractsSelected={false}
        onSelectedContractsChange={mockOnSelectionContractsChange}
      />
    );
  });
});
