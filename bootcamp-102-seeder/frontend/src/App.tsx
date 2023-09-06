import { Route, Routes } from "react-router";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import CashAccelerationPage from "./components/pages/CashAccelerationPage";
import { HOMEPAGE, RESET_PASSWORD } from "../routers";
import { ROUTES } from "./routes";
import SignUpPage from "./components/pages/SignUpPage";
import AuthenticationTemplate from "./components/templates/Authentication";
import ForgotPasswordPanel from "../public/assets/images/change-password.svg";
import ForgotPasswordPage from "./components/pages/ForgotPassword";
import NewCashKickPage from "./components/pages/NewCashKick";
import ContextProvider from "./context";

export const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={HOMEPAGE} element={<HomePage />} />
        <Route path={ROUTES.CASH_ACCN} element={<CashAccelerationPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route
          path={RESET_PASSWORD}
          element={
            <AuthenticationTemplate
              imageSrc={ForgotPasswordPanel}
              children={<ForgotPasswordPage />}
            />
          }
        />
        <Route path={ROUTES.NEW_CASH_KICK} element={<NewCashKickPage />} />
      </Routes>
    </ContextProvider>
  );
};
