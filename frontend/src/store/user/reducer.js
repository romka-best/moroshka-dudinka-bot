import { GET_USER_FAIL, GET_USER_START, GET_USER_SUCCESS } from './constants';

const initialState = {
  loading: false,
  user: {},
};

export const userReducer = (state = initialState, { type, response }) => {
  switch (type) {
    case GET_USER_FAIL:
    case GET_USER_START:
      return ({
        ...state,
        loading: true,
      });

    case GET_USER_SUCCESS:
      return ({
        ...state,
        loading: false,
        user: response,
      });

    default:
      return state;
  }
};