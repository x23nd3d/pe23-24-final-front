import {
  ADJUST_PRICE_RANGE,
  SAVE_FILTERED_ITEMS,
  ADD_REMOVE_COLOR,
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  chosenCategory: "clothes",
  chosenSubcategory: "viewAll",
  chosenItems: [],
  chosenColors: [],
  priceRange: {
    min: 0,
    max: 0,
  },
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

const handlers = {
  [UPDATE_CHOSEN_ITEMS]: (state, action) => ({
    ...state,
    chosenItems: action.payload,
  }),
  [SIDEBAR_DEFAULT]: (state, action) => ({
    ...state,
    chosenCategory: "all",
    chosenSubcategory: "all",
    chosenItems: [],
  }),
  [CHOSEN_CATEGORY]: (state, action) => ({
    ...state,
    chosenCategory: action.payload,
  }),
  [CHOSEN_SUBCATEGORY]: (state, action) => ({
    ...state,
    chosenSubcategory: action.payload,
  }),
  [ADD_REMOVE_COLOR]: (state, { chosenColors }) => ({
    ...state,
    chosenColors,
  }),
  [ADJUST_PRICE_RANGE]: (state, { priceRange }) => ({
    ...state,
    priceRange,
  }),

  DEFAULT: (state) => state,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default sidebarReducer;
