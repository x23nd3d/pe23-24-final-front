import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
  ADD_REMOVE_COLOR,
  SET_FILTER_ITEMS,
  RESET_FILTERS,
  SET_PRICE_RANGE,
  RESET_FILTER_ITEMS,
} from "./actionTypes";

import { getMinMaxPrice } from "../../utils/sidebar.utils";
import { sortByName, sortByPrice } from "../../utils/sort";

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
export const addRemoveColorAction = (color) => ({
  type: ADD_REMOVE_COLOR,
  payload: color,
});
export const addRemoveColorFunction = (color) => (dispatch, getState) => {
  const currentChosenColors = getState().sidebar.chosenColors;

  const colors = currentChosenColors.includes(color)
    ? currentChosenColors.filter((item) => item !== color)
    : [...currentChosenColors, color];

  return dispatch(addRemoveColorAction(colors));
};
export const sortByNameFunction =
  (filteredItems, condition) => (dispatch, getState) => {
    const currentFilteredItems = getState().shop.filteredItems;
    return dispatch(
      filterItemsAction(sortByName(currentFilteredItems, condition))
    );
  };
export const sortByPriceFunction =
  (filteredItems, condition) => (dispatch, getState) => {
    const currentFilteredItems = getState().shop.filteredItems;
    return dispatch(
      filterItemsAction(sortByPrice(currentFilteredItems, condition))
    );
  };
export const filterItemsAction = (filteredItems) => ({
  type: SET_FILTER_ITEMS,
  payload: filteredItems,
});
export const filterItemsFunction = () => (dispatch, getState) => {
  const { currentItems } = getState().shop;
  const { chosenColors } = getState().sidebar;
  const { chosenPriceRange } = getState().sidebar;

  const currentItemsMinMaxPrice = getMinMaxPrice(currentItems);

  function filterByPrice(
    array,
    min = chosenPriceRange.min === 0
      ? currentItemsMinMaxPrice.min
      : chosenPriceRange.min,
    max = chosenPriceRange.max === 0
      ? currentItemsMinMaxPrice.max
      : chosenPriceRange.max
  ) {
    return array.filter(
      (item) => item.price >= min && item.price <= max && item
    );
  }

  function filterByColor(array, colors) {
    if (colors.length === 0) return array;

    return array.filter((item) =>
      item.color.some((color) => colors.includes(color))
    );
  }

  function filteredItems() {
    return filterByPrice(filterByColor(currentItems, chosenColors));
  }

  const result =
    filteredItems().length === 0
      ? "Nothing matches your choice"
      : filteredItems();

  dispatch(filterItemsAction(result));
};
export const setPriceRangeAction = (priceRange) => ({
  type: SET_PRICE_RANGE,
  payload: priceRange,
});
export const resetFiltersItemsAction = () => ({
  type: RESET_FILTER_ITEMS,
});
export const resetFiltersAction = () => ({
  type: RESET_FILTERS,
});
export const resetFiltersItemsFunction = () => (dispatch) => {
  // console.log("resetFiltersItemsFunction", resetFiltersItemsFunction);
  // dispatch(() => {
  //   resetFiltersItemsAction();
  //   resetFiltersAction();
  // });
};
