import React, { useState, useEffect } from "react";
import ReviewSummary from "../../organisms/ReviewSummary";
import YourContracts, {
  YourContractsType,
} from "../../organisms/YourContracts";
import { CashKick, MY_CONTRACT_ROWS } from "../../../../utils/constants";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { ApplicationHeader } from "../../organisms/ApplicationHeader";
import { Stack } from "@mui/material";
import Button from "../../atoms/Button";
import { theme } from "../../../theme/theme";
import ArrowLeft from "../../../../public/assets/images/arrow-left.svg";
import TypographyComponent from "../../atoms/Typography";
import NameCashKickModal from "../../organisms/NameCashKickModal";
import CashKickSuccessModal from "../../organisms/CashKickSuccessModal";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import Image from "../../atoms/Image";
import {
  getCashKicks,
  postCashKick,
  postContracts,
  postPayment,
} from "../../../services";
import { useAppContext } from "../../../utils/constants";

const styleBackButton = {
  width: "87px",
  height: "31px",
  borderRadius: "12px",
  background: theme.palette.structural.elevation1,
  border: `1px solid ${theme.palette.borderColor.borderLowEmphasis}`,
  marginBottom: "5vh",
};

const NewCashKickPage = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedContracts, setSelectedContracts] = useState<
    YourContractsType[]
  >([]);
  const [areContractsSelected, setAreContractsSelected] = useState(false);
  const [nameCashKickModal, setNameCashKickModal] = useState(false);
  const [cashKickSuccessModal, setCashKickSuccessModal] = useState(false);
  const [cashKickName, setCashKickName] = useState("");
  const [activeTab, setActiveTab] = useState<number>(1);
  const [availableCredit, setAvailableCredit] = useState(0);

  useEffect(() => {
    getCashKicks(userId)?.then((res) => {
      let sum = 0;
      res.forEach((item: CashKick) => {
        sum += item.totalFinanced;
      });
      if (880000 - sum <= 0) setAvailableCredit(0);
      else setAvailableCredit(880000 - sum);
    });
  }, []);

  useEffect(() => {
    const totalPaymentAmount = selectedContracts.reduce(
      (total, contract) =>
        total +
        (contract.partialAmount !== 0
          ? contract.partialAmount
          : contract.paymentAmount),
      0
    );
    setSelectedAmount(totalPaymentAmount);
  }, [selectedContracts]);

  const getSelectedContracts = (
    newValue: number,
    contracts: YourContractsType[]
  ): YourContractsType[] => {
    const sortedContracts = contracts
      .slice()
      .sort((a, b) => a.paymentAmount - b.paymentAmount);
    let totalPayment = 0;
    const selectedContracts: YourContractsType[] = [];

    for (const contract of sortedContracts) {
      if (totalPayment + contract.paymentAmount <= newValue) {
        selectedContracts.push(contract);
        totalPayment += contract.paymentAmount;
      } else {
        const remainingAmount = newValue - totalPayment;
        const updatedContract = {
          ...contract,
          partialAmount: remainingAmount,
        };
        selectedContracts.push(updatedContract);
        break;
      }
    }
    return selectedContracts;
  };

  const handleCashKickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCashKickName(e.target.value);
  };

  const handleSliderChange = (event: Event, newValue: number) => {
    setSelectedAmount(newValue);
    const selectedContracts = getSelectedContracts(newValue, MY_CONTRACT_ROWS);
    setSelectedContracts(selectedContracts);
  };

  const handleContractsSelectionChange = (
    selectedRows: YourContractsType[]
  ) => {
    const totalSelectedAmount = selectedRows.reduce(
      (total, contract) => total + contract.paymentAmount,
      0
    );
    if (totalSelectedAmount <= availableCredit)
      setSelectedContracts(selectedRows);
  };
  const handleResetButton = () => {
    setSelectedContracts([]);
    setSelectedAmount(0);
  };
  const handleReviewCreditButton = () => {
    setAreContractsSelected(true);
  };
  const handleNameCashKickModal = () => {
    setNameCashKickModal(false);
    postCashKickData();
    setCashKickSuccessModal(true);
  };

  const postCashKickData = () => {
    const currentDate = new Date();
    const data = {
      name: cashKickName,
      status: "pending",
      maturity: new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      totalReceived: parseFloat((selectedAmount * 0.88).toFixed(2)),
      totalFinanced: parseFloat(selectedAmount.toFixed(2)),
      userId: userId,
    };
    postCashKick(data).then((res) => {
      const currentDate = new Date();
      const dueDate = new Date(
        Date.UTC(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        )
      );
      postPayment({
        dueDate,
        status: "Upcoming",
        expectedAmount: parseFloat((selectedAmount / 12).toFixed(2)),
        outstanding: parseFloat(selectedAmount.toFixed(2)),
        userId: userId,
      });
      selectedContracts.forEach((item) => {
        const data = {
          userId: userId,
          contractId: item.id,
          cashKickId: res.id,
          selectedAmount: item.partialAmount,
        };
        postContracts(data);
      });
    });
  };

  return (
    <HomeTemplate
      header={
        <ApplicationHeader
          title={"New cash kick"}
          subtitle={"Let’s setup a new cash kick to power your Saas"}
        />
      }
      switchNavTabTo={activeTab}
      children={
        <Stack>
          <Button
            style={styleBackButton}
            variant="contained"
            onClick={() => {
              navigate(ROUTES.HOMEPAGE);
              setActiveTab(0);
            }}
          >
            <Stack direction="row" spacing={2}>
              <Image src={ArrowLeft} />
              <TypographyComponent
                variant="button"
                color={theme.palette.textColor.highEmphasis}
              >
                Back
              </TypographyComponent>
            </Stack>
          </Button>
          <Stack direction="row" spacing={5} alignItems="flex-start">
            <YourContracts
              contractsData={MY_CONTRACT_ROWS}
              areContractsSelected={areContractsSelected}
              selectedRows={selectedContracts}
              onSelectedContractsChange={handleContractsSelectionChange}
            />
            <ReviewSummary
              term={12}
              selectedContracts={selectedContracts.length}
              selectedAmount={selectedAmount}
              onSliderChange={handleSliderChange}
              handleResetButton={handleResetButton}
              handleReviewCreditButton={handleReviewCreditButton}
              disableSlider={areContractsSelected}
              areContractsSelected={areContractsSelected}
              openNamecashKickModal={() => setNameCashKickModal(true)}
              maxValue={availableCredit}
            />
          </Stack>
          <NameCashKickModal
            cashKickName={cashKickName}
            handleCashKickName={handleCashKickName}
            open={nameCashKickModal}
            onClose={() => setNameCashKickModal(!nameCashKickModal)}
            handleCreateCashKick={handleNameCashKickModal}
            title={"Name your cash kick"}
            description={"Add a name to identify your cash kick"}
          />
          <CashKickSuccessModal
            isOpen={cashKickSuccessModal}
            onClose={() => navigate(ROUTES.HOMEPAGE)}
            onClickViewCashKicks={() => navigate(ROUTES.CASH_ACCN)}
          />
        </Stack>
      }
    />
  );
};

export default NewCashKickPage;
