import { Box, CircularProgress, Stack, styled } from "@mui/material";
import {
  APP_HEADER_CONSTANTS,
  BANNER_DATA,
  CashKick,
} from "../../../../utils/constants";
import { ApplicationHeader } from "../../organisms/ApplicationHeader";
import { HomeTemplate } from "../../templates/HomeTemplate";
import PaymentsTable from "../../organisms/PaymentsTable";
import NewCashKick from "../../molecules/NewCashKick";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import { useEffect, useState } from "react";
import {
  getCashKicks,
  getToken,
  getUserByEmail,
  postUser,
} from "../../../services";
import { PaymentCard } from "../../molecules/PaymentCard";
import Banner from "../../molecules/Banner";
import { separateNumberWithCommas } from "../../../../utils/helperFunctions";
import { useAppContext } from "../../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { userId, upcomingPayment, setUserId } = useAppContext();
  const { isAuthenticated, user: authUser } = useAuth0();
  const navigate = useNavigate();
  const [cashKicks, setCashKicks] = useState<CashKick[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [outStandingAmt, setOutStandingAmt] = useState<number>(0);
  const [availableCredit, setAvailableCredit] = useState<number>(0);

  useEffect(() => {
    const getUserInfo = async () => {
      if (isAuthenticated) {
        await getUserByEmail(authUser?.email!)
          ?.then((data) => {
            setUserId(data.id);
            getToken({
              email: authUser?.email!,
              password: process.env.PASSWORD ?? "",
            })?.then((res) => {
              setLoading(true);
              localStorage.setItem("token", res.token);
            });
          })
          .catch(async () => {
            await postUser({
              name: authUser?.given_name!,
              email: authUser?.email!,
              password: process.env.PASSWORD ?? "",
            })?.then((res) => {
              setUserId(res.id);
            });
          });
      }
    };
    getUserInfo();
  }, [isAuthenticated]);

  useEffect(() => {
    getCashKicks(userId)?.then((res) => {
      setLoading(false);
      setCashKicks(res);
      let sum = 0;
      res.forEach((item: CashKick) => {
        sum += item.totalFinanced;
      });
      setOutStandingAmt(sum);
      if (880000 - sum <= 0) {
        setAvailableCredit(0);
      } else {
        setAvailableCredit(880000 - sum);
      }
    });
  }, [outStandingAmt, loading]);

  const LoaderContainer = styled(Box)(`
    display:grid;
    place-items:center;
    height:100%;
  `);

  return (
    <HomeTemplate
      header={
        <ApplicationHeader
          title={APP_HEADER_CONSTANTS.data[2].title}
          emoji={APP_HEADER_CONSTANTS.data[2].emoji}
          subtitle={APP_HEADER_CONSTANTS.data[2].subtitle}
        />
      }
      switchNavTabTo={0}
    >
      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <Stack direction="column" spacing="1.25rem">
          <Stack direction="row" spacing="1.25rem" alignItems={"stretch"}>
            <Box width="51.24vw" height="256px">
              {cashKicks.length === 0 ? (
                <Banner
                  title={BANNER_DATA.title}
                  description={BANNER_DATA.description}
                  uptoAmount={BANNER_DATA.uptoAmount}
                  buttonName={BANNER_DATA.buttonName}
                />
              ) : (
                <Box display={"flex"} gap={"20px"}>
                  <PaymentCard
                    card={"due"}
                    dueDate={upcomingPayment?.dueDate.date}
                    dueAmount={upcomingPayment?.expectedAmount.substring(2)}
                  />
                  <PaymentCard card={"amount"} amount={outStandingAmt} />
                </Box>
              )}
            </Box>
            <NewCashKick
              totalAmount={`$${separateNumberWithCommas(
                availableCredit.toFixed(2)
              )}`}
              onClick={() => navigate(ROUTES.NEW_CASH_KICK)}
            />
          </Stack>
          <PaymentsTable isEmpty={cashKicks.length === 0} />
        </Stack>
      )}
    </HomeTemplate>
  );
};

export default HomePage;
