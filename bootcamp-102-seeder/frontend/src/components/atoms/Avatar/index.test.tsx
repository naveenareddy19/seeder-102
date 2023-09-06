import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AvatarImg from "../../../../public/images/avatar.svg";
import { Avatar } from ".";

describe("Avatar component", () => {
  test("should render avatar", () => {
    render(<Avatar src={AvatarImg} alt="Woman" />);
    expect(screen.getByAltText("Woman")).toBeInTheDocument();
  });

  test("should contain src", () => {
    render(<Avatar src={AvatarImg} alt="Woman" />);
    expect(screen.getByAltText("Woman")).toHaveAttribute("src", AvatarImg);
  });
});
