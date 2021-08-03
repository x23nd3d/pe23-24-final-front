import axios from "../../axios/axios-user";

import {
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  CLEAR_CURRENT_CART,
  DELETE_SAVED_ADDRESS,
  DELETE_SAVED_CARD,
  GET_REFRESHED_USER_INFO,
  REFRESH_ADDRESS_FROM_SERVER,
  REFRESH_CARDS_FROM_SERVER,
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CART_OPTIONS,
  SAVE_DELIVERY,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_CURRENT_CREDIT_CARD,
  SET_DELIVERY_MANUALLY,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_PAY,
  SET_LOGIN_ACTIVE_TAB,
  SHOW_ALL_ORDERS,
  TOGGLE_ADDRESS_MODAL,
  TOGGLE_WISHLIST,
  UPDATE_SETTINGS,
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
    } = getState().user;
    const { token } = getState().auth;

    if (isCardSaved) {
      config.savedCards = savedCards[savedCards.length - 1];
    }

    if (isDeliverySaved) {
      if (deliveryMethod === "myself") {
        return;
      }

      dispatch(
        saveDeliveryHandler({
          deliveryMethod,
          deliveryAddress,
          isDeliverySaved,
        })
      );
      // TODO:
      config.savedDeliveryAddresses = {
        deliveryMethod,
        deliveryAddress,
        isDeliverySaved,
      };
    }

    const request = await axios.post("checkout", config, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = request.data;
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

  const addressExist = savedDeliveryAddresses.find(
    (address) => JSON.stringify(address) === JSON.stringify(deliveryData)
  );

  if (addressExist) {
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
    const receivedOrders = request.data.orders;
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

export const getUpdatesFromUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const request = await axios.get("/user", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = request.data;
    dispatch(receivedUpdatesFromUser(response.user));
  } catch (e) {
    console.error(e);
  }
};

export const receivedUpdatesFromUser = (user) => ({
  type: GET_REFRESHED_USER_INFO,
  user,
});

export const setDeliveryAddressManual =
  (method, address) => (dispatch, getState) => {
    const { deliveryMethod, deliveryAddress } = getState().user;

    if (method === deliveryMethod && address === deliveryAddress) {
      return;
    }

    dispatch(setManualDeliveryAddress(method, address));
  };

export const setManualDeliveryAddress = (deliveryMethod, deliveryAddress) => ({
  type: SET_DELIVERY_MANUALLY,
  deliveryMethod,
  deliveryAddress,
});

export const setCurrentCreditCardHandler = (card) => (dispatch, getState) => {
  const { currentCard } = getState().user;

  if (JSON.stringify(card) === JSON.stringify(currentCard)) {
    return;
  }

  return dispatch(setCurrentCreditCard(card));
};

export const setCurrentCreditCard = (currentCard) => ({
  type: SET_CURRENT_CREDIT_CARD,
  currentCard,
});

export const clearCurrentCart = () => ({
  type: CLEAR_CURRENT_CART,
});

export const deleteAddressBookHandler =
  (value) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      let request = null;
      if (typeof value === "object") {
        const dataCard = {
          card: { ...value },
        };
        request = await axios.post("/deleteCard", dataCard, {
          headers: {
            Authorization: `${token}`,
          },
        });
      } else {
        const dataAddress = { address: value };
        request = await axios.post("/deleteAddress", dataAddress, {
          headers: {
            Authorization: `${token}`,
          },
        });
      }

      const response = request.data;

      if (response.error) {
        return { error: response.error };
      }

      if (response.creditCards) {
        return dispatch(refreshCardsList(response.creditCards));
      }
      return dispatch(refreshAddressesList(response.savedDeliveryMethods));
    } catch (e) {
      console.error(e);
    }
  };

export const refreshAddressesList = (savedDeliveryMethods) => ({
  type: DELETE_SAVED_ADDRESS,
  savedDeliveryMethods,
});

export const refreshCardsList = (creditCards) => ({
  type: DELETE_SAVED_CARD,
  creditCards,
});

export const toggleWishListHandler = (item) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const data = {
      item,
    };
    const request = await axios.post("/toggleWishList", data, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const response = request.data;

    if (response.error) {
      return;
    }

    return dispatch(toggleWishList(response.wishlist));
  } catch (e) {
    console.error(e);
  }
};

export const toggleWishList = (wishlist) => ({
  type: TOGGLE_WISHLIST,
  wishlist,
});

export const searchForWishlistToRemove = () => async (dispatch, getState) => {
  try {
    // const request = await axios.post("/toggleWishList", data, {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // });
  } catch (e) {
    console.error(e);
  }
};

export const toggleAddressModalPreview = (isModalActive) => ({
  type: TOGGLE_ADDRESS_MODAL,
  isModalActive,
});

export const sendAddressRequestChange =
  (addressObject) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (addressObject) {
      const { deliveryMethod, deliveryAddress, isDeliverySaved } =
        addressObject;

      dispatch(
        saveDeliveryHandler({
          deliveryMethod,
          deliveryAddress,
          isDeliverySaved,
        })
      );

      const request = await axios.post(
        "/saveAddress",
        { deliveryAddress: addressObject },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const response = request.data;

      if (!response.error) {
        dispatch(getUpdatedAddressesFromServer(response));
        return {
          success: "the_card_was_saved",
        };
      }
      return {
        error: "The address is already exists or something went wrong",
      };
    }
  };

export const sendCardRequestChange =
  (cardObject) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (cardObject) {
      dispatch(saveCardToStateHandler(cardObject));

      const request = await axios.post(
        "/saveCard",
        { creditCard: cardObject },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const response = request.data;

      if (!response.error) {
        dispatch(getUpdatedCardsFromServer(response));
        return {
          success: "the_card_was_saved",
        };
      }
      return {
        error: "The card is already exists or something went wrong",
      };
    }
  };

export const getUpdatedAddressesFromServer = (savedDeliveryMethods) => ({
  type: REFRESH_ADDRESS_FROM_SERVER,
  savedDeliveryMethods,
});

export const getUpdatedCardsFromServer = (creditCards) => ({
  type: REFRESH_CARDS_FROM_SERVER,
  creditCards,
});

export const updateUserSettingsHandler =
  (obj) => async (dispatch, getState) => {
    const { userId } = getState().user;
    const { token } = getState().auth;
    let updatedSettings = {};

    for (const [key, value] of Object.entries(userId)) {
      for (const [objKey, objValue] of Object.entries(obj)) {
        if (key === objKey) {
          if (value !== obj[key]) {
            updatedSettings = {
              ...updatedSettings,
              [key]: objValue,
            };
          }
        }
      }
    }

    if (!Object.keys(updatedSettings).length) {
      return;
    }

    try {
      const request = await axios.post(
        "/updateSettings",
        { settings: updatedSettings },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const response = request.data;
      if (response.error) {
        return response.error;
      }
      dispatch(updateUserSettings(response));
    } catch (e) {
      console.error(e);
    }
  };

export const updateUserSettings = (userId) => ({
  type: UPDATE_SETTINGS,
  userId,
});
