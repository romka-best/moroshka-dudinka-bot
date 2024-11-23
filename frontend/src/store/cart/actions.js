import { API_BASE, DELETE, GET, PUT } from '../constants';
import {
  GET_CART_BY_ID_START,
  GET_CART_BY_ID_SUCCESS,
  GET_CART_BY_ID_FAIL,
  DELETE_CART_BY_ID_START,
  DELETE_CART_BY_ID_SUCCESS,
  DELETE_CART_BY_ID_FAIL,
  EDIT_CART_ITEM_START,
  EDIT_CART_ITEM_SUCCESS,
  EDIT_CART_ITEM_FAIL,
  EDIT_CART_ITEM_COUNT,
  CLEAR_CART_STATE,
} from './constants';

export const getCartById = cartId => ({
  method: GET,
  url: `${API_BASE}/carts/${cartId}`,
  types: [GET_CART_BY_ID_START, GET_CART_BY_ID_SUCCESS, GET_CART_BY_ID_FAIL],
});

export const deleteCartById = cartId => ({
  method: DELETE,
  url: `${API_BASE}/carts/${cartId}`,
  types: [DELETE_CART_BY_ID_START, DELETE_CART_BY_ID_SUCCESS, DELETE_CART_BY_ID_FAIL],
});

export const editCartItem = (cartId, product, count) => ({
  method: PUT,
  body: {
    product_id: product?.id,
    count,
  },
  url: `${API_BASE}/carts/${cartId}`,
  types: [EDIT_CART_ITEM_START, EDIT_CART_ITEM_SUCCESS, EDIT_CART_ITEM_FAIL],
  product,
  count
});

export const editCartItemCount = (count, product) => ({
  type: EDIT_CART_ITEM_COUNT,
  product,
  count
});

export const clearCartState = () => ({
  type: CLEAR_CART_STATE,
});