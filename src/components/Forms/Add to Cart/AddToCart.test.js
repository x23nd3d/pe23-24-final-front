import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {withRouter} from "react-router-dom";

import renderWithRedux from "../../../utils/testing/renderWithRedux";
import AddToCartForm from "./AddToCartForm";
import {productObject} from "../../../utils/testing/mock";


describe("AddToCartForm component", () => {
  // test("should submit values", () => {
  //   const handleSubmit = jest.fn();
  //   renderWithRedux(withRouter(<AddToCartForm/>, { initialState: productObject }));

  //   userEvent.type(screen.getByLabelText)
  // });

  test("should render AddToCartForm", async () => {
    renderWithRedux(withRouter(<AddToCartForm/>), { initialState: productObject });
    expect(screen.queryByTestId("AddToCartFormTestId")).toBeNull();
    expect(await screen.findByTestId("AddToCartFormTestId")).toBeInTheDocument();
  })
})