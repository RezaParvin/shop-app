import ProductReducer from "./product/reducer";
import { combineReducers } from "redux";
import CartReducer from "./cart/reducer";
import orderReducer from "./order/reducer";
import authReducer from "./auth/reducer";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: orderReducer,
  auth: authReducer,
});

export default rootReducer;
