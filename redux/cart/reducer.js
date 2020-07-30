import actions from "./actionType";
import productActions from "../product/actionTypes";
import OrderActions from "../order/actionTypes";

import { CartItem } from "../../Models/CartItem";

const initialState = {
  cartItems: {},
  totalAmount: 0,
};

const addItemToCart = (state, product) => {
  let updatedProduct = null;
  if (state.cartItems[product.id]) {
    const newCartItem = new CartItem(
      state.cartItems[product.id].quantity + 1,
      product.title,
      product.price,
      state.cartItems[product.id].sum + product.price
    );
    updatedProduct = {
      ...state,
      cartItems: { ...state.cartItems, [product.id]: newCartItem },
      totalAmount: state.totalAmount + product.price,
    };
  } else {
    //quantity, title, price, sum
    const newCartItem = new CartItem(
      1,
      product.title,
      product.price,
      product.price
    );
    updatedProduct = {
      ...state,
      cartItems: { ...state.cartItems, [product.id]: newCartItem },
      totalAmount: state.totalAmount + product.price,
    };
  }

  return updatedProduct;
};

const removeItemOfCart = (state, id) => {
  const currentQty = state.cartItems[id].quantity;
  let updatedItem;
  if (currentQty > 1) {
    let copyState = {
      ...state,
      totalAmount: state.totalAmount - state.cartItems[id].price,
    };
    copyState.cartItems[id].quantity--;
    updatedItem = copyState;
  } else {
    let copyState = {
      ...state,
      totalAmount: state.totalAmount - state.cartItems[id].price,
    };
    delete copyState.cartItems[id];
    updatedItem = copyState;
  }

  return updatedItem;
};

const updateCart = (state, productId) => {
  const copyCart = { ...state, cartItems: { ...state.cartItems } };
  if (copyCart.cartItems[productId]) {
    copyCart.totalAmount =
      copyCart.totalAmount -
      copyCart.cartItems[productId].price *
        copyCart.cartItems[productId].quantity;
    delete copyCart.cartItems[productId];
    return copyCart;
  } else {
    return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ITEM_TO_CART:
      return addItemToCart(state, action.payload);
    case actions.REMOVE_ITEM_OF_CART:
      return removeItemOfCart(state, action.payload);
    case OrderActions.ADD_ORDER_SUCCESS:
      return initialState;
    case productActions.REMOVE_PRODUCT:
      return updateCart(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
