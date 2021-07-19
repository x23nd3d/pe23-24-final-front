import { COLOR, PHOTO } from "../actions/actionTypes";

export const initialState = { color: "", photo: null };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, color: action.payload };
    case PHOTO:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
};

export default productReducer;