const actions = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_LOGGED_IN: "SET_LOGGED_IN",
  SET_LOADING: "SET_LOADING",
  SET_PRODUCT_ID: "SET_PRODUCT_ID",
  setUser: (data) => {
    return { type: actions.SET_USER, data };
  },
  setToken: (data) => {
    return { type: actions.SET_TOKEN, data };
  },
  setLoggedIn: (data) => {
    return { type: actions.SET_LOGGED_IN, data };
  },
  setProductId: (data) => {
    return { type: actions.SET_PRODUCT_ID, data };
  },
  setLoading: (data) => {
    return {
      type: actions.SET_LOADING,
      data,
    };
  },
};

export default actions;
