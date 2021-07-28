import axios from "../../axios/axios-user";

import {
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CARD_DETAILS,
  SAVE_CREDIT_CART_OPTIONS,
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

  // if (method === "myself") {
  //   dispatch(deliveryAddressHandler(null));
  // }

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

  if (!address) {
    dispatch(saveDeliveryAddress(null));
  }

  dispatch(saveDeliveryAddress(address));
};

export const saveDeliveryAddress = (deliveryAddress) => ({
  type: SAVE_DELIVERY_ADDRESS,
  deliveryAddress,
});

export const saveDeliveryOptions =
  (isDeliverySaved) => (dispatch, getState) => {
    const { deliveryMethod, deliveryAddress } = getState().user;
    // TODO: SERVER SAVE

    const options = {
      deliveryMethod,
      deliveryAddress,
    };

    console.log("SAVED", deliveryMethod, deliveryAddress, isDeliverySaved);

    dispatch(saveDelivery(deliveryMethod, deliveryAddress, isDeliverySaved));
  };

export const saveDelivery = (
  deliveryMethod,
  deliveryAddress,
  isDeliverySaved
) => ({
  type: SAVE_DELIVERY_OPTIONS,
  deliveryMethod,
  deliveryAddress,
  isDeliverySaved,
});

export const saveCreditCardHandler = (bool) => (dispatch, getState) => {
  const { isCardSaved } = getState().user;
  console.log("BOOL", bool);

  if (isCardSaved === bool) {
    return;
  }

  dispatch(saveCreditCard(bool));
};

export const saveCreditCard = (isCardSaved) => ({
  type: SAVE_CREDIT_CART_OPTIONS,
  isCardSaved,
});

export const saveCardToStateHandler = (config) => (dispatch, getState) => {
  const { savedCards } = getState().user;

  const weHaveSame = savedCards.find((card) => card === config);

  if (weHaveSame) {
    return;
  }

  dispatch(saveCardToState(config));
};

export const saveCardToState = (card) => ({
  type: SAVE_CREDIT_CARD,
  card,
});

export const sendVerificationRequest = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    await axios.post("verificationRequest", null, {
      Authorization: `${token}`,
    });
  } catch (e) {
    console.error(e);
  }
};
