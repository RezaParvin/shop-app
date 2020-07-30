import actions from "./actionTypes";
import { Order } from "../../Models/Order";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  isRefreshing: true,
};

const addOrderSuccess = (state, order) => {
  return {
    ...state,
    orders: [
      ...state.orders,
      new Order(order.id, order.items, order.totalAmount, new Date()),
    ],
    isLoading: false,
    error: null,
  };
};

const fetchOrderSuccess = (state, orders) => {
  const newOrders = [];
  for (const key in orders) {
    newOrders.push(
      new Order(
        key,
        orders[key].items,
        orders[key].totalAmount,
        orders[key].date
      )
    );
  }
  return {
    ...state,
    orders: newOrders,
    isLoading: false,
    error: null,
    isRefreshing: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PROCCESS_ORDER_START:
      return { ...state, isLoading: true, error: null };
    case actions.PROCCESS_ORDER_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case actions.ADD_ORDER_SUCCESS:
      return addOrderSuccess(state, action.payload);
    case actions.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
