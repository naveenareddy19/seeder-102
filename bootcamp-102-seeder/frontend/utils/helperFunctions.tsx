import { GridColDef } from "@mui/x-data-grid";
import Typography from "../src/components/atoms/Typography";
import { Chip } from "../src/components/atoms/Chip";
import { chipStyles } from "./constants";
import { theme } from "../src/theme/theme";
import { Box, Stack } from "@mui/material";

export const generateGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const formatDate = (dateArg?: Date) => {
  const date = dateArg || new Date();

  const dateArray = date
    .toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .split(" ");
  return `${dateArray[1]} ${dateArray[0]}, ${dateArray[2]}`;
};

export const separateNumberWithCommas = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TypoBody2 = (text: string, color?: string) => (
  <Typography variant="body2" color={color}>
    {text}
  </Typography>
);
const TypoCaption = (text: string, color?: string) => (
  <Typography variant="caption" color={color} marginTop={"4px"}>
    {text}
  </Typography>
);

export const myContractsColumns: GridColDef[] = [
  {
    headerName: "Name",
    field: "name",
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.highEmphasis),
  },
  {
    headerName: "Status",
    field: "status",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Chip label={params.value} size="small" style={chipStyles} />
    ),
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.lowEmphasis),
  },
  {
    headerName: "Per payment",
    field: "perPayment",
    sortable: false,
    flex: 1,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
  {
    sortable: false,
    flex: 1,
    field: "totalFinanced",
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.lowEmphasis),
    headerName: "Total financed",
  },
  {
    headerName: "Payment amount",
    sortable: false,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
    flex: 1,
    field: "paymentAmount",
  },
];

export const myCashKicksCols: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.highEmphasis),
  },
  {
    headerName: "Status",
    field: "status",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <Chip label={params.value} size="small" style={chipStyles} />
    ),
  },
  {
    flex: 1,
    field: "maturity",
    headerName: "Maturity",
    sortable: false,
    renderCell: (params) => {
      return TypoBody2(
        formatDate(new Date(params.value)),
        theme.palette.textColor.lowEmphasis
      );
    },
  },
  {
    headerName: "Total recieved",
    flex: 1,
    sortable: false,
    field: "totalReceived",
    renderCell: (params) => (
      <Box display={"flex"} flexDirection={"column"}>
        {TypoBody2(
          `$${separateNumberWithCommas(params.value.toFixed(2))}`,
          theme.palette.textColor.lowEmphasis
        )}
        {TypoCaption(
          `${(12).toFixed(2)}% fee`,
          theme.palette.textColor.lowEmphasis
        )}
      </Box>
    ),
  },
  {
    sortable: false,
    headerName: "Total financed",
    field: "totalFinanced",
    flex: 1,
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
];

export const selectedContractsCols: GridColDef[] = [
  {
    headerName: "Name",
    flex: 1,
    field: "name",
    sortable: false,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.highEmphasis),
  },
  {
    field: "type",
    sortable: false,
    headerName: "Type",
    flex: 1,
    renderCell: (params) =>
      TypoBody2(params.value, theme.palette.textColor.lowEmphasis),
  },
  {
    field: "perPayment",
    flex: 1,
    sortable: false,
    headerName: "Per payment",
    renderCell: (params) =>
      TypoBody2(
        `$${separateNumberWithCommas(params.value.toFixed(2))}`,
        theme.palette.textColor.lowEmphasis
      ),
  },
  {
    field: "termLength",
    headerName: "Term length",
    sortable: false,
    renderCell: (params) => (
      <Box display={"flex"} flexDirection={"column"}>
        {TypoBody2(
          `${params.row.termLength} months`,
          theme.palette.textColor.lowEmphasis
        )}
        {TypoCaption(
          `${params.row.termPercentage.toFixed(2)}% fee`,
          theme.palette.textColor.lowEmphasis
        )}
      </Box>
    ),
    flex: 1,
  },
  {
    sortable: false,
    field: "paymentAmount",
    headerName: "Total available",
    flex: 1,
    renderCell: (params) => (
      <Stack direction={"column"}>
        {params.row.partialAmount > 0 &&
          TypoBody2(
            `$${separateNumberWithCommas(params.row.partialAmount.toFixed(2))}`,
            theme.palette.textColor.lowEmphasis
          )}
        <Typography
          variant={params.row.partialAmount === 0 ? "body2" : "caption"}
          color={theme.palette.textColor.lowEmphasis}
          sx={{
            textDecoration:
              params.row.partialAmount === 0 ? "" : "line-through",
          }}
        >
          {`$${separateNumberWithCommas(params.value.toFixed(2))}`}
        </Typography>
      </Stack>
    ),
  },
];
