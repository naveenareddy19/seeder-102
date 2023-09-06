import { formatDate, generateGreeting } from "./helperFunctions";
import InfoCircle from "../public/assets/images/info-circle.svg";
import Sync from "../public/assets/images/sync.svg";
import EmptyPayment from "../public/assets/images/cheque.svg";
import ErrorStatus from "../public/assets/images/errorStatus.svg";
import { theme } from "../src/theme/theme";
import Settings from "../public/assets/images/settings.svg";
import Logout from "../public/assets/images/logout.svg";

export const APP_HEADER_CONSTANTS = {
  data: [
    {
      title: "Cash accleration",
      subtitle: "Place to create new cash kicks to run your business",
    },
    {
      title: "New cash kick",
      subtitle: "Let’s setup a new cash kick to power your Saas",
    },
    { title: generateGreeting(), subtitle: formatDate(), emoji: "✋" },
  ],
  avatarAlt: "Avatar",
  popupItems: ["Manage Subscriptions", "Help"],
  name: "Kane Cooper",
  editProfile: "Edit Profile",
  popupIconTypos: [
    {
      src: Settings,
      alt: "settings",
      text: "Settings",
      color: theme.palette.textColor.lowEmphasis,
    },
    {
      src: Logout,
      alt: "logout",
      text: "Log out",
      color: theme.palette.structural.redOrange,
    },
  ],
};

export const SummaryCardConstants = {
  heading: "Summary",
  SummaryDetails: [
    { id: "term", label: "Term" },
    { id: "contracts", label: "Selected contracts" },
    { id: "payback", label: "Pay back amount" },
    { id: "rate", label: "Rate %" },
  ],
  RatePercent: "(12.00%)",
  Payout: "Total Payout",
  Button: "Submit Your Credit",
};

export const PaymentsMessage = "You don’t have any Cash Kick";
export const PaymentsText = "Launch A new cash kick";

export const paymentsData = [
  {
    id: "1",
    dueDate: {
      date: "May 03, 2021",
      time: "31 day(s) from now",
    },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$156,250.05",
  },
  {
    id: "2",
    dueDate: {
      date: "Jun 03, 2021",
      time: "62 day(s) from now",
    },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$142,045.05",
  },
  {
    id: "3",
    dueDate: { date: "Jul 03, 2021", time: "92 day(s) from now" },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$127,840.95",
  },
  {
    id: "4",
    dueDate: { date: "Aug 03, 2021", time: "123 day(s) from now" },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$113,636.40",
  },
  {
    id: "5",
    dueDate: { date: "Sep 03, 2021", time: "153 day(s) from now" },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$99,431.85",
  },
  {
    id: "6",
    dueDate: { date: "Aug 03, 2021", time: "184 day(s) from now" },
    status: "Upcoming",
    expectedAmount: "-$14,204.55",
    outstanding: "$85,227.30",
  },
];

export const MY_CONTRACT_ROWS = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    status: "Available",
    perPayment: 12000.25,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 126722.64,
    partialAmount: 0,
  },
  {
    id: 2,
    name: "Contract 6",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 126722.64,
    partialAmount: 0,
  },
  {
    id: 3,
    name: "Contract 5",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 4,
    name: "Contract 4",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 5,
    name: "Contract 3",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 6,
    name: "Contract 2",
    type: "Monthly",
    status: "Available",
    perPayment: 6000,
    termLength: 12,
    termPercentage: 12,
    totalFinanced: "-",
    paymentAmount: 21120.0,
    partialAmount: 0,
  },
];

export const REVIEW_SUMMARY_CONSTANTS = {
  title: "Summary",
  iconAlt: "infoCircle",
  slide: "Slide to autoselect",
  info: ["Term", "Selected contracts"],
  reset: "Reset",
  totalAmount: 880000,
  selectedOf: " selected of ",
  paybackAmt: "Pay back amount",
  rate: "Rate %",
  rateValue: 12.0,
  totalPayout: "Total Payout",
  reviewCredit: "Review your credit",
};

export const CASH_KICK_SUCCESS_MODAL = {
  title: "Cash kick launched successfully!",
  description: "We are reviewing your cash kick",
  info: "Your cash kick is under review",
  message:
    "It will remain on pending state until we review it internally. This can take upto 5 mins to couple of hours. Once reviewed, the cash will be transferred to your account and you’ll be notified.",
};

export const MY_CONTRACTS_2 = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    perPayment: 12000.25,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 126722.64,
  },
  {
    id: 6,
    name: "Contract 6",
    type: "Monthly",
    perPayment: 6000,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 63360,
  },
  {
    id: 5,
    name: "Contract 5",
    type: "Monthly",
    perPayment: 6000,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 63360,
  },
  {
    id: 4,
    name: "Contract 4",
    type: "Monthly",
    perPayment: 6000,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 63360,
  },
  {
    id: 3,
    name: "Contract 3",
    type: "Monthly",
    perPayment: 6000,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 63360,
  },
  {
    id: 2,
    name: "Contract 2",
    type: "Monthly",
    perPayment: 6000,
    termLength: {
      time: 12,
      percent: 12,
    },
    paymentAmount: 21120,
  },
];

export const MY_CASH_KICKS = [
  {
    name: "My first advance",
    status: "Pending",
    maturity: "Jun 12, 2023",
    totalRecieved: {
      amount: 50219,
      rate: 12,
    },
    totalFinanced: 56245.28,
    userId: 2,
    id: 1,
  },
  {
    name: "Second",
    status: "Pending",
    maturity: "Jun 13, 2023",
    totalRecieved: {
      amount: 37980,
      rate: 12,
    },
    totalFinanced: 42537.6,
    userId: 3,
    id: 2,
  },
];

export const CASH_ACCN_TABLE_CONSTANTS = {
  iconTypos: [
    {
      icon: InfoCircle,
      text: "Cash accleration",
      iconAlt: "infoCircle",
      direction: "row",
      textColor: theme.palette.textColor.highEmphasis,
      gap: "8px",
    },
    {
      icon: Sync,
      text: "Sync now",
      iconAlt: "syncNow",
      direction: "row-reverse",
      textColor: theme.palette.primary.primary400,
      gap: "8px",
    },
  ],
  tabs: ["My contracts", "My cash kicks"],
  emptyStatus: [
    {
      imageSrc: ErrorStatus,
      noContentText: "Failed to load contracts!",
      buttonText: "Retry",
      noContentInfo: "Please contact customer support if this problem persists",
      noContentTextColor: theme.palette.textColor.highEmphasis,
    },
    {
      imageSrc: EmptyPayment,
      noContentText: "You don’t have any Cash Kick",
      buttonText: "Launch A new cash kick",
    },
  ],
};

export const chipStyles = {
  backgroundColor: theme.palette.structural.elevation2,
  color: theme.palette.textColor.mediumEmphasis,
  borderRadius: "4px",
  justifyContent: "center",
};

export interface CashKick {
  name: string;
  status: string;
  maturity: Date;
  totalReceived: number;
  totalFinanced: number;
  userId: number;
  id?: number;
}

export interface Contract {
  id?: number;
  name: string;
  type: string;
  perPayment: number;
  termLength: number;
  termFee: number;
  paymentAmount: number;
}

export interface SelectedContracts {
  userId: number;
  contractId: number;
  cashKickId: number;
  selectedAmount: number;
  id?: number;
}

export const BANNER_DATA = {
  title: "Congratulations you are ready to start!",
  description: "You are approved for funding. We are ready to advance you upto",
  uptoAmount: "$8.8M",
  buttonName: "Learn More",
};

export interface UserDetails {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

export interface Payment {
  id?: number;
  dueDate: Date;
  status: string;
  expectedAmount: number;
  outstanding: number;
  userId: number;
}

export interface PaymentRow {
  id?: number;
  dueDate: {
    date: string;
    time: string;
  };
  status: string;
  expectedAmount: string;
  outstanding: string;
  days?: number;
}
