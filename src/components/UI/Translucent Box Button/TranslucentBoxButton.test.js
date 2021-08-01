import React from "react";
import { render } from "@testing-library/react";
import TranslucentBoxButton from "./TranslucentBoxButton";

describe("TranslucentBoxButton", () => {
  test("should render TranslucentBoxButton", () => {
    const {getByTestId} = render(<TranslucentBoxButton/>);
    expect(getByTestId("TranslucentBoxButtonTestId")).toBeInTheDocument();
  })
})