import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavigationListRoutes from "./NavigationListRoutes";

describe("NavigationListRoutes", () => {
  test("should render NavigationListRoutes", () => {
    const {getByTestId} = render(
      <BrowserRouter>
        <Switch >
          <Route>
            <NavigationListRoutes id={1} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
    expect(getByTestId("NavigationListRoutesTestId")).toBeInTheDocument();
  })
})