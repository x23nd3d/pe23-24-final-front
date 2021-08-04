import React from "react";
import { render } from "@testing-library/react";
import BackShopping from "./BackShopping";
import AddToWishList from "./AddToWishList";

describe("ButtonsList", () => {
  test("should render BackShopping", () => {
    const {getByTestId} = render(<BackShopping history={{}} />);
    expect(getByTestId("BackShoppingTestId")).toBeInTheDocument();
  });
  test("should render AddToWishList", () => {
    const {getByTestId} = render(<AddToWishList onWish={(f) => f} item={{}} history={{}} toggle={(f) => f} />);
    expect(getByTestId("AddToWishListTestId")).toBeInTheDocument();
  });
})