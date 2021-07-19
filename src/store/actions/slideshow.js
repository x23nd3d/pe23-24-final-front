import { PHOTOS } from "./actionTypes";

const photoAction = (value) => ({
  type: PHOTOS,
  payload: value,
});

export default photoAction;