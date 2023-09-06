import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CashAccelerationCard from ".";
import { accelerationCardItems } from "./cashAccelerationCardConstants";

describe("Cash acceleration component", () => {
  test("should render titles", () => {
    render(
      <CashAccelerationCard
        termCap={12}
        availableCredit={880.0}
        maxInterestRate={12.0}
      />
    );
    accelerationCardItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test("should render subtitles", () => {
    render(
      <CashAccelerationCard
        termCap={12}
        availableCredit={880}
        maxInterestRate={12.0}
      />
    );
    const values = ["12 months", "$0.09k", "12.00%"];
    values.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
  
  test("should render available credit when less than 100", () => {
    render(
      <CashAccelerationCard
        termCap={12}
        availableCredit={88}
        maxInterestRate={12.0}
      />
    );
    const values = ["12 months", "$88.00", "12.00%"];
    values.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("should render images", () => {
    render(
      <CashAccelerationCard
        termCap={12}
        availableCredit={880.0}
        maxInterestRate={12.0}
      />
    );
    accelerationCardItems.forEach((item) => {
      expect(screen.getByAltText(item.alt)).toBeInTheDocument();
    });
  });
});
