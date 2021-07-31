import React from "react";
import { render } from "@testing-library/react";
import AddToCartIcon from "./AddToCartIcon";
import AddToWishlistIcon from "./AddToWishlistIcon";
import AlreadyInWishlistIcon from "./AlreadyInWishlistIcon";
import Available from "./Available";
import Unavailable from "./Unavailable";
import BackShoppingIcon from "./BackShoppingIcon";

describe("SVG Icons Components", () => {

  test("should render AddToCartIcon", () => {
    const {getByTestId} = render(<AddToCartIcon/>);
    expect(getByTestId("AddToCartIconTestId")).toBeInTheDocument();
  });

  test("should render AddToWishlistIcon", () => {
    const {getByTestId} = render(<AddToWishlistIcon/>);
    expect(getByTestId("AddToWishlistIconTestId")).toBeInTheDocument();
  });

  test("should render AlreadyInWishlistIcon", () => {
    const {getByTestId} = render(<AlreadyInWishlistIcon/>);
    expect(getByTestId("AlreadyInWishlistIconTestId")).toBeInTheDocument();
  });

  test("should render Available", () => {
    const {getByTestId} = render(<Available/>);
    expect(getByTestId("AvailableTestId")).toBeInTheDocument();
  });

  test("should render Unavailable", () => {
    const {getByTestId} = render(<Unavailable/>);
    expect(getByTestId("UnavailableTestId")).toBeInTheDocument();
  });

  test("should render BackShoppingIcon", () => {
    const {getByTestId} = render(<BackShoppingIcon/>);
    expect(getByTestId("BackShoppingIconTestId")).toBeInTheDocument();
  });
})