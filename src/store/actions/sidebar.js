import { CHOSEN_CATEGORY } from "./actionTypes";

const chooseCategory = (category) => ({
  type: CHOSEN_CATEGORY,
  payload: category,
});

export default chooseCategory;
