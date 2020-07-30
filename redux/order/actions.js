import actions from "./actionTypes";

export const proccessOrderStart = () => {
  return {
    type: actions.PROCCESS_ORDER_START,
  };
};
export const proccessOrderFailed = (error) => {
  return {
    type: actions.PROCCESS_ORDER_FAILED,
    payload: error,
  };
};

export const addOrderSuccess = (order) => {
  return {
    type: actions.ADD_ORDER_SUCCESS,
    payload: order,
  };
};

export const addOrder = (items, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    dispatch(proccessOrderStart());
    try {
      const response = await fetch(
        `https://nativeshopapp.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            totalAmount,
            date: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("خطایی رخ داده است");
      }
      const result = await response.json();
      dispatch(addOrderSuccess({ id: result.name, items, totalAmount }));
    } catch (error) {
      dispatch(proccessOrderFailed(error.message));
    }
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    dispatch(proccessOrderStart());
    try {
      const response = await fetch(
        `https://nativeshopapp.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("خطایی رخ داده است");
      }
      const result = await response.json();

      dispatch(fetchOrdersSuccess(result));
    } catch (error) {
      dispatch(proccessOrderFailed(error.message));
    }
  };
};
