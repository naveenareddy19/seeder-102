import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../../../theme/theme";
import { IconTypo } from "../../molecules/IconTypo";
import InfoCircle from "../../../../public/assets/images/info-circle.svg";
import Sync from "../../../../public/assets/images/sync.svg";
import Typography from "../../atoms/Typography";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../molecules/Table";
import BlankStateWidget from "../../molecules/PaymentStatus";
import { CASH_ACCN_TABLE_CONSTANTS } from "../../../../utils/constants";

const StyledWrapper = styled(Box)(`
  padding:32px;
  background: ${theme.palette.structural.elevation1};
  border-radius:12px;
  border:1px solid ${theme.palette.borderColor.borderLowEmphasis};
  width:77.75vw;
  .active-tab{
    border:1px solid ${theme.palette.primary.primary400};
    color:${theme.palette.primary.primary400};
    background:${theme.palette.primary.primary600};
  }
`);
const StyledBox=styled(Box)({
  height:"35vh",
  overflow:"auto",
 "& ::-webkit-scrollbar": {
    display: "none"
  }
})
const RowStyled = styled(Box)(`
  display:flex;
  justify-content:space-between;
  align-items:center;
`);

const Tab = styled(Box)(`
  border-radius:12px;
  border:1px solid ${theme.palette.borderColor.borderHighEmphasis};
  color:${theme.palette.textColor.mediumEmphasis};
  background:${theme.palette.structural.grey100};
  padding:12px 24px;
  cursor:pointer;
  display:inline-block;
`);

export interface CashAccelerationTableProps {
  myContractsColumns: GridColDef[];
  myContractsRows: Object[];
  myCashKicksColumns: GridColDef[];
  myCashKicksRows: Object[];
}

const customNoRowsOverlay = () => {
  return <div>No Rows</div>;
};

const CashAccelerationTable = (props: CashAccelerationTableProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    CASH_ACCN_TABLE_CONSTANTS.tabs[0]
  );

  return (
    <StyledWrapper>
      <RowStyled marginBottom={"20px"}>
        <IconTypo
          icon={InfoCircle}
          text={CASH_ACCN_TABLE_CONSTANTS.iconTypos[0].text}
          textVariant="h2"
          textColor={theme.palette.textColor.highEmphasis}
          iconAlt={CASH_ACCN_TABLE_CONSTANTS.iconTypos[0].iconAlt}
          gap={"8px"}
          direction={"row"}
        />
        <IconTypo
          icon={Sync}
          text={CASH_ACCN_TABLE_CONSTANTS.iconTypos[1].text}
          textVariant="button"
          textColor={theme.palette.primary.primary400}
          iconAlt={CASH_ACCN_TABLE_CONSTANTS.iconTypos[1].iconAlt}
          gap={"8px"}
          direction={"row-reverse"}
        />
      </RowStyled>
      {CASH_ACCN_TABLE_CONSTANTS.tabs.map((item, idx) => (
        <Tab
          key={item}
          marginLeft={idx === 1 ? "12px" : ""}
          marginBottom={idx === 1 ? "20px" : ""}
          className={activeTab === item ? "active-tab" : ""}
          onClick={() => setActiveTab(item)}
        >
          <Typography variant="button">{item}</Typography>
        </Tab>
      ))}
      <StyledBox>
      <Table
        columns={
          activeTab === CASH_ACCN_TABLE_CONSTANTS.tabs[0]
            ? props.myContractsColumns
            : props.myCashKicksColumns
        }
        rows={
          activeTab === CASH_ACCN_TABLE_CONSTANTS.tabs[0]
            ? props.myContractsRows
            : props.myCashKicksRows
        }
        slots={{ noRowsOverlay: customNoRowsOverlay }}
        disableVirtualization
        disableRowSelectionOnClick
      />
      {props.myContractsRows.length === 0 &&
        activeTab === CASH_ACCN_TABLE_CONSTANTS.tabs[0] && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"402px"}
          >
            <BlankStateWidget {...CASH_ACCN_TABLE_CONSTANTS.emptyStatus[0]} />
          </Box>
        )}
      {props.myCashKicksRows.length === 0 &&
        activeTab === CASH_ACCN_TABLE_CONSTANTS.tabs[1] && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"402px"}
          >
            <BlankStateWidget {...CASH_ACCN_TABLE_CONSTANTS.emptyStatus[1]} />
          </Box>
        )}
        </StyledBox>
    </StyledWrapper>
  );
};

export default CashAccelerationTable;
