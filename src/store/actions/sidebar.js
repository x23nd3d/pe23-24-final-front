import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
} from "./actionTypes";

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
        return {
          title,
          items: currentCategory.items,
        };
      }
      console.log("NO MAT VASHU");
      return null;
    });

    console.log(check, "****************!CHECK");
    // dispatch(setItems(check[0].items));
    dispatch(setItems(check));

    return true;
  };
};

export const setItems = (items) => {
  console.log("ITEMS", items);
  return {
    type: UPDATE_CHOSEN_ITEMS,
    payload: items,
  };
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

// export default chooseCategory;
