import actions from "../actions/userAction";

const initialState = {
  user: null,
  token: null,
  loggedIn: false,
  loading: false,
  productId: null
};
const {
  SET_USER,
  SET_TOKEN,
  SET_LOGGED_IN,
  SET_LOADING,
  SET_PRODUCT_ID
} = actions;
const userReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: data,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: data,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: data,
      };
    case SET_PRODUCT_ID:
      return {
        ...state,
        productId: data,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: data,
      };
    default:
      return state;
  }
};

export default userReducer;
