import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
  ADD_REMOVE_COLOR,
  RESET_FILTERS,
  SET_PRICE_RANGE,
  RECEIVE_CURRENT_ROUTE_START,
  SORT_BY_NAME,
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
    {
      title: "collections",
      items: ["New", "Recommended", "Popular"],
    },
  ],
  chosenItems: [],
  chosenColors: [],
  chosenPriceRange: {
    min: 0,
    max: 0,
  },
  reset: false,
  sortyByName: {
    sort: false,
    condition: false,
  },
  sortByPrice: {
    sort: false,
    condition: false,
  },
};

const handlers = {
  [SORT_BY_NAME]: (state, action) => ({
    ...state,
  }),
  [CHOSEN_CATEGORY]: (state, action) => ({
    ...state,
    chosenCategory: action.payload,
  }),
  [CHOSEN_SUBCATEGORY]: (state, action) => ({
    ...state,
    chosenSubcategory: action.payload,
  }),
  [SIDEBAR_DEFAULT]: (state, action) => ({
    ...state,
    chosenCategory: "all",
    chosenSubcategory: "all",
    chosenItems: [],
  }),
  [UPDATE_CHOSEN_ITEMS]: (state, action) => ({
    ...state,
    chosenItems: action.payload,
  }),
  [ADD_REMOVE_COLOR]: (state, action) => ({
    ...state,
    chosenColors: action.payload,
  }),
  [SET_PRICE_RANGE]: (state, action) => ({
    ...state,
    chosenPriceRange: action.payload,
  }),
  [RESET_FILTERS]: (state, action) => ({
    ...state,
    chosenColors: [],
    chosenPriceRange: {
      min: 0,
      max: 0,
    },
    reset: !state.reset,
  }),
  [RECEIVE_CURRENT_ROUTE_START]: (state) => ({
    ...state,
    chosenColors: [],
    chosenPriceRange: {
      min: 0,
      max: 0,
    },
    reset: !state.reset,
  }),
  DEFAULT: (state) => state,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default sidebarReducer;
