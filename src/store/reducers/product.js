import { PRODUCT_RECEIVE_COLOR } from "../actions/actionTypes";

const initialState = {
  color: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_RECEIVE_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
