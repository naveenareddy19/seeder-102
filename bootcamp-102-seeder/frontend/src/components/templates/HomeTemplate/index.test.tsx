import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import { HomeTemplate } from ".";
import { ApplicationHeader } from "../../organisms/ApplicationHeader";
import { APP_HEADER_CONSTANTS } from "../../../../utils/constants";
import { render } from "../../../test-setup";

describe("HomeTemplate", () => {
  it("should render header and children correctly", () => {
    const header = (
      <ApplicationHeader
        title={APP_HEADER_CONSTANTS.data[0].title}
        subtitle={APP_HEADER_CONSTANTS.data[0].subtitle}
      />
    );
    const children = <div>Children Content</div>;
    render(<HomeTemplate header={header} children={children} />);
    expect(
      screen.getByText(APP_HEADER_CONSTANTS.data[0].title)
    ).toBeInTheDocument();
    expect(screen.getByText("Children Content")).toBeInTheDocument();
  });
});
