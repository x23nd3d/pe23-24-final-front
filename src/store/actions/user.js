import axios from "../../axios/axios-user";

import {
  SAVE_CREDIT_CARD_DETAILS,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_PAY,
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

export const deliveryHandler = (method) => (dispatch, getState) => {
  const { deliveryMethod } = getState().user;
  let deliveryPay = 0;

  if (deliveryMethod === method) {
    return;
  }
  if (method === "courier") {
    console.log("COURIERRR");
    deliveryPay = 15;
    dispatch(setDeliveryPay(deliveryPay));
  }

  dispatch(setDelivery(method));
  dispatch(setDeliveryPay(deliveryPay));
};

export const setDelivery = (deliveryMethod) => ({
  type: SET_DELIVERY_METHOD,
  deliveryMethod,
});

export const setDeliveryPay = (deliveryPay) => ({
  type: SET_DELIVERY_PAY,
  deliveryPay,
});

export const deliveryAddressHandler = (address) => (dispatch, getState) => {
  const { deliveryAddress } = getState().user;

  if (deliveryAddress === address) {
    return;
  }

  dispatch(saveDeliveryAddress(address));
};

export const saveDeliveryAddress = (deliveryAddress) => ({
  type: SAVE_DELIVERY_ADDRESS,
  deliveryAddress,
});

export const saveDeliveryOptions = () => (dispatch, getState) => {
  const { deliveryMethod, deliveryAddress } = getState().user;
  // TODO: SERVER SAVE

  const options = {
    deliveryMethod,
    deliveryAddress,
  };

  console.log("SAVED");

  dispatch(saveDelivery(options));
};

export const saveDelivery = () => ({
  type: SAVE_DELIVERY_OPTIONS,
});
