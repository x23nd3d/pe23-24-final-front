import {
  ERASE_COLOR,
  CHOSEN_PRICE_RANGE,
  CHOSEN_COLOR,
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
} from "../actions/actionTypes";

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
  chosenItems: [],
  chosenColor: [],
  chosenPriceRange: {
    min: "",
    max: "",
  },
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
    case CHOSEN_COLOR:
      return {
        ...state,
        chosenColor: [...state.chosenColor, action.payload],
      };
    case ERASE_COLOR:
      return {
        ...state,
        chosenColor: state.chosenColor.filter(
          (item) => item !== action.payload
        ),
      };
    case CHOSEN_PRICE_RANGE:
      return {
        ...state,
        chosenPriceRange: action.payload,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
