import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {render, screen} from "@testing-library/react";
import Header from "./Header";
import Navbar from "./Navbar/Navbar";

describe("Header components", () => {
  test("should render Header component", () => {
    render(
      <BrowserRouter>
        <Switch>
          <Route component={Header} />
        </Switch>
      </BrowserRouter>
    );
    expect(screen.getByTestId("HeaderTestId")).toBeInTheDocument();
  });

  test("should render Navbar", () => {
    const {getByTestId} = render(<Navbar/>);
    expect(getByTestId("NavbarTestId")).toBeInTheDocument();
  })
});