import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { ApplicationHeader } from "../../organisms/ApplicationHeader";
import {
  APP_HEADER_CONSTANTS,
  MY_CONTRACT_ROWS,
  CashKick,
  Contract,
  SelectedContracts,
} from "../../../../utils/constants";
import CashAccelerationCard from "../../molecules/CashAccelerationCard";
import NewCashKick from "../../molecules/NewCashKick";
import {
  myCashKicksCols,
  myContractsColumns,
  selectedContractsCols,
  separateNumberWithCommas,
} from "../../../../utils/helperFunctions";
import CashAccelerationTable from "../../organisms/CashAccelerationTable";
import { useEffect, useState } from "react";
import { getCashKicks, getContracts } from "../../../services";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import { useAppContext } from "../../../utils/constants";

const Stats = styled(Box)(`
  display:flex;
  width:100%;
  margin-bottom:20px;
`);

const CashAccelerationPage = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();

  const [cashKicksRows, setCashKicksRows] = useState<CashKick[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<Contract[]>([]);
  const [availableCredit, setAvailableCredit] = useState<number>(0);

  useEffect(() => {
    getCashKicks(userId)
      ?.then((response) => {
        setCashKicksRows(response);
        let sum = 0;
        response.forEach((item: CashKick) => {
          sum += item.totalFinanced;
        });
        if (880000 - sum <= 0) {
          setAvailableCredit(0);
        } else {
          setAvailableCredit(880000 - sum);
        }
      })
      .catch(() => {});
    getContracts(userId)
      ?.then((response) => {
        const contracts = response.map(
          (item: SelectedContracts, idx: number) => ({
            ...MY_CONTRACT_ROWS.find((row) => row.id === item.contractId),
            partialAmount: item.selectedAmount,
          })
        );
        setSelectedContracts([...contracts]);
      })
      .catch(() => {});
  }, []);
  return (
    <HomeTemplate
      header={
        <ApplicationHeader
          title={APP_HEADER_CONSTANTS.data[0].title}
          subtitle={APP_HEADER_CONSTANTS.data[0].subtitle}
        />
      }
      switchNavTabTo={1}
    >
      <Box width={"100%"}>
        <Stats>
          <CashAccelerationCard
            termCap={12}
            availableCredit={availableCredit}
            maxInterestRate={12}
          />
          <Box marginLeft={"20px"}>
            <NewCashKick
              totalAmount={`$${separateNumberWithCommas(
                availableCredit.toFixed(2)
              )}`}
              onClick={() => {
                navigate(ROUTES.NEW_CASH_KICK);
              }}
            />
          </Box>
        </Stats>
        <CashAccelerationTable
          myCashKicksColumns={myCashKicksCols}
          myCashKicksRows={cashKicksRows}
          myContractsColumns={
            selectedContracts.length === 0
              ? myContractsColumns
              : selectedContractsCols
          }
          myContractsRows={
            selectedContracts.length === 0
              ? MY_CONTRACT_ROWS
              : selectedContracts
          }
        />
      </Box>
    </HomeTemplate>
  );
};

export default CashAccelerationPage;
