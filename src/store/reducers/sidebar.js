import {
  CHOSEN_CATEGORY,
  CHOSEN_SUBCATEGORY,
  SIDEBAR_DEFAULT,
  UPDATE_CHOSEN_ITEMS,
  ADD_REMOVE_COLOR,
  RESET_FILTERS,
  SET_PRICE_RANGE,
  SET_CURRENT_ITEMS_PRICE_RANGE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  // chosenCategory: "clothes",
  // chosenSubcategory: "viewAll",
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
  chosenColors: [],
  currentItemsPriceRange: {
    min: null,
    max: null,
  },
  chosenPriceRange: {
    min: null,
    max: null,
  },
};

// const sidebarReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case CHOSEN_CATEGORY:
//       return {
//         ...state,
//         chosenCategory: action.payload,
//       };
//     case CHOSEN_SUBCATEGORY:
//       return {
//         ...state,
//         chosenSubcategory: action.payload,
//       };
//     case SIDEBAR_DEFAULT:
//       return {
//         ...state,
//         chosenCategory: "all",
//         chosenSubcategory: "all",
//         chosenItems: [],
//       };
//     case UPDATE_CHOSEN_ITEMS:
//       return {
//         ...state,
//         chosenItems: action.payload,
//       };

//     default:
//       return state;
//   }
// };

const handlers = {
  [CHOSEN_CATEGORY]: (state, action) => ({
    ...state,
    chosenCategory: action.payload,
  }),
  [CHOSEN_SUBCATEGORY]: (state, action) => ({
    ...state,
    chosenSubcategory: action.payload,
  }),
  [SIDEBAR_DEFAULT]: (state) => ({
    ...state,
    chosenCategory: INITIAL_STATE.chosenCategory,
    chosenSubcategory: INITIAL_STATE.chosenSubcategory,
    chosenItems: INITIAL_STATE.chosenItems,
  }),
  [UPDATE_CHOSEN_ITEMS]: (state, action) => ({
    ...state,
    chosenItems: action.payload,
  }),
  [ADD_REMOVE_COLOR]: (state, action) => ({
    ...state,
    chosenColors: action.payload,
  }),
  [SET_CURRENT_ITEMS_PRICE_RANGE]: (state, action) => ({
    ...state,
    currentItemsPriceRange: action.payload,
  }),
  [SET_PRICE_RANGE]: (state, action) => ({
    ...state,
    chosenPriceRange: action.payload,
  }),
  [RESET_FILTERS]: (state) => ({
    ...state,
    chosenColors: INITIAL_STATE.chosenColors,
  }),

  DEFAULT: (state) => state,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default sidebarReducer;
