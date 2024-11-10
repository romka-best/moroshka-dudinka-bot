import rootReducer from './rootReducer';
import apiMiddleware from '../middleware/apiMiddleware';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export default store;
  