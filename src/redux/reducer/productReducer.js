import actions from '../actions/productAction';

const initialState = {
  selectedProductId: null,
  cart: [],
};

const {
  SET_SELECTED_PRODUCT_ID,
  CART_PRODUCTS
} = actions;
const ProductReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {

    case SET_SELECTED_PRODUCT_ID:
      return {
        ...state,
        selectedProductId: data
      };
    case CART_PRODUCTS:
      return {
        ...state,
        cart: data,
      };
    default:
      return state;
  }
};

export default ProductReducer;
