import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';

const rootReducer = combineReducers({
  products: productsSlice,
});

export default rootReducer;
