import ContextProvider from ".";
import { render } from "../test-setup";

describe("ContextProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ContextProvider>
        <div>Hello World</div>
      </ContextProvider>
    );

    expect(getByText("Hello World")).toBeInTheDocument;
  });
});
