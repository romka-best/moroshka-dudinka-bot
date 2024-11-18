import { API_BASE, GET } from '../constants';
import { 
  GET_PRODUCT_TYPES_START,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_FAIL,
  GET_PRODUCT_START,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_MORE_PRODUCTS_START,
  GET_MORE_PRODUCTS_SUCCESS,
  GET_MORE_PRODUCTS_FAIL,
} from './constants';

export const getProductsTypes = () => ({
  method: GET,
  url: `${API_BASE}/products/types`,
  types: [GET_PRODUCT_TYPES_START, GET_PRODUCT_TYPES_SUCCESS, GET_PRODUCT_TYPES_FAIL],
});

export const getProducts = (title, type) => ({
  method: GET,
  url: `${API_BASE}/products`,
  params: {
    title,
    type,
  },
  types: [GET_PRODUCT_START, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL],
});

export const getMoreProducts = (page, title, type) => ({
  method: GET,
  url: `${API_BASE}/products`,
  params: {
    page,
    title,
    type,
  },
  types: [GET_MORE_PRODUCTS_START, GET_MORE_PRODUCTS_SUCCESS, GET_MORE_PRODUCTS_FAIL],
});