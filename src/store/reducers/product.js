import {
  COLOR,
  PHOTO,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
  SEND_PRODUCT_REQUEST_ERROR,
  VISITED_PRODUCTS,
} from "../actions/actionTypes";

const initialState = {
  color: "",
  currentItem: {},
  currentItemPreview: {},
  photo: null,
  visited: new Set(),
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
    case SEND_PRODUCT_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case PHOTO:
      return { ...state, photo: action.payload };
    case VISITED_PRODUCTS:
      return { ...state, visited: action.payload };
    default:
      return state;
  }
};

export default productReducer;
