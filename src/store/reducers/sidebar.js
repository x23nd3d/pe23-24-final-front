import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SET_CHOSEN_ITEMS,
  RESET_SIDEBAR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  chosenCategory: "all",
  chosenSubcategory: "all",
  // categories: [
  //   {
  //     title: "clothes",
  //     items: ["Suits", "Outerwear", "Pants"],
  //   },
  //   {
  //     title: "shoes",
  //     items: ["Boots", "Sneakers", "Shoes"],
  //   },
  //   {
  //     title: "accessories",
  //     items: ["Glasses", "Belts", "Cufflinks", "Watches"],
  //   },
  // ],
  categories: {
    clothes: ["Suits", "Outerwear", "Pants"],
    shoes: ["Boots", "Sneakers", "Shoes"],
    accessories: ["Glasses", "Belts", "Cufflinks", "Watches"],
  },
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
    case SET_CHOSEN_ITEMS:
      console.log(
        action.items,
        "actionactionactionactionaction!!!!!!!!!!!!!!!!!!!!!!!!1"
      );
      return {
        ...state,
        chosenItems: action.payload,
      };
    case RESET_SIDEBAR:
      return {
        ...state,
        chosenItems: state.categories.map((all) => all.items).flat(),
        chosenCategory: "all",
        chosenSubcategory: "all",
      };

    default:
      return state;
  }
};

export default sidebarReducer;
