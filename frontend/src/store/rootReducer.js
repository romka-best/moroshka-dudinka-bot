import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { productReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;