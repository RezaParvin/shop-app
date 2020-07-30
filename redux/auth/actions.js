import actions from "./actionTypes";
import { AsyncStorage } from "react-native";

let timer = null;

export const userLogout = () => {
  if (timer) {
    clearTimeout(timer);
  }
  AsyncStorage.removeItem("userAuth");
  return {
    type: actions.USER_LOGOUT,
  };
};

export const setExpireLogout = (expireTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(userLogout());
    }, expireTime);
  };
};

export const authenticateSuccess = (userInfo) => ({
  type: actions.AUTHENTICATE_USER_SUCCESS,
  payload: userInfo,
});

export const authenticateStart = () => ({
  type: actions.AUTHENTICATE_USER_START,
});

export const authenticatedFailed = (error) => ({
  type: actions.AUTHENTICATE_USER_FAILED,
  payload: error,
});

export const authenticate = (email, password, isSignUp) => {
  return async (dispatch) => {
    dispatch(authenticateStart());

    const url = isSignUp
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPqx0sGdDbJSxnGQZAHTO5D9dMdCTlEdI`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPqx0sGdDbJSxnGQZAHTO5D9dMdCTlEdI`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        let errorText = "یک خطا رخ داده است";
        const failedResponse = await response.json();
        if (failedResponse.error.message === "EMAIL_NOT_FOUND") {
          errorText = "این ایمیل در سیستم یافت نشد";
        } else if (failedResponse.error.message === "INVALID_PASSWORD") {
          errorText = "رمز عبور اشتباه است";
        } else if (failedResponse.error.message === "USER_DISABLED") {
          errorText = "این کاربر غیر فعال شده است";
        } else if (failedResponse.error.message === "INVALID_EMAIL") {
          errorText = "ایمیل نامتعبر است";
        }
        throw new Error(errorText);
      }

      const userInfo = await response.json();
      dispatch(authenticateSuccess(userInfo));
      await AsyncStorage.setItem(
        "userAuth",
        JSON.stringify({
          token: userInfo.idToken,
          userId: userInfo.localId,
          expire: new Date().getTime() + parseInt(userInfo.expiresIn) * 1000,
        })
      );
      dispatch(setExpireLogout(parseInt(userInfo.expiresIn) * 1000));
    } catch (error) {
      dispatch(authenticatedFailed(error.message));
    }
  };
};
