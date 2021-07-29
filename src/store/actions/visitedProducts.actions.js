import { ADD_VISITED_PRODUCT } from "./actionTypes";

export const visitedProductsFunction = (product) => (dispatch, getState) => {
  const currentVisitedProducts = getState().visited.visitedProducts;

  console.log("CURRENT VISITED PRODUCTS:", currentVisitedProducts);
  console.log("PROPED VISITED PRODUCT:", product);

  const newVisitedItems = [];

  if (!currentVisitedProducts.length) {
    return dispatch(visitedProductsAction(newVisitedItems.unshift(product)));
  }

  return dispatch(visitedProductsAction(newVisitedItems));
};

export const visitedProductsAction = (products) => ({
  type: ADD_VISITED_PRODUCT,
  payload: products,
});
