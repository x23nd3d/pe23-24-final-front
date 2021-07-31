import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title", () => {
  test("should render Title", () => {
    const {getByTestId} = render(<Title/>);
    expect(getByTestId("TitleTestId")).toBeInTheDocument();
  })
})