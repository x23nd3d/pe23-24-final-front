import React from "react";
import {render} from "@testing-library/react";
import Backdrop from "./Backdrop";

describe("Backdrop", () => {
  test("should render Backdrop", () => {
    const {getByTestId} = render(<Backdrop/>);
    expect(getByTestId("BackdropTestId")).toBeInTheDocument();
  });
});