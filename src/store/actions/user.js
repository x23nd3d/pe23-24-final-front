import axios from "../../axios/axios-user";

import {
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CART_OPTIONS,
  SAVE_DELIVERY,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_PAY,
  SET_LOGIN_ACTIVE_TAB,
  SHOW_ALL_ORDERS,
} from "./actionTypes";

export const checkout = () => async (dispatch, getState) => {
  try {
    const config = {};
    const {
      isCardSaved,
      isDeliverySaved,
      deliveryMethod,
      deliveryAddress,
      savedCards,
      savedDeliveryAddresses,
    } = getState().user;
    const { token } = getState().auth;

    if (isCardSaved) {
      console.log(
        "THE CART WAS STATE AS SAVED, SO WE SHOULD SAVE IT TO STATE AND SERVER"
      );
      config.savedCards = savedCards[savedCards.length - 1];
    }

    if (isDeliverySaved) {
      console.log(
        "THE DELIVERY WAS STATE AS SAVED, SO WE SHOULD SAVE IT TO STATE AND SERVER"
      );

      dispatch(
        saveDeliveryHandler({
          deliveryMethod,
          deliveryAddress,
          isDeliverySaved,
        })
      );
      config.savedDeliveryAddresses =
        savedDeliveryAddresses[savedDeliveryAddresses.length - 1];
    }

    console.log("CONFIG", config);

    const request = await axios.post("checkout", config, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = request.data;
    console.log("RESPONSE", response);
    return response;
  } catch (e) {
    console.error(e);
  }
};

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
  const newCards = [...savedCards, config];

  dispatch(saveCardToState(newCards));
};

export const saveCardToState = (savedCards) => ({
  type: SAVE_CREDIT_CARD,
  savedCards,
});

export const sendVerificationRequest = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    await axios.post(
      "/verificationRequest",
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const verification = (code) => async (dispatch, getState) => {
  try {
    console.log(code, "codecode");
    const { token } = getState().auth;
    const request = await axios.post(
      "/verification",
      { code },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const response = request.data;

    if (response.error) {
      // we have error, code is wrong
      return {
        error: response.error,
        attempts: response.attempts,
      };
    }
    // the code was accepted
    return {
      success: response.success,
    };
  } catch (e) {
    console.error(e);
  }
};

export const saveDeliveryHandler = (deliveryData) => (dispatch, getState) => {
  const { savedDeliveryAddresses } = getState().user;

  console.log(deliveryData, "deliveryData");

  const addressExist = savedDeliveryAddresses.find(
    (address) => JSON.stringify(address) === JSON.stringify(deliveryData)
  );

  if (addressExist) {
    console.log(addressExist, "addressExist");
    return;
  }
  const newAddresses = [...savedDeliveryAddresses, deliveryData];

  dispatch(saveDeliveryAddresses(newAddresses));
};

export const saveDeliveryAddresses = (savedDeliveryAddresses) => ({
  type: SAVE_DELIVERY,
  savedDeliveryAddresses,
});

export const checkoutStartHandler = () => ({
  type: CHECKOUT_START,
});

export const checkoutSuccessHandler = () => ({
  type: CHECKOUT_SUCCESS,
});

export const getAllOrdersHandler = () => async (dispatch, getState) => {
  const { orders } = getState().user;
  const { token } = getState().auth;

  try {
    const request = await axios.get("/orders", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const receivedOrders = request.data;
    if (JSON.stringify(receivedOrders) === JSON.stringify(orders)) {
      return;
    }
    return dispatch(receiveAllOrders(receivedOrders));
  } catch (e) {
    console.error(e);
  }
};

export const receiveAllOrders = (orders) => ({
  type: SHOW_ALL_ORDERS,
  orders,
});
