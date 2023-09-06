import React, { useMemo, useState } from "react";
import { AppContext } from "../utils/constants";
import { PaymentRow } from "../../utils/constants";

interface AppContextProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: AppContextProps) => {
  const [userId, setUserId] = useState(0);
  const [upcomingPayment, setUpcomingPayment] = useState<PaymentRow>();
  const contextValue = useMemo(
    () => ({
      userId,
      setUserId,
      upcomingPayment,
      setUpcomingPayment,
    }),
    [userId, setUserId, upcomingPayment, setUpcomingPayment]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export default ContextProvider;
