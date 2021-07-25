import axios from "../../axios/axios-user";

import {
  SAVE_CREDIT_CARD_DETAILS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_LOGIN_ACTIVE_TAB,
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

export const setActiveTab = (accountActiveTab) => ({
  type: SET_ACCOUNT_ACTIVE_TAB,
  accountActiveTab,
});

export const setAccountActiveTab = (tab) => (dispatch, getState) => {
  const currentTab = getState().user.accountActiveTab;

  if (currentTab === tab) {
    return;
  }
  dispatch(setActiveTab(tab));
};

export const setLoginActiveTab = (tab) => (dispatch, getState) => {
  const { loginActiveTab } = getState().user;

  if (loginActiveTab === tab) {
    return;
  }

  dispatch(setLoginTab(tab));
};

export const setLoginTab = (loginActiveTab) => ({
  type: SET_LOGIN_ACTIVE_TAB,
  loginActiveTab,
});
