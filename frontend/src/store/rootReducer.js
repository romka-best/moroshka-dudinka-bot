import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { productReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';
import { orderReducer } from './order/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;