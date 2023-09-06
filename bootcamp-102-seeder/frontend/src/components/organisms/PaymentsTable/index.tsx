import { GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import Table from "../../molecules/Table";
import TypographyComponent from "../../atoms/Typography";
import { theme } from "../../../theme/theme";
import { Chip } from "../../atoms/Chip";
import { IconTypo } from "../../molecules/IconTypo";
import BlankStateWidget from "../../molecules/PaymentStatus";
import {
  Payment,
  PaymentRow,
  PaymentsMessage,
  PaymentsText,
  chipStyles,
  paymentsData,
} from "../../../../utils/constants";
import EmptyPayment from "../../../../public/assets/images/cheque.svg";
import info from "../../../../public/assets/images/info-circle.svg";
import { useEffect, useState } from "react";
import { getPayments } from "../../../services";
import { useAppContext } from "../../../utils/constants";
import {
  formatDate,
  separateNumberWithCommas,
} from "../../../../utils/helperFunctions";

export const myContractsColumns: GridColDef[] = [
  {
    field: "dueDate",
    headerName: "Due date",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Stack spacing={1}>
        <TypographyComponent
          variant="body2"
          color={theme.palette.textColor.highEmphasis}
        >
          {params.value.date}
        </TypographyComponent>
        <TypographyComponent
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
        >
          {params.value.time}
        </TypographyComponent>
      </Stack>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Chip label={params.value} size="small" style={chipStyles} />
    ),
  },
  {
    field: "expectedAmount",
    headerName: "Expected amount",
    flex: 1,
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
    field: "outstanding",
    headerName: "Outstanding",
    flex: 1,
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
];

export interface PaymentsTableProps {
  isEmpty: boolean;
}

const PaymentsTable = (props: PaymentsTableProps) => {
  const { userId, setUpcomingPayment } = useAppContext();
  const [paymentsRows, setPaymentsRows] = useState<PaymentRow[]>();

  const handlePaymentRows = (payments: Payment[]) => {
    let rows: PaymentRow[] = [];
    let itr = 0;
    payments?.forEach((item) => {
      const today = new Date();
      const currentDate = new Date(item.dueDate);
      currentDate.setMonth(currentDate.getMonth() + 1);
      const originalDay = currentDate.getDate();

      for (let i = 0; i < 12; i++, itr++) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        if (currentDate < today) break;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const newDate = new Date(year, month, originalDay);

        const timeDifference = newDate.getTime() - today.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        const outStandingAmt = (
          item.outstanding -
          item.expectedAmount * (12 - i)
        ).toFixed(2);

        const rowItem = {
          id: itr,
          dueDate: {
            date: formatDate(newDate),
            time: `${daysDifference} day(s) from now`,
          },
          status: "Upcoming",
          expectedAmount: `-$${separateNumberWithCommas(item.expectedAmount)}`,
          outstanding: `$${separateNumberWithCommas(outStandingAmt)}`,
          days: daysDifference,
        };
        rows.push(rowItem);
      }
    });
    rows = rows.sort((a, b) => a.days! - b.days!);
    setPaymentsRows(rows);
    setUpcomingPayment(rows[0]);
  };

  useEffect(() => {
    getPayments(userId)?.then((res) => {
      handlePaymentRows(res);
    });
  }, []);

  return (
    <Stack
      width="77.60vw"
      maxHeight="529px"
      spacing="20px"
      padding="32px 16px 0px 32px"
      borderRadius="12px"
      bgcolor={theme.palette.structural.elevation1}
      borderColor={theme.palette.textColor.lowEmphasis}
    >
      <IconTypo
        icon={info}
        text="Your payments"
        iconAlt="Your"
        direction="row"
        gap="8px"
        textColor={theme.palette.textColor.highEmphasis}
        textVariant="h2"
        iconwidth="20px"
      />

      {props.isEmpty ? (
        <>
          <Table
            columns={myContractsColumns}
            rows={[]}
            disableRowSelectionOnClick
            disableVirtualization
          />
          <BlankStateWidget
            imageSrc={EmptyPayment}
            noContentText={PaymentsMessage}
            buttonText={PaymentsText}
          />
        </>
      ) : (
        <Table
          columns={myContractsColumns}
          rows={paymentsRows ?? paymentsData}
          disableRowSelectionOnClick
          disableVirtualization
        />
      )}
    </Stack>
  );
};

export default PaymentsTable;
