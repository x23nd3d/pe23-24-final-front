import {
  ADJUST_PRICE_RANGE,
  ADD_REMOVE_COLOR,
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
  FILTER_ITEMS_BY_PRICE,
  FILTER_ITEMS_BY_COLOR,
  RESET_FILTERS,
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

//

//  * add and remove color from store
export const addRemoveColorAction = (color) => (dispatch, getState) => {
  let { chosenColors } = getState().sidebar;

  chosenColors.includes(color)
    ? (chosenColors = chosenColors.filter((item) => item !== color))
    : chosenColors.push(color);

  dispatch(addRemoveColor(chosenColors));
};

export const addRemoveColor = (chosenColors) => ({
  type: ADD_REMOVE_COLOR,
  chosenColors,
});

//

//  * adjust price range in store
export const adjustPriceRangeAction = (priceRange) => (dispatch, getState) => {
  const { currentPriceRange } = getState().priceRange;

  console.log("CURRENT PRICE RANGE:", currentPriceRange);
};

export const adjustPriceRange = (priceRange) => ({
  type: ADJUST_PRICE_RANGE,
  priceRange,
});

//

// * filter by color
export const filterByColorAction = (items) => (dispatch, getState) => {
  const currentChosenColors = getState().sidebar.chosenColors;

  currentChosenColors.length === 0 && dispatch(filterByColor(items));

  return dispatch(
    filterByColor(
      items.filter((item) =>
        item.color.some((a) => currentChosenColors.includes(a))
      )
    )
  );
};

export const filterByColor = (filteredItems) => ({
  type: FILTER_ITEMS_BY_COLOR,
  filteredItems,
});

export const resetFiltersAction = () => (dispatch) => {
  dispatch(filterByColor([]));
};

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// ! WORK ON THIS ONE
// export const filterByPriceRangeAction = (items, rangeValue) => {
// return (dispatch) => {
// console.log(items, rangeValue);
// };

// console.log("PRICE RANGE FROM SIDEBAR: >>>", priceRange);
// const filteredItems = items.filter(
//   (item) => item.price > priceRange.min && item.price < priceRange.max
// );
// console.log(items);
// return filteredItems;
// };

export const filterByPriceRangeAction = (items, rangeValue) => (dispatch) => {
  console.log(items, rangeValue);

  dispatch(filterByPriceRange(["dsda", "adsadsa"]));
};

export const filterByPriceRange = (filteredItems) => ({
  type: FILTER_ITEMS_BY_PRICE,
  filteredItems,
});
