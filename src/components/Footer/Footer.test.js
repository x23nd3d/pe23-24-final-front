import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {render, screen} from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("should render Footer component", () => {
    render(
      <BrowserRouter>
        <Switch>
          <Route component={Footer} />
        </Switch>
      </BrowserRouter>
    );
    expect(screen.getByTestId("FooterTestId")).toBeInTheDocument();
  });
});