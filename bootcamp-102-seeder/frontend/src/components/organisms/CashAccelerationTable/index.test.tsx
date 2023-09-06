import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import CashAccelerationTable from ".";
import Typography from "../../atoms/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { theme } from "../../../theme/theme";
import {
  CASH_ACCN_TABLE_CONSTANTS,
  MY_CASH_KICKS,
  MY_CONTRACT_ROWS,
  chipStyles,
} from "../../../../utils/constants";
import {
  myContractsColumns,
  separateNumberWithCommas,
} from "../../../../utils/helperFunctions";
import { Box } from "@mui/material";
import { Chip } from "../../atoms/Chip";

const TypoBody2 = (text: string, color?: string) => (
  <Typography variant="body2" color={color}>
    {text}
  </Typography>
);

const TypoCaption = (text: string, color?: string) => (
  <Typography variant="caption" color={color}>
    {text}
  </Typography>
);

const myCashKicks: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.highEmphasis),
  },
  {
    field: "status",
    headerName: "Status",
    width: 199.2,
    sortable: false,
    renderCell: (params) => (
      <Chip label={params.value} size="small" style={chipStyles} />
    ),
  },
  {
    field: "maturity",
    headerName: "Maturity",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.lowEmphasis),
  },
  {
    field: "totalRecieved",
    headerName: "Total recieved",
    width: 199.2,
    sortable: false,
    renderCell: (params) => (
      <Box display={"flex"} flexDirection={"column"}>
        {TypoBody2(
          `$${separateNumberWithCommas(params.value.amount.toFixed(2))}`,
          theme.palette.textColor.lowEmphasis
        )}
        {TypoCaption(
          `${params.value.rate.toFixed(2)}% fee`,
          theme.palette.textColor.lowEmphasis
        )}
      </Box>
    ),
  },
  {
    field: "totalFinanced",
    headerName: "Total financed",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
];
describe("Cash acceleration", () => {
  test("should render title", () => {
    render(
      <CashAccelerationTable
        myContractsColumns={myContractsColumns}
        myContractsRows={MY_CONTRACT_ROWS}
        myCashKicksColumns={myCashKicks}
        myCashKicksRows={MY_CASH_KICKS}
      />
    );
    {
      CASH_ACCN_TABLE_CONSTANTS.iconTypos.forEach((item) => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      });
    }
  });

  test("should render my contracts tab when clicked", () => {
    render(
      <CashAccelerationTable
        myContractsColumns={myContractsColumns}
        myContractsRows={MY_CONTRACT_ROWS}
        myCashKicksColumns={myCashKicks}
        myCashKicksRows={MY_CASH_KICKS}
      />
    );
    const myContractsTab = screen.getByText(CASH_ACCN_TABLE_CONSTANTS.tabs[0]);
    fireEvent.click(myContractsTab);
    expect(myContractsTab.parentElement?.getAttribute("class")).toContain(
      "active-tab"
    );
    expect(screen.getAllByText(/monthly/i)).toHaveLength(6);
  });

  test("should render my cashkicks tab when clicked", () => {
    render(
      <CashAccelerationTable
        myContractsColumns={myContractsColumns}
        myContractsRows={MY_CONTRACT_ROWS}
        myCashKicksColumns={myCashKicks}
        myCashKicksRows={MY_CASH_KICKS}
      />
    );
    const myContractsTab = screen.getByText(CASH_ACCN_TABLE_CONSTANTS.tabs[1]);
    fireEvent.click(myContractsTab);
    expect(myContractsTab.parentElement?.getAttribute("class")).toContain(
      "active-tab"
    );
    expect(screen.getAllByText(/pending/i)).toHaveLength(2);
  });

  test("should render empty status when empty contracts are passed", () => {
    render(
      <CashAccelerationTable
        myContractsColumns={myContractsColumns}
        myContractsRows={[]}
        myCashKicksColumns={myCashKicks}
        myCashKicksRows={[]}
      />
    );
    const myContractsTab = screen.getByText(CASH_ACCN_TABLE_CONSTANTS.tabs[0]);
    fireEvent.click(myContractsTab);
    expect(
      screen.getByText(CASH_ACCN_TABLE_CONSTANTS.emptyStatus[0].noContentText)
    ).toBeInTheDocument();
  });

  test("should render empty status when empty cashkicks are passed", () => {
    render(
      <CashAccelerationTable
        myContractsColumns={myContractsColumns}
        myContractsRows={[]}
        myCashKicksColumns={myCashKicks}
        myCashKicksRows={[]}
      />
    );
    const myCashKicksTab = screen.getByText(CASH_ACCN_TABLE_CONSTANTS.tabs[1]);
    fireEvent.click(myCashKicksTab);
    expect(
      screen.getByText(CASH_ACCN_TABLE_CONSTANTS.emptyStatus[1].noContentText)
    ).toBeInTheDocument();
  });
});
