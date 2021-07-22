import axios from "../../axios/axios-auth";
import pushNotification from "../../utils/toastrConfig";
import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGOUT_START,
  AUTH_START,
  AUTH_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "./actionTypes";

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
