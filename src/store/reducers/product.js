import {
  COLOR,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
} from "../actions/actionTypes";

const initialState = {
  color: "",
  currentItem: {},
  loading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, color: action.payload };
    case SELECT_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
        loading: false,
      };
    case SELECT_CURRENT_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default productReducer;
