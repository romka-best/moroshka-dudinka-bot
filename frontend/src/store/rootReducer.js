import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';
import userSlice from './user/userSlice';
import cartSlice from './cart/cartSlice';

const rootReducer = combineReducers({
  user: userSlice,
  products: productsSlice,
  cart: cartSlice,
});

export default rootReducer;
