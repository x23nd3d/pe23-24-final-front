import {
  CHECKOUT_SUCCESS,
  COLOR,
  PHOTO,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
  SEND_PRODUCT_REQUEST_ERROR,
  TOGGLE_ITEM_PREVIEW,
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

const transformPreviewItem = (item) => {
  const newItems = {
    ...item,
  };
  if (!newItems.size || newItems.size === "undefined") {
    delete newItems.size;
    return newItems;
  }
  return newItems;
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
    case TOGGLE_ITEM_PREVIEW:
      return {
        ...state,
        currentItemPreview: transformPreviewItem(action.payload),
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        currentItem: {},
        photo: null,
        visited: new Set(),
        color: "",
      };
    default:
      return state;
  }
};

export default productReducer;
