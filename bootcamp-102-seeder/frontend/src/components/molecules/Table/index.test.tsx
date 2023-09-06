import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./";
import { MY_CONTRACT_ROWS } from "../../../../utils/constants";
import { myContractsColumns } from "../../../../utils/helperFunctions";

describe("Table component", () => {
  test("should render available chip and type column", () => {
    render(
      <Table
        rows={MY_CONTRACT_ROWS}
        columns={myContractsColumns}
        width="auto"
        disableVirtualization
      />
    );
    expect(screen.getAllByText("Available")).toHaveLength(6);
    expect(screen.getAllByText("Monthly")).toHaveLength(6);
  });

  test("should render checkbox", () => {
    render(
      <Table
        rows={MY_CONTRACT_ROWS}
        columns={myContractsColumns}
        width="auto"
        checkboxSelection
        disableVirtualization
      />
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(7);
  });

  test("should header titles", () => {
    render(
      <Table
        rows={MY_CONTRACT_ROWS}
        columns={myContractsColumns}
        width="auto"
        disableVirtualization
      />
    );
    myContractsColumns.forEach((item) => {
      expect(screen.getByText(item.headerName!)).toBeInTheDocument();
    });
  });

  test("should render rows", () => {
    render(
      <Table
        rows={MY_CONTRACT_ROWS}
        columns={myContractsColumns}
        width="auto"
        disableVirtualization
      />
    );
    MY_CONTRACT_ROWS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
