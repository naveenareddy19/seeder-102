import { StoryFn, Meta } from "@storybook/react";
import CashAccelerationTable, { CashAccelerationTableProps } from ".";
import Typography from "../../atoms/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { theme } from "../../../theme/theme";
import {
  MY_CASH_KICKS,
  MY_CONTRACTS_2,
  MY_CONTRACT_ROWS,
  chipStyles,
} from "../../../../utils/constants";
import {
  myContractsColumns,
  separateNumberWithCommas,
} from "../../../../utils/helperFunctions";
import { Box } from "@mui/material";
import { Chip } from "../../atoms/Chip";

const meta: Meta = {
  title: "organisms/CashAccelerationTable",
  component: CashAccelerationTable,
};
export default meta;

const TypoBody2 = (text: string, color?: string) => (
  <Typography variant="body2" color={color}>
    {text}
  </Typography>
);

const TypoCaption = (text: string, color?: string) => (
  <Typography variant="caption" color={color} marginTop="4px">
    {text}
  </Typography>
);

const myContracts2: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.highEmphasis),
  },
  {
    field: "type",
    headerName: "Type",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.lowEmphasis),
  },
  {
    field: "perPayment",
    headerName: "Per payment",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
  {
    field: "termLength",
    headerName: "Term length",
    width: 199.2,
    sortable: false,
    renderCell: (params) => (
      <Box display={"flex"} flexDirection={"column"}>
        {TypoBody2(
          `${params.value.time} months`,
          theme.palette.textColor.lowEmphasis
        )}
        {TypoCaption(
          `${params.value.percent.toFixed(2)}% fee`,
          theme.palette.textColor.lowEmphasis
        )}
      </Box>
    ),
  },
  {
    field: "paymentAmount",
    headerName: "Total available",
    width: 199.2,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
];

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
    field: "totalReceived",
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

const Template: StoryFn<CashAccelerationTableProps> = (args) => (
  <CashAccelerationTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  myCashKicksColumns: myCashKicks,
  myCashKicksRows: [],
  myContractsColumns: myContractsColumns,
  myContractsRows: MY_CONTRACT_ROWS,
};
export const SelectedContracts = Template.bind({});
SelectedContracts.args = {
  myCashKicksColumns: myCashKicks,
  myCashKicksRows: MY_CASH_KICKS,
  myContractsColumns: myContracts2,
  myContractsRows: MY_CONTRACTS_2,
};
