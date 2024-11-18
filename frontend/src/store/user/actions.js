import { API_BASE, GET } from '../constants';
import { GET_USER_FAIL, GET_USER_START, GET_USER_SUCCESS } from './constants';

export const getUser = (userId = '251592324') => ({
  method: GET,
  url: `${API_BASE}/users/${userId}`,
  types: [GET_USER_START, GET_USER_SUCCESS, GET_USER_FAIL],
});