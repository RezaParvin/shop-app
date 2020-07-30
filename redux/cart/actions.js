import actions from "./actionType";

export const addToCart = (product) => ({
  type: actions.ADD_ITEM_TO_CART,
  payload: product,
});

export const removeItemOfCart = (itemID) => ({
  type: actions.REMOVE_ITEM_OF_CART,
  payload: itemID,
});
