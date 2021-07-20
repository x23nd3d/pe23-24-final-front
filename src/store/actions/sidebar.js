import {
  ADJUST_PRICE_RANGE,
  ADD_REMOVE_COLOR,
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
export const filterByColor = (items, colors) => {
  const filteredItems = items.filter((item) =>
    item.color.some((a) => colors.includes(a))
  );

  console.log("FILTERED ITEMS BY COLOR:", filteredItems);
  return filteredItems;
};

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
export const filterByPriceRangeAction = (items, rangeValue) => {
  console.log(items, rangeValue);
  // console.log("PRICE RANGE FROM SIDEBAR: >>>", priceRange);
  // const filteredItems = items.filter(
  //   (item) => item.price > priceRange.min && item.price < priceRange.max
  // );
  // console.log(items);
  // return filteredItems;
};
