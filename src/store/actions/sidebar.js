import {
  ADD_REMOVE_COLOR,
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  RESET_FILTERS,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
  SET_CURRENT_ITEMS_PRICE_RANGE,
  SET_CHOSEN_PRICE_RANGE,
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

export const setItems = (chosenItems) => ({
  type: UPDATE_CHOSEN_ITEMS,
  payload: chosenItems,
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

export const chooseColorsFunction = (color) => (dispatch, getState) => {
  const currentChosenColors = getState().sidebar.chosenColors;

  dispatch(
    chooseColorsAction(
      currentChosenColors.includes(color)
        ? currentChosenColors.filter((item) => item !== color)
        : [...currentChosenColors, color]
    )
  );
};

export const chooseColorsAction = (chosenColors) => ({
  type: ADD_REMOVE_COLOR,
  payload: chosenColors,
});

export const setCurrentItemsPriceRangeFunction =
  (priceRange) => (dispatch, getState) => {
    const currentItemsPriceRange = getState().shop.currentItems.map(
      (item) => +item.price
    );

    const minMaxPriceRange = {
      min: Math.min(...currentItemsPriceRange),
      max: Math.max(...currentItemsPriceRange),
    };

    return dispatch(setCurrentItemsPriceRangeAction(minMaxPriceRange));
  };

export const setCurrentItemsPriceRangeAction = (priceRange) => ({
  type: SET_CURRENT_ITEMS_PRICE_RANGE,
  payload: priceRange,
});

export const setChosenPriceRangeAction = (chosenPriceRange) => ({
  type: SET_CHOSEN_PRICE_RANGE,
  chosenPriceRange,
});

export const resetFiltersAction = () => ({
  type: RESET_FILTERS,
});
