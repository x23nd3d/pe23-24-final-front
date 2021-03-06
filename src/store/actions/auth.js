import axios from "../../axios/axios-auth";
import check from "../../axios/axios-user";
import pushNotification from "../../utils/toastrConfig";
import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGOUT_START,
  AUTH_REFRESH_CART,
  AUTH_START,
  AUTH_SUCCESS,
  CART_DISCOUNT_CODE_ERROR,
  SET_LOGIN_TOGGLE,
  SIGNUP_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  USER_DISCOUNT_EXIST,
  USER_DISCOUNT_FIRST_TIME,
} from "./actionTypes";
import { clearCartHandler, saveCart } from "./cart";

export const checkDiscount = () => async (dispatch, getState) => {
  const { discount } = getState().cart;
  const { token } = getState().auth;
  try {
    if (discount.code) {
      const { key } = getState().cart.discount.code;
      const request = await check.post(
        "/checkDiscount",
        { key },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const response = request.data;

      if (response.error === "discount_not_found") {
        return dispatch(checkAuthDiscountError());
      }

      if (response.error === "already_exist") {
        return dispatch(checkAuthDiscountExists());
      }

      if (response.error === "first_time_only") {
        return dispatch(checkAuthDiscountFirstTime());
      }

      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkAuthDiscountExists = () => ({
  type: USER_DISCOUNT_EXIST,
});

export const checkAuthDiscountFirstTime = () => ({
  type: USER_DISCOUNT_FIRST_TIME,
});

export const checkAuthDiscountError = () => ({
  type: CART_DISCOUNT_CODE_ERROR,
});

export function auth(email, password, keepSigned) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    const authData = {
      email,
      password,
      keepSigned,
    };

    try {
      const response = await axios.post("/login", authData);
      const { data } = response;

      if (data.status === "failure") {
        const { text } = data;

        if (text === "notfound") {
          dispatch(authError(text));
          pushNotification(
            "error",
            "Such user does not exist",
            "Please try again",
            {
              toastClass: "toastr-c-error",
            }
          );
          return false;
        }
        if (text === "datawrong") {
          dispatch(authError(text));
          pushNotification(
            "error",
            "Email or Password are incorrect",
            "Please try again",
            {
              toastClass: "toastr-c-error",
            }
          );
          return false;
        }
        if (text === "noaccess") {
          dispatch(authError(text));
          pushNotification(
            "error",
            "You have no rights to access the system!",
            "Error",
            {
              toastClass: "toastr-c-error",
            }
          );
          return false;
        }
        dispatch(authError(text));
        return pushNotification("error", "Something went wrong", "Warning", {
          toastClass: "toastr-c-error",
        });
      }
      dispatch(authStart());
      setTimeout(() => {
        const expirationDate = new Date(
          new Date().getTime() + new Date(data.expiresIn) * 1000
        );
        pushNotification(
          "success",
          `Welcome on board, ${data.userId.name}!`,
          "Success",
          {
            toastClass: "toastr-c-success",
          }
        );
        dispatch(authSuccess(data.token, data.userId, expirationDate));
        dispatch(authRefreshCartHandler());
        dispatch(checkDiscount());
        sessionStorage.setItem("token", data.token);
        dispatch(autoLogout(data.expiresIn));
      }, 500);
      return true;
    } catch (e) {
      dispatch(authError(e));
      return false;
    }
  };
}

export function signUp(name, surname, email, password) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    const authData = {
      name,
      surname,
      email,
      password,
    };

    try {
      dispatch(signUpStart());
      const response = await axios.post("/signup", authData);
      const { data } = response;

      if (data.status === "failure") {
        const { text } = data;

        if (text === "registered:true") {
          dispatch(signUpError(text));
          return pushNotification(
            "warning",
            "Such user has already been registered",
            "User found",
            {
              toastClass: "toastr-c-warning",
            }
          );
        }
        dispatch(signUpError(text));
        pushNotification("error", "Something went wrong", "Warning", {
          toastClass: "toastr-c-error",
        });
        return false;
      }
      pushNotification(
        "success",
        "You have been successfully registered!",
        "Thank you",
        {
          toastClass: "toastr-c-success",
        }
      );
      setTimeout(() => {
        pushNotification(
          "success",
          "Do not forget to log in to the store",
          "Hey",
          {
            toastClass: "toastr-c-success",
          }
        );
      }, 3000);
      dispatch(signUpSuccess());
      dispatch(setLogin(true));
      return true;
    } catch (e) {
      dispatch(authError(e));
      return false;
    }
  };
}

export function authSuccess(token, user, expiresIn) {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
    expiresIn,
  };
}

export function signUpSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function authError(e) {
  return {
    type: AUTH_ERROR,
    e,
  };
}

export function signUpError(e) {
  return {
    type: SIGNUP_ERROR,
    e,
  };
}

export function authStart() {
  return {
    type: AUTH_START,
  };
}

export function signUpStart() {
  return {
    type: SIGNUP_START,
  };
}

export function autoLogin() {
  return (dispatch, getState) => {
    const user = getState().user.userId;
    const { token } = getState().auth;
    const expirationDate = new Date(getState().auth.expiresIn);
    if (!token) {
      dispatch(logout());
    } else if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, user, expirationDate));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      const listener = () => {
        if (!document.hidden) {
          setTimeout(() => {
            pushNotification(
              "warning",
              "Your session was expired, please log in",
              "Warning",
              {
                toastClass: "toastr-c-warning",
              }
            );
          }, 1000);
        }
      };

      document.addEventListener("visibilitychange", listener, false);
      document.addEventListener(
        "visibilitychange",
        () => {
          if (document.hidden) {
            document.removeEventListener("visibilitychange", listener);
          }
        },
        false
      );
      dispatch(logout());
    }, time * 1000);
  };
}

const toUpperCase = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

export function logout() {
  return async (dispatch, getState) => {
    const { name } = getState().user.userId;

    try {
      dispatch(logOffStart());
      const url = "/logout";
      await axios.post(url, null, {
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });
      setTimeout(() => {
        sessionStorage.removeItem("token");
        pushNotification(
          "success",
          `See you soon, ${toUpperCase(name)}`,
          "Good bye",
          {
            toastClass: "toastr-c-success",
          }
        );
        dispatch(saveCart());
        dispatch(clearCartHandler());
        dispatch(logOff());
      }, 500);
    } catch (e) {
      // console.error(e);
    }
  };
}

export function logOff() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function logOffStart() {
  return {
    type: AUTH_LOGOUT_START,
  };
}

export function setLogin(isLogin) {
  return {
    type: SET_LOGIN_TOGGLE,
    isLogin,
  };
}

function itemsAreSame(ary1, ary2) {
  const arr = [];

  if (!ary1.length) {
    return ary2;
  }

  if (!ary2.length) {
    return ary1;
  }

  for (const item of ary1) {
    for (const item2 of ary2) {
      if (
        JSON.stringify(item.id) === JSON.stringify(item2.id) &&
        JSON.stringify(item.size) === JSON.stringify(item2.size) &&
        JSON.stringify(item.color) === JSON.stringify(item2.color)
      ) {
        const checkk = arr.find(
          (current) => JSON.stringify(current.id) === JSON.stringify(item.id)
        );

        const newItem = item;

        if (!checkk) {
          newItem.count = item.count + item2.count;
          arr.push(newItem);
        } else {
          checkk.count += item.count;
        }
      } else {
        const checkkk = arr.find(
          (check1) =>
            JSON.stringify(check1.id) === JSON.stringify(item.id) &&
            JSON.stringify(check1.size) === JSON.stringify(item.size) &&
            JSON.stringify(check1.color) === JSON.stringify(item.color)
        );
        const check2 = arr.find(
          (check11) =>
            JSON.stringify(check11.id) === JSON.stringify(item2.id) &&
            JSON.stringify(check11.size) === JSON.stringify(item2.size) &&
            JSON.stringify(check11.color) === JSON.stringify(item2.color)
        );

        if (!checkkk) {
          arr.push(item);
        }

        if (!check2) {
          arr.push(item2);
        }
      }
    }
  }
  return arr;
}

export const authRefreshCartHandler = () => (dispatch, getState) => {
  const { items } = getState().cart;
  const userData = getState().user.userId.cart;
  if (userData.items) {
    const userCart = userData.items;

    if (!userCart) {
      return;
    }

    const newCart = itemsAreSame(items, getState().user.userId.cart.items);
    return dispatch(authRefreshCart(newCart));
  }
};

export const authRefreshCart = (items) => ({
  type: AUTH_REFRESH_CART,
  items,
});
