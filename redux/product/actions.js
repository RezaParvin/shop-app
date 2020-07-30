import actions from "./actionTypes";

export const addProductStart = () => {
  return {
    type: actions.ADD_PRODUCT_START,
  };
};

export const addProductFailed = (error) => {
  return {
    type: actions.ADD_PRODUCT_FAILED,
    error: error,
  };
};

export const addProductSuccess = (product) => {
  return {
    type: actions.ADD_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const addProduct = (title, price, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    dispatch(addProductStart());
    try {
      const response = await fetch(
        `https://nativeshopapp.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            Content_Type: "application/json",
          },
          body: JSON.stringify({
            title,
            price: price,
            imageUrl,
            description,
            ownerId: userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("خطایی رخ داده است");
      }
      const result = await response.json();

      dispatch(
        addProductSuccess({
          id: result.name,
          ownerId: userId,
          title,
          price,
          imageUrl,
          description,
        })
      );
    } catch (error) {
      dispatch(addProductFailed(error.message));
    }
  };
};

export const updateProductSuccess = (product) => ({
  type: actions.UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const updateProductFailed = (error) => ({
  type: actions.UPDATE_PRODUCT_FAILED,
  payload: error,
});

export const updateProduct = (id, title, price, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://nativeshopapp.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price,
            imageUrl,
            description,
            ownerId: userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("خطایی رخ داده است");
      }
      const result = await response.json();
      dispatch(
        updateProductSuccess({
          id,
          title,
          price,
          imageUrl,
          description,
          ownerId: userId,
        })
      );
    } catch (error) {
      dispatch(updateProductFailed(error.message));
    }
  };
};

export const removeProductSuccess = (id) => {
  return {
    type: actions.REMOVE_PRODUCTS_SUCCESS,
    payload: id,
  };
};

export const removeProductFailed = (error) => {
  return {
    type: actions.REMOVE_PRODUCTS_FAILED,
    payload: error,
  };
};

export const removeProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://nativeshopapp.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("خطایی رخ داده است");
      }
      const result = await response.json();
      dispatch(removeProductSuccess(id));
    } catch (error) {
      dispatch(removeProductFailed(error.message));
    }
  };
};

export const setProductsStart = () => ({ type: actions.ADD_PRODUCT_START });

export const setProductsSuccess = (products, userId) => ({
  type: actions.SET_PRODUCTS_SUCCESS,
  payload: products,
  userId: userId,
});

export const setProductsFailed = (error) => ({
  type: actions.ADD_PRODUCT_FAILED,
  payload: error,
});

export const setProducts = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  dispatch(setProductsStart());
  try {
    const response = await fetch(
      `https://nativeshopapp.firebaseio.com/products.json`
    );
    if (!response.ok) {
      throw new Error("خطایی رخ داده است");
    }
    const result = await response.json();
   
    dispatch(setProductsSuccess(result, userId));
  } catch (error) {
    dispatch(setProductsFailed(error.message));
  }
};
