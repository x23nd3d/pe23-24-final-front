import React from "react";
import { render } from "@testing-library/react";
import ShopSpinner from "./ShopSpinner";

describe("ShopSpinner appearance", () => {
  test("should render ShopSpinner", () => {
    const {getByTestId} = render(<ShopSpinner/>);
    expect(getByTestId("ShopSpinnerTestId")).toBeInTheDocument();
  })
})