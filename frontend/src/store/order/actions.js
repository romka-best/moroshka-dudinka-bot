import { API_BASE, GET, POST } from '../constants';
import {
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_USER_ORDERS_START,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
} from './constants';

export const createOrder = (body, onSuccess, onError) => ({
  method: POST,
  url: `${API_BASE}/orders`,
  body,
  types: [CREATE_ORDER_START, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL],
  onSuccess,
  onError,
});

export const getUserOrders = userId => ({
  method: GET,
  url: `${API_BASE}/orders/users/${userId}`,
  types: [GET_USER_ORDERS_START, GET_USER_ORDERS_SUCCESS, GET_USER_ORDERS_FAIL],
});