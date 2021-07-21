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
  SAVE_FILTERED_ITEMS,
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

// ****** ****** ****** ****** ******

export const filterByPriceRangeAction = (items) => (dispatch, getState) => {
  const currentPriceRange = getState().sidebar.priceRange;

  const filteredItems = items.filter(
    (item) =>
      item.price >= currentPriceRange.min &&
      item.price <= currentPriceRange.max &&
      item
  );

  return dispatch(filterByPriceRange(filteredItems));
};

export const filterByPriceRange = (filteredItems) => ({
  type: FILTER_ITEMS_BY_PRICE,
  filteredItems,
});

export const filterAction = (items) => (dispatch, getState) => {
  const { currentItems } = getState().shop;
  const currentPriceRange = getState().sidebar.priceRange;
  const currentChosenColors = getState().sidebar.chosenColors;

  function $filterByPrice(array, min = 0, max = 33000) {
    return array.filter(
      (item) => item.price >= min && item.price <= max && item
    );
  }

  function $filterByColor(array, colors) {
    if (colors.length === 0) return array;

    return array.filter((item) =>
      item.color.some((color) => colors.includes(color))
    );
  }

  function $filteredItems() {
    return $filterByPrice(
      $filterByColor(currentItems, currentChosenColors),
      currentPriceRange.min,
      currentPriceRange.max
    );
  }

  const filtered = $filteredItems();

  console.log("FILTERED:", $filteredItems());

  dispatch(filter(filtered));
};

export const filter = (filteredItems) => ({
  type: SAVE_FILTERED_ITEMS,
  filteredItems,
});
