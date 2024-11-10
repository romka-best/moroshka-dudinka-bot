import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { productReducer } from './products/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;