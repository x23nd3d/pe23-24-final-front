import {
  ERASE_COLOR,
  CHOSEN_PRICE_RANGE,
  CHOSEN_COLOR,
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
} from "./actionTypes";

export const checkCategories = (title) => (dispatch, getState) => {
  const { categories } = getState().sidebar;

  const check = categories.filter((currentCategory) => {
    if (currentCategory.title === title) {
      return {
        title,
        items: currentCategory.items,
      };
    }
    return null;
  });
  dispatch(setItems(check));

  return true;
};

export const setItems = (items) => ({
  type: UPDATE_CHOSEN_ITEMS,
  payload: items,
});

export const sidebarDefaultHandler = () => (dispatch, getState) => {
  const { chosenItems } = getState().sidebar;

  if (!chosenItems.length) {
    return;
  }

  dispatch(setSidebarDefault());
};

export const setSidebarDefault = () => ({
  type: SIDEBAR_DEFAULT,
});

export const chooseCategory = (category) => ({
  type: CHOSEN_CATEGORY,
  payload: category,
});

export const chooseSubcategory = (subcategory) => ({
  type: CHOSEN_SUBCATEGORY,
  payload: subcategory,
});

export const chooseColor = (color) => ({
  type: CHOSEN_COLOR,
  payload: color,
});

export const eraseColor = (color) => ({
  type: ERASE_COLOR,
  payload: color,
});

export const choosePriceRange = (priceRange) => ({
  type: CHOSEN_PRICE_RANGE,
  payload: priceRange,
});
