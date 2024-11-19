import {
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_USER_ORDERS_START,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
} from './constants';

const initialState = {
  loading: false,
  orders: {},
};

export const orderReducer = (state = initialState, { type, response }) => {
  console.log(response, 'response');

  switch (type) {
    case CREATE_ORDER_START:
      return ({
        loading: true,
        ...state,
      });

    case CREATE_ORDER_SUCCESS:
      return ({
        loading: true,
        ...state,
      });

    case CREATE_ORDER_FAIL:
      return ({
        loading: false,
        ...state,
      });

    case GET_USER_ORDERS_START:
      return ({
        ...state,
      });

    case GET_USER_ORDERS_SUCCESS:
      return ({
        ...state,
      });

    case GET_USER_ORDERS_FAIL:
      return ({
        ...state,
      });

    default:
      return state;
  }
};