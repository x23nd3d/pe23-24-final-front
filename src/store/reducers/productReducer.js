import { ADD_TO_CART } from "../actions/actionTypes";

const initialState = { product: { } };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

export default productReducer;