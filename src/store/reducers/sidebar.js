import { CHOSEN_CATEGORY, CHOSEN_SUBCATEGORY } from "../actions/actionTypes";

const INITIAL_STATE = {
  chosenCategory: "clothes",
  chosenSubcategory: "viewAll",
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

    default:
      return state;
  }
};

export default sidebarReducer;
