import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  chosenCategory: "all",
  chosenSubcategory: "all",
  categories: [
    {
      title: "clothes",
      items: ["Suits", "Outerwear", "Pants"],
    },
    {
      title: "shoes",
      items: ["Boots", "Sneakers", "Shoes"],
    },
    {
      title: "accessories",
      items: ["Glasses", "Belts", "Cufflinks", "Watches"],
    },
  ],
  chosenItems: [],
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHOSEN_CATEGORY:
      return {
        ...state,
        chosenCategory: action.payload,
      };
    case CHOSEN_SUBCATEGORY:
      return {
        ...state,
        chosenSubcategory: action.payload,
      };
    case SIDEBAR_DEFAULT:
      return {
        ...state,
        chosenCategory: "all",
        chosenSubcategory: "all",
        chosenItems: [],
      };
    case UPDATE_CHOSEN_ITEMS:
      return {
        ...state,
        chosenItems: action.payload,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
