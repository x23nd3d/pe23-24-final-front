import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SET_CHOSEN_ITEMS,
  RESET_SIDEBAR,
} from "./actionTypes";

export const chooseCategory = (category) => ({
  type: CHOSEN_CATEGORY,
  payload: category,
});

export const checkCategories = (title) => {
  console.log("TEST");
  return (dispatch, getState) => {
    console.log(title, "RECEIVED CATEGORY FROM ACTION");
    console.log(getState.sidebar, " getState.sidebar");
    const { categories } = getState().sidebar;

    const check = categories.filter((currentCategory) => {
      console.log(
        "currentCategorycurrentCategorycurrentCategory",
        currentCategory
      );

      if (currentCategory.title === title) {
        console.log("YES MAT VASHU", currentCategory.items);
        return currentCategory;
      }
      console.log("NO MAT VASHU");
      return null;
    });

    console.log(check[0].items, "****************!CHECK");
    // dispatch(setItems(check[0].items));
    dispatch(setItems(check[0].items));

    return true;
  };
};

export const setItems = (items) => {
  console.log("ITEMS", items);
  return {
    type: SET_CHOSEN_ITEMS,
    payload: items,
  };
};

export const chooseSubcategory = (subcategory) => ({
  type: CHOSEN_SUBCATEGORY,
  payload: subcategory,
});

export const resetSidebar = () => ({
  type: RESET_SIDEBAR,
});

// export default chooseCategory;
