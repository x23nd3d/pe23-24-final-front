import { COLOR, PHOTO, VISITED_PRODUCTS } from "../actions/actionTypes";

export const initialState = { color: "", photo: null, visited: new Set() };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, color: action.payload };
    case PHOTO:
      return { ...state, photo: action.payload };
      case VISITED_PRODUCTS:
        return { ...state, visited: action.payload };
    default:
      return state;
  }
};

export default productReducer;