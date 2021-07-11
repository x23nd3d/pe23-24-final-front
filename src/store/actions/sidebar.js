import { CHOSEN_CATEGORY } from "./actionTypes";

const chooseCategory = (category) => {
  console.log("!!!!!!!!!!!!!!!!!!!", category);
  return {
    type: CHOSEN_CATEGORY,
    payload: category,
  };
};

export default chooseCategory;
