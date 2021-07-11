import { CHOSEN_CATEGORY } from "../actions/actionTypes";

const INITIAL_STATE = {
  chosenCategory: "clothes",
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
  console.log(state, "state!!");
  switch (action.type) {
    case CHOSEN_CATEGORY:
      return {
        ...state,
        chosenCategory: action.payload,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
