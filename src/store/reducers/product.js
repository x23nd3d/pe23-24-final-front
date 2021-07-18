import { COLOR, SELECT_CURRENT_ITEM } from "../actions/actionTypes";

const initialState = {
  color: "",
  currentItem: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, color: action.payload };
    case SELECT_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
