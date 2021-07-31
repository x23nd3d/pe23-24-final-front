import React from "react";
import { render } from "@testing-library/react";
import ProductTag from "./ProductTag";

describe("ProductTag", () => {
  test("should render ProductTag", () => {
    const {getByTestId} = render(<ProductTag/>);
    expect(getByTestId("ProductTagTestId")).toBeInTheDocument();
  })
})