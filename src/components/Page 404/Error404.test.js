import React from "react";
import {render} from "@testing-library/react";
import Error404 from "./Error404";

describe("Error404", () => {
  test("should render Error404 component", () => {
    const {getByTestId} = render(<Error404/>);
    expect(getByTestId("Error404TestId")).toBeInTheDocument();
  });
});