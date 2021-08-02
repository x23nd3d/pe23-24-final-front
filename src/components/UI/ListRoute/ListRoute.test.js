import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import ListRoute from "./ListRoute";

describe("ListRoute", () => {
  test("should render ListRoute", () => {
    const {getByTestId} = render(
      <BrowserRouter>
        <Switch >
          <Route>
            <ListRoute content="" route="" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
    expect(getByTestId("ListRouteTestId")).toBeInTheDocument();
  })
})