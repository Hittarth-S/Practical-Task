const actions = {
  SET_SELECTED_PRODUCT_ID: "SET_SELECTED_PRODUCT_ID",
  CART_PRODUCTS: "CART_PRODUCTS",

  setSelectedProductId: (data) => {
    return {
      type: actions.SET_SELECTED_PRODUCT_ID,
      data,
    };
  },
  setCartData: (data) => {
    return {
      type: actions.CART_PRODUCTS,
      data,
    };
  }
};

export default actions;
