import axios from "../../axios/axios-user";

import {
  SAVE_CREDIT_CARD_DETAILS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_ACCOUNT_DEFAULT_TAB,
} from "./actionTypes";

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

export const setDefaultAccountTab = () => ({
  type: SET_ACCOUNT_DEFAULT_TAB,
});

export const setActiveTab = (accountActiveTab) => ({
  type: SET_ACCOUNT_ACTIVE_TAB,
  accountActiveTab,
});

export const setAccountActiveTab = (tab) => (dispatch, getState) => {
  dispatch(setActiveTab(tab));
};
