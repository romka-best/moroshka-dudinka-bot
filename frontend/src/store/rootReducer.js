import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';
import userSlice from './user/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
  products: productsSlice,
});

export default rootReducer;
