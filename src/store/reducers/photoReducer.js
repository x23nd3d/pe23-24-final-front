import { PHOTOS } from "../actions/actionTypes";

const initialState = { photo: [] };

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTOS:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
};

export default photoReducer;