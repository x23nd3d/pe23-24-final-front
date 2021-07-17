import { COLOR } from "../actions/actionTypes";

const initialState = { color: "" };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

export default productReducer;