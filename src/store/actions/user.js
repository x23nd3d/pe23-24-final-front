import axios from "../../axios/axios-user";

import { SAVE_CREDIT_CARD_DETAILS } from "./actionTypes";

export const checkout = (config) => async (dispatch, getState) => {
  try {
    console.log("CONFIG", config);
    const { isCardSaved } = getState().user;

    if (isCardSaved !== config.saveCard) {
      console.log("CARD SAVE STATE IS: ", config.saveCard);
      dispatch(toggleSaveCreditCardDetails(config.saveCard));
    }

    const request = await axios.post("checkout", config);
    const response = request.data;
    console.log("RESPONSE", response);
  } catch (e) {
    console.error(e);
  }
};

export const toggleSaveCreditCardDetails = (isCardSaved) => ({
  type: SAVE_CREDIT_CARD_DETAILS,
  isCardSaved,
});
