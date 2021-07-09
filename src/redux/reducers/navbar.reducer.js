const INITIAL_STATE = {
  chosenCategory: "clothes",
  categories: [
    {
      title: "clothes",
      items: ["Suits", "Outerwear", "Trousers"],
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

const navbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHOSEN_CATEGORY":
      return {
        ...state,
        chosenCategory: action.payload,
      };

    default:
      return state;
  }
};

export default navbarReducer;
