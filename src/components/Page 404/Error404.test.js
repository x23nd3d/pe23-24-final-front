import React from "react";
import {render} from "@testing-library/react";
import Error404 from "./Error404";
import { Route, Switch, BrowserRouter} from "react-router-dom";

describe("Error404", () => {
  test("should render Error404 component", () => {
    const {getByTestId} = render(
      <BrowserRouter>
        <Switch >
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
    expect(getByTestId("Error404TestId")).toBeInTheDocument();
  });
});