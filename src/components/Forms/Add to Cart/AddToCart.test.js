import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {render} from "@testing-library/react";
import renderWithRedux from "../../../utils/testing/renderWithRedux";
import reducer, {initialState} from "../../../store/reducers/rootReducer";
import AddToCartForm from "./AddToCartForm";

describe("AddToCartForm component", () => {
  test("should render AddToCartForm", () => {
    const {getByTestId} = renderWithRedux(<AddToCartForm/>, {});
    expect(getByTestId("AddToCartFormId")).toBeInTheDocument();
  })
})