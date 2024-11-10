import { GET_USER_FAIL, GET_USER_START, GET_USER_SUCCESS } from './constants';

const initialState = {
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      });

    default:
      return state;
  }
};