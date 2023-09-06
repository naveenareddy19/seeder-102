import { render, screen } from "@testing-library/react";
import AuthenticationTemplate from ".";
import LoginPanel from "../../../../public/assets/images/singin.svg";

describe("Autentication template", () => {
  test("should render props correctly", () => {
    render(
      <AuthenticationTemplate
        imageSrc={LoginPanel}
        children={<div>Autentication Template</div>}
      />
    );
    expect(screen.getByAltText("image")).toBeInTheDocument;
    expect(screen.getByText("Autentication Template")).toBeInTheDocument;
  });
});
