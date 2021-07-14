import { CHOSEN_CATEGORY, CHOSEN_SUBCATEGORY } from "./actionTypes";

export const chooseCategory = (category) => ({
  type: CHOSEN_CATEGORY,
  payload: category,
});

export const chooseSubcategory = (subcategory) => ({
  type: CHOSEN_SUBCATEGORY,
  payload: subcategory,
});

// export default chooseCategory;
