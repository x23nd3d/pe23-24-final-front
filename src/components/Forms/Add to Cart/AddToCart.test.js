// import React from "react";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import {render} from "@testing-library/react";

// import reducer, {initialState} from "../../../store/reducers/rootReducer";
// import AddToCartForm from "./AddToCartForm";

// const renderWithRedux = (
//   component,
//   {initialState, store = createStore(reducer, initialState)} = {}
// ) => {
//   return {
//     ...render(<Provider store={store} >{component}</Provider>),
//     store
//   }
// }

// describe("AddToCartForm component", () => {
//   test("should render AddToCartForm", () => {
//     const {getByTestId} = render(renderWithRedux(<AddToCartForm/>, initialState));
//     expect(getByTestId("AddToCartFormId")).toBeInTheDocument();
//   })
// })