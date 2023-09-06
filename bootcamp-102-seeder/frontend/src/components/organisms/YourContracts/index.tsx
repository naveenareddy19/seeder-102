import React, { useEffect, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { Card, Stack, styled } from "@mui/material";
import Table from "../../molecules/Table";
import TypographyComponent from "../../atoms/Typography";
import { theme } from "../../../theme/theme";
import { IconTypo } from "../../molecules/IconTypo";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";
import { separateNumberWithCommas } from "../../../../utils/helperFunctions";

const StyleYourContracts = styled(Card)({
  width: "51.2vw",
  height: "auto",
  border: `1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
  borderRadius: "12px",
  backgroundColor: `${theme.palette.structural.elevation1}`,
  padding: "32px 32px 32px 32px",
});

const myContractsColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width:180,
    sortable: false,
    renderCell: (params) => (
      <TypographyComponent
        variant="body2"
        color={theme.palette.textColor.highEmphasis}
      >
        {params.value}
      </TypographyComponent>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    width:180,
    sortable: false,
    renderCell: (params) => (
      <TypographyComponent
        variant="body2"
        color={theme.palette.textColor.lowEmphasis}
      >
        {params.value}
      </TypographyComponent>
    ),
  },
  {
    field: "perPayment",
    headerName: "Per payment",
    width:180,
    sortable: false,
    renderCell: (params) => (
      <TypographyComponent
        variant="body2"
        color={theme.palette.textColor.lowEmphasis}
      >
        {`$${separateNumberWithCommas(params.value.toFixed(2))}`}
      </TypographyComponent>
    ),
  },
  {
    field: "termLengthPercentage",
    headerName: "Term Length",
    width:180,
    sortable: false,
    renderCell: (params) => (
      <Stack>
        <TypographyComponent
          variant="body2"
          color={theme.palette.textColor.lowEmphasis}
        >
          {`${params.row.termLength} months`}
        </TypographyComponent>
        <TypographyComponent
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
          marginTop="4px"
        >
          {`${params.row.termPercentage.toFixed(2)}% fee`}
        </TypographyComponent>
      </Stack>
    ),
  },
  {
    field: "partialAmountpaymentAmount",
    headerName: "Payment amount",
    width:180,
    sortable: false,
    renderCell: (params) => (
      <Stack spacing={1}>
        <TypographyComponent
          variant="body2"
          color={theme.palette.textColor.lowEmphasis}
        >
          {params.row.partialAmount === 0
            ? `$${separateNumberWithCommas(
                params.row.paymentAmount.toFixed(2)
              )}`
            : `$${separateNumberWithCommas(
                params.row.partialAmount.toFixed(2)
              )}`}
        </TypographyComponent>
        <TypographyComponent
          variant="body2"
          color={theme.palette.textColor.lowEmphasis}
          sx={{ textDecoration: "line-through" }}
        >
          {params.row.partialAmount
            ? `$${separateNumberWithCommas(
                params.row.paymentAmount.toFixed(2)
              )}`
            : ""}
        </TypographyComponent>
      </Stack>
    ),
  },
];
const TableWrapper = styled("div")({
  width: "100%",
  height: "100%",
  overflowX: "auto",
});

export interface YourContractsType {
  id: number;
  name: string;
  type: string;
  status: string;
  perPayment: number;
  termLength: number;
  termPercentage: number;
  totalFinanced: string;
  paymentAmount: number;
  partialAmount: number;
}

interface YourContractsProps {
  contractsData: YourContractsType[];
  areContractsSelected: boolean;
  onSelectedContractsChange: (selectedContracts: YourContractsType[]) => void;
  selectedRows?: YourContractsType[];
}

const YourContracts = ({
  contractsData,
  areContractsSelected,
  onSelectedContractsChange,
  selectedRows: initialSelectedRows,
}: YourContractsProps) => {
  const [selectedRowsLocal, setSelectedRowsLocal] = useState<
    YourContractsType[]
  >(initialSelectedRows ?? []);

  useEffect(() => {
    setSelectedRowsLocal(initialSelectedRows ?? []);
  }, [initialSelectedRows]);

  const handleSelectionChange = (newSelection: GridRowId[]) => {
    const selectedContracts = contractsData.filter((contract) =>
      newSelection.includes(contract.id)
    );
    setSelectedRowsLocal(selectedContracts);
    onSelectedContractsChange(selectedContracts);
  };
  return (
    <>
      <StyleYourContracts>
        <IconTypo
          icon={InfoIcon}
          text={!areContractsSelected ? "Your Contracts" : "Selected contracts"}
          iconAlt="info-circle"
          direction={"row"}
          textColor={theme.palette.textColor.highEmphasis}
          textVariant="h2"
          gap={"12px"}
        />
        {!areContractsSelected ? (
          <TableWrapper>
            <Table
              columns={myContractsColumns}
              rows={contractsData}
              checkboxSelection
              width="100%"
              sx={{ marginTop: "20px", height: "auto" }}
              onRowSelectionModelChange={handleSelectionChange}
              rowSelectionModel={selectedRowsLocal.map(
                (contract) => contract.id
              )}
            />
          </TableWrapper>
        ) : (
          <Table
            columns={myContractsColumns}
            rows={selectedRowsLocal}
            disableRowSelectionOnClick
            width="100%"
            sx={{ marginTop: "20px", height: "auto" }}
          />
        )}
      </StyleYourContracts>
    </>
  );
};
export default YourContracts;
