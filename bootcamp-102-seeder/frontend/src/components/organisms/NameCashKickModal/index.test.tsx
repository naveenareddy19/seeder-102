import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NameCashKickModal from ".";

describe("NameCashKickModal", () => {
  test(" should render modal correctly when open", () => {
    const onCloseMock = jest.fn();
    render(
      <NameCashKickModal
        title="Name your cash kick"
        description="Add a name to identify your cash kick"
        open={true}
        onClose={onCloseMock}
      />
    );
    expect(screen.getByText("Name your cash kick")).toBeInTheDocument();
    expect(
      screen.getByText("Add a name to identify your cash kick")
    ).toBeInTheDocument();
    expect(screen.getByAltText("cross-icon")).toBeInTheDocument();
    expect(screen.getByText("Cash kick name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ex: marketing expenses")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Create Cash Kick")).toBeInTheDocument();
  });

  test("should modal does not render when closed", () => {
    const onCloseMock = jest.fn();
    render(
      <NameCashKickModal
        title="Name your cash kick"
        description="Add a name to identify your cash kick"
        open={false}
        onClose={onCloseMock}
      />
    );
    expect(screen.queryByText("Name your cash kick")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Add a name to identify your cash kick")
    ).not.toBeInTheDocument();
  });

  test("should Create Cash Kick button is disabled when input field is empty", () => {
    const onCloseMock = jest.fn();
    render(
      <NameCashKickModal
        title="Name your cash kick"
        description="Add a name to identify your cash kick"
        open={true}
        onClose={onCloseMock}
      />
    );
    const createCashKickButton = screen.getByText("Create Cash Kick");
    const inputField = screen.getByPlaceholderText("Ex: marketing expenses");
    const testInputValue = "Test Cash Kick Name";
    fireEvent.change(inputField, { target: { value: testInputValue } });
    expect(createCashKickButton).toBeEnabled();
  });

  test("should onClose function is called when clicking Cancel button", () => {
    const onCloseMock = jest.fn();
    render(
      <NameCashKickModal
        title="Name your cash kick"
        description="Add a name to identify your cash kick"
        open={true}
        onClose={onCloseMock}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
