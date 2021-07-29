import { ADD_VISITED_PRODUCT } from "./actionTypes";

export const visitedProductsFunction = (product) => (dispatch, getState) => {
  const currentVisitedProducts = getState().visited.visitedProducts;

  if (!currentVisitedProducts.length)
    return dispatch(
      visitedProductsAction([...currentVisitedProducts, product])
    );

  if (!currentVisitedProducts.some((current) => current.id === product.id))
    return dispatch(
      visitedProductsAction([...currentVisitedProducts, product].reverse())
    );
};

export const visitedProductsAction = (products) => ({
  type: ADD_VISITED_PRODUCT,
  payload: products,
});
