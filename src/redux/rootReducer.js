
import { combineReducers } from "redux";
import userReducer from "./reducer/userReducer";
import productReducer from "./reducer/productReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;