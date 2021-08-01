import React from "react";
import { render } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  test("should render Select", () => {
    const {getByTestId} = render(<Select/>);
    expect(getByTestId("SelectTestId")).toBeInTheDocument();
  })
})