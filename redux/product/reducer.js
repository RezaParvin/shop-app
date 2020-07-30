import { PRODUCTS } from "../../Data/dummy-data";
import actions from "./actionTypes";
import { Product } from "../../Models/Product";

const initialState = {
  availableProduct: [],
  userProduct: [],
  isLoading: false,
  error: null,
};

const addProductStart = (state) => {
  return { ...state, isLoading: true, error: null };
};

const addProductFailed = (state, error) => {
  return { ...state, isLoading: false, error: error };
};

// id, ownerId, title, imageUrl, description, price
const addProductSuccess = (state, productData) => {
  const newProduct = new Product(
    productData.id,
    productData.ownerId,
    productData.title,
    productData.imageUrl,
    productData.description,
    +productData.price
  );

  return {
    ...state,
    availableProduct: [...state.availableProduct, newProduct],
    userProduct: [...state.userProduct, newProduct],
    isLoading: false,
    error: null,
  };
};
//id, ownerId, title, imageUrl, description, price
const updateProductSuccess = (state, productData) => {
  const availableProduct = [...state.availableProduct];
  const findIndexinAvailable = availableProduct.findIndex(
    (p) => p.id === productData.id
  );
  const newProduct = new Product(
    productData.id,
    productData.ownerId,
    productData.title,
    productData.imageUrl,
    productData.description,
    +productData.price
  );
  availableProduct[findIndexinAvailable] = newProduct;

  const userProduct = [...state.userProduct];
  const findIndexInUser = userProduct.findIndex((p) => p.id === productData.id);
  userProduct[findIndexInUser] = newProduct;

  return {
    ...state,
    availableProduct: availableProduct,
    userProduct: userProduct,
  };
};
const updateProductFailed = (state, error) => {
  return {
    ...state,
    error: error,
  };
};

const removeProductSuccess = (state, productId) => {
  return {
    ...state,
    availableProduct: state.availableProduct.filter((p) => p.id !== productId),
    userProduct: state.userProduct.filter((p) => p.id !== productId),
  };
};

const removeProductFailed = (state, error) => {
  return { ...state, error: error };
};

const setProductsStart = (state) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const setProductsSuccess = (state, products,userId) => {
 
  const newProducts = [];
  for (const key in products) {
    newProducts.push(
      new Product(
        key,
        products[key].ownerId,
        products[key].title,
        products[key].imageUrl,
        products[key].description,
        +products[key].price
      )
    );
  }


  const userProducts = newProducts.filter(
    (p) => p.ownerId === userId
  );

  return {
    ...state,
    availableProduct: newProducts,
    userProduct: userProducts,
    isLoading: false,
    error: null,
  };
};

const setProductsFailed = (state, error) => {
  return {
    ...state,
    isLoading: false,
    error: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT_START:
      return addProductStart(state);
    case actions.ADD_PRODUCT_FAILED:
      return addProductFailed(state, action.error);
    case actions.ADD_PRODUCT_SUCCESS:
      return addProductSuccess(state, action.payload);
    case actions.UPDATE_PRODUCT_SUCCESS:
      return updateProductSuccess(state, action.payload);
    case actions.UPDATE_PRODUCT_FAILED:
      return updateProductFailed(state, action.payload);
    case actions.SET_PRODUCTS_START:
      return setProductsStart(state);
    case actions.SET_PRODUCTS_SUCCESS:
      return setProductsSuccess(state, action.payload,action.userId);
    case actions.SET_PRODUCTS_FAILED:
      return setProductsFailed(state, action.payload);
    case actions.REMOVE_PRODUCTS_SUCCESS:
      return removeProductSuccess(state, action.payload);
    case actions.REMOVE_PRODUCTS_FAILED:
      return removeProductFailed(state, action.payload);
    default: {
      return state;
    }
  }
};

export default reducer;
