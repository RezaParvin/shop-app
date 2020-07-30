import actions from "./actionTypes";

const intialState = {
  userId: null,
  token: null,
  error: null,
  isLoading: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATE_USER_START:
      return { ...state, isLoading: true, error: null };
    case actions.AUTHENTICATE_USER_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case actions.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        userId: action.payload.localId,
        token: action.payload.idToken,
        error: null,
        isLoading: false,
      };
    case actions.USER_LOGOUT:
      return intialState;
    default:
      return state;
  }
};

export default reducer;
